// Canadian provinces/territories for nav and routing
export const CANADA_PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
] as const;

export function provinceToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function slugToProvinceName(slug: string): string {
  const map: Record<string, string> = {
    "british-columbia": "British Columbia",
    "new-brunswick": "New Brunswick",
    "newfoundland-and-labrador": "Newfoundland and Labrador",
    "northwest-territories": "Northwest Territories",
    "nova-scotia": "Nova Scotia",
    "prince-edward-island": "Prince Edward Island",
  };
  return (
    map[slug] ??
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}
