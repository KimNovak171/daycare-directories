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
  const facilities = getFacilitiesForState(stateSlug);
  const byCity = new Map<string, { name: string; count: number }>();
  for (const f of facilities) {
    const slug = slugify(f.city);
    const existing = byCity.get(slug);
    if (existing) {
      existing.count += 1;
    } else {
      byCity.set(slug, { name: f.city, count: 1 });
    }
  }
  return Array.from(byCity.entries())
    .map(([slug, { name, count }]) => ({ slug, name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
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

export function getFeaturedFacilities(limit = 3): Facility[] {
  const all = getAllFacilities();
  const featured = all.filter((f) => f.featured || (f.rating >= 3 && f.reviews > 0));
  return featured.slice(0, limit);
}
