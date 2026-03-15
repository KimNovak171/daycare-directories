import { readdirSync, readFileSync } from "fs";
import path from "path";
import type { Facility } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function getStateSlugs(): string[] {
  try {
    const files = readdirSync(DATA_DIR);
    const slugs = files
      .filter((f) => f.endsWith("_facilities.json") && !f.startsWith("canada"))
      .map((f) => f.replace(/_facilities\.json$/, "").replace(/_/g, "-"))
      .sort((a, b) => a.localeCompare(b));
    return slugs;
  } catch {
    return [];
  }
}

export function getStateNameFromSlug(slug: string): string {
  if (slug === "washington-dc") return "Washington, D.C.";
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getFacilitiesForState(stateSlug: string): Facility[] {
  const filename = `${stateSlug.replace(/-/g, "_").toLowerCase()}_facilities.json`;
  const filepath = path.join(DATA_DIR, filename);
  try {
    const raw = readFileSync(filepath, "utf-8");
    const data = JSON.parse(raw) as Facility[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function getAllFacilities(): Facility[] {
  const stateSlugs = getStateSlugs();
  const all: Facility[] = [];
  for (const slug of stateSlugs) {
    all.push(...getFacilitiesForState(slug));
  }
  return all;
}

export function getCitiesForState(stateSlug: string): { slug: string; name: string; count: number }[] {
  const withRating = getCitiesForStateWithRating(stateSlug);
  return withRating.map(({ slug, name, count }) => ({ slug, name, count }));
}

/** Cities with facility count and average rating (for state page city grid). */
export function getCitiesForStateWithRating(
  stateSlug: string
): { slug: string; name: string; count: number; averageRating: number | null }[] {
  const facilities = getFacilitiesForState(stateSlug);
  const byCity = new Map<
    string,
    { name: string; count: number; sumRating: number; countWithRating: number }
  >();
  for (const f of facilities) {
    const slug = slugify(f.city);
    const existing = byCity.get(slug);
    const rating = f.rating != null && !Number.isNaN(f.rating) ? f.rating : null;
    if (existing) {
      existing.count += 1;
      if (rating !== null) {
        existing.sumRating += rating;
        existing.countWithRating += 1;
      }
    } else {
      byCity.set(slug, {
        name: f.city,
        count: 1,
        sumRating: rating ?? 0,
        countWithRating: rating !== null ? 1 : 0,
      });
    }
  }
  return Array.from(byCity.entries())
    .map(([slug, { name, count, sumRating, countWithRating }]) => ({
      slug,
      name,
      count,
      averageRating:
        countWithRating > 0 ? Math.round((sumRating / countWithRating) * 10) / 10 : null,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Other cities in state (exclude current city), for city page "Other cities" section. */
export function getOtherCitiesInState(
  stateSlug: string,
  currentCitySlug: string,
  limit: number
): { slug: string; name: string; count: number }[] {
  const cities = getCitiesForState(stateSlug);
  return cities
    .filter((c) => c.slug !== currentCitySlug)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map((c) => ({ slug: c.slug, name: c.name, count: c.count }));
}

export function getFacilitiesForCity(stateSlug: string, citySlug: string): Facility[] {
  const facilities = getFacilitiesForState(stateSlug);
  return facilities.filter((f) => slugify(f.city) === citySlug);
}

export function getCityNameFromSlug(stateSlug: string, citySlug: string): string | null {
  const cities = getCitiesForState(stateSlug);
  const found = cities.find((c) => c.slug === citySlug);
  return found?.name ?? null;
}

export function getStateSlugFromName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function getCareTypeBreakdown(facilities: Facility[]): Record<string, number> {
  const breakdown: Record<string, number> = {};
  for (const f of facilities) {
    const ct = f.care_type || "Other";
    breakdown[ct] = (breakdown[ct] ?? 0) + 1;
  }
  return breakdown;
}

/**
 * Returns up to `limit` facilities for the homepage "Featured" section.
 * Chooses popular facilities (high rating + reviews) from different locations
 * and different Google categories (care types).
 */
export function getFeaturedFacilities(limit = 3): Facility[] {
  const all = getAllFacilities();
  const popular = all.filter(
    (f) =>
      (f.featured || f.premium) ||
      (Number(f.rating) >= 4 && (f.reviews ?? 0) >= 30)
  );
  const byPopularity = [...popular].sort(
    (a, b) => (b.reviews ?? 0) * (b.rating ?? 0) - (a.reviews ?? 0) * (a.rating ?? 0)
  );

  const picked: Facility[] = [];
  const usedLocations = new Set<string>();
  const usedCareTypes = new Set<string>();

  for (const f of byPopularity) {
    if (picked.length >= limit) break;
    const location = `${f.city}|${f.state}`.toLowerCase();
    const careType = (f.care_type || "Other").trim();
    const locationOk = !usedLocations.has(location);
    const careTypeOk = !usedCareTypes.has(careType);
    if (locationOk && careTypeOk) {
      picked.push(f);
      usedLocations.add(location);
      usedCareTypes.add(careType);
    }
  }

  return picked;
}

/** Top N cities by facility count (for state page intro). */
export function getTopCitiesForState(
  stateSlug: string,
  limit: number
): { name: string; slug: string; count: number }[] {
  const cities = getCitiesForState(stateSlug);
  return [...cities].sort((a, b) => b.count - a.count).slice(0, limit);
}

/** Top care type names by count (for intro copy). */
export function getTopCareTypes(breakdown: Record<string, number>, limit: number): string[] {
  return Object.entries(breakdown)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name]) => name);
}
