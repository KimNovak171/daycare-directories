import type { Facility } from "@/lib/types";
import { RECOMMENDED_RATING_THRESHOLD } from "@/lib/types";
import { getCareTypeDisplay } from "@/lib/careTypeDisplay";

const ACCENT_TEAL = "#0d9488";
const BORDER_LEFT_FEATURED = "#0d9488";
const BORDER_LEFT_DEFAULT = "#115e59";

interface FacilityCardProps {
  facility: Facility;
  showBadge?: boolean;
}

function renderRating(
  rating: number | undefined | null,
  reviewCount: number,
  mapsUrl: string
) {
  if (rating == null || rating <= 0) return null;
  const full = Math.floor(Math.max(0, Math.min(5, rating)));
  const starsText = "★".repeat(full) + "☆".repeat(5 - full);
  const ratingText = `${Number(rating).toFixed(1)}★${
    typeof reviewCount === "number" && reviewCount > 0 ? ` • ${reviewCount} review${reviewCount === 1 ? "" : "s"}` : ""
  }`;
  const content = (
    <>
      <span>{starsText}</span>
      <span className="ml-1 text-[15px]">{ratingText}</span>
    </>
  );
  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 text-sm font-semibold text-amber-600 underline underline-offset-2 hover:text-amber-700"
      aria-label={`View ${Number(rating).toFixed(1)} star rating and reviews on Google Maps`}
    >
      {content}
    </a>
  );
}

export default function FacilityCard({ facility, showBadge = true }: FacilityCardProps) {
  const recommended =
    (facility.rating ?? 0) >= RECOMMENDED_RATING_THRESHOLD && facility.rating != null;
  const mapsUrl =
    facility.latitude != null && facility.longitude != null
      ? `https://www.google.com/maps?q=${facility.latitude},${facility.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          [facility.address, facility.city, facility.state].filter(Boolean).join(", ")
        )}`;
  const careDisplay = getCareTypeDisplay(facility.care_type);
  const isFeatured = facility.featured === true;
  const isPremium = facility.premium === true;
  const showReviewCarefully = showBadge && !recommended;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: facility.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: facility.address,
      addressLocality: facility.city,
      addressRegion: facility.state,
    },
    ...(facility.phone && { telephone: facility.phone }),
    ...(facility.website && { url: facility.website }),
    ...(facility.rating != null &&
      (facility.reviews ?? 0) > 0 && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: facility.rating,
          reviewCount: facility.reviews ?? 0,
        },
      }),
  };

  return (
    <article
      className={`relative flex flex-col gap-3 rounded-xl border border-slate-200 border-l-[4px] bg-[#F4F7FA] px-4 py-4 shadow-sm ${isFeatured ? "" : ""}`}
      style={{
        borderTopColor: ACCENT_TEAL,
        borderLeftColor: isFeatured ? BORDER_LEFT_FEATURED : BORDER_LEFT_DEFAULT,
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {isPremium && (
        <span
          className="absolute right-4 top-4 rounded-full border border-teal-600 bg-white px-2.5 py-0.5 text-xs font-semibold text-teal-700"
          aria-label="Premium listing"
        >
          Premium
        </span>
      )}
      {isFeatured && !isPremium && (
        <span
          className="absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
          style={{ backgroundColor: ACCENT_TEAL }}
          aria-label="Featured listing"
        >
          ⭐ Featured
        </span>
      )}
      <div
        className={`flex flex-wrap items-start justify-between gap-2 ${isPremium ? "pr-16" : isFeatured ? "pr-20" : ""}`}
      >
        <h3 className="text-xl font-semibold leading-snug text-teal-900">{facility.name}</h3>
        {renderRating(facility.rating, facility.reviews ?? 0, mapsUrl)}
      </div>
      {(recommended || showReviewCarefully) && (
        <p className="text-xs font-medium">
          {recommended ? (
            <span className="inline-flex rounded-full bg-emerald-600 px-2.5 py-0.5 text-white">
              Recommended
            </span>
          ) : (
            <span className="inline-flex rounded-full bg-amber-600 px-2.5 py-0.5 text-white">
              Review carefully
            </span>
          )}
        </p>
      )}
      <div className="mt-1 flex flex-wrap gap-2">
        <span
          className="inline-flex items-center rounded-full px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-wide text-white"
          style={{ backgroundColor: careDisplay.hex }}
        >
          {careDisplay.emoji} {careDisplay.label}
        </span>
      </div>
      <div className="space-y-1 text-[15px] text-slate-700">
        <p>
          {facility.address}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-[15px]">
        {facility.phone && (
          <p className="font-semibold text-teal-600">{facility.phone}</p>
        )}
        {facility.website && (
          <a
            href={facility.website}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-teal-600 underline underline-offset-2 hover:text-teal-700"
          >
            Visit website
          </a>
        )}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-teal-600 underline underline-offset-2 hover:text-teal-700"
        >
          🗺 View on Google Maps →
        </a>
      </div>
    </article>
  );
}
