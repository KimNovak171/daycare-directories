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
  website: string;
  rating: number;
  reviews: number;
  care_type: CareType;
  recommended: boolean;
  latitude: number;
  longitude: number;
  featured?: boolean;
  premium?: boolean;
}

export const RECOMMENDED_RATING_THRESHOLD = 3.0;

export function isRecommended(facility: Facility): boolean {
  return (facility.rating ?? 0) >= RECOMMENDED_RATING_THRESHOLD;
}
