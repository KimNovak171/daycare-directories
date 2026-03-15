import { existsSync, readFileSync, readdirSync } from "fs";
import path from "path";
import { CANADA_PROVINCES, provinceToSlug, slugToProvinceName } from "@/lib/canada";
import type { Facility } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "data");

/** Raw Canadian facility from JSON (province instead of state). */
interface CanadianFacilityRaw {
  name: string;
  address: string;
  city: string;
  province: string;
  province_code?: string;
  country?: string;
  phone: string;
  website: string | null;
  rating: number;
  reviews: number;
  care_type: string;
  recommended: boolean;
  latitude?: number;
  longitude?: number;
  featured?: boolean;
  premium?: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/** Normalize Canadian JSON record to Facility (state = province for compatibility). */
function toFacility(raw: CanadianFacilityRaw): Facility {
  return {
    name: raw.name,
    address: raw.address,
    city: raw.city,
    state: raw.province,
    phone: raw.phone,
    website: raw.website ?? null,
    rating: raw.rating ?? 0,
    reviews: raw.reviews ?? 0,
    care_type: raw.care_type,
    recommended: raw.recommended ?? false,
    latitude: raw.latitude,
    longitude: raw.longitude,
    featured: raw.featured,
    premium: raw.premium,
  };
}

const VALID_PROVINCE_SLUG_SET = new Set(CANADA_PROVINCES.map((p) => provinceToSlug(p)));

/**
 * Province slugs that have a data file in data/. Adding a new province JSON file
 * (e.g. nova_scotia_facilities.json) is enough — no code change needed.
 */
export function getProvinceSlugs(): string[] {
  try {
    const files = readdirSync(DATA_DIR);
    return files
      .filter((f) => f.endsWith("_facilities.json"))
      .map((f) => f.replace(/_facilities\.json$/, "").replace(/_/g, "-"))
      .filter((slug) => VALID_PROVINCE_SLUG_SET.has(slug))
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

export function getFacilitiesForProvince(provinceSlug: string): Facility[] {
  const filename = `${provinceSlug.replace(/-/g, "_").toLowerCase()}_facilities.json`;
  const filepath = path.join(DATA_DIR, filename);
  if (!existsSync(filepath)) return [];
  try {
    const raw = readFileSync(filepath, "utf-8");
    const data = JSON.parse(raw) as CanadianFacilityRaw[];
    return Array.isArray(data) ? data.map(toFacility) : [];
  } catch {
    return [];
  }
}

export function getCitiesForProvince(provinceSlug: string): { slug: string; name: string; count: number }[] {
  const withRating = getCitiesForProvinceWithRating(provinceSlug);
  return withRating.map(({ slug, name, count }) => ({ slug, name, count }));
}

export function getCitiesForProvinceWithRating(
  provinceSlug: string
): { slug: string; name: string; count: number; averageRating: number | null }[] {
  const facilities = getFacilitiesForProvince(provinceSlug);
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

export function getFacilitiesForProvinceCity(provinceSlug: string, citySlug: string): Facility[] {
  const facilities = getFacilitiesForProvince(provinceSlug);
  return facilities.filter((f) => slugify(f.city) === citySlug);
}

export function getCityNameFromSlug(provinceSlug: string, citySlug: string): string | null {
  const cities = getCitiesForProvince(provinceSlug);
  const found = cities.find((c) => c.slug === citySlug);
  return found?.name ?? null;
}

export function getTopCitiesForProvince(
  provinceSlug: string,
  limit: number
): { name: string; slug: string; count: number }[] {
  const cities = getCitiesForProvince(provinceSlug);
  return [...cities].sort((a, b) => b.count - a.count).slice(0, limit);
}

export function getOtherCitiesInProvince(
  provinceSlug: string,
  currentCitySlug: string,
  limit: number
): { slug: string; name: string; count: number }[] {
  const cities = getCitiesForProvince(provinceSlug);
  return cities
    .filter((c) => c.slug !== currentCitySlug)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map((c) => ({ slug: c.slug, name: c.name, count: c.count }));
}

export { slugToProvinceName, provinceToSlug };
