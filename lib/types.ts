export const CARE_TYPES = [
  "Day Care Center",
  "Child Care Agency",
  "Preschool",
  "Kindergarten",
  "After School Program",
  "Nursery School",
] as const;

export type CareType = (typeof CARE_TYPES)[number];

export interface Facility {
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  website: string | null;
  rating: number;
  reviews: number;
  care_type: CareType | string;
  recommended: boolean;
  latitude?: number;
  longitude?: number;
  featured?: boolean;
  premium?: boolean;
  /** Google Places id — preferred for Maps links when present. */
  place_id?: string;
}

export const RECOMMENDED_RATING_THRESHOLD = 3.0;

export function isRecommended(facility: Facility): boolean {
  return (facility.rating ?? 0) >= RECOMMENDED_RATING_THRESHOLD;
}
