import type { Facility } from "@/lib/types";
import { RECOMMENDED_RATING_THRESHOLD } from "@/lib/types";
import { getCareTypeDisplay } from "@/lib/careTypeDisplay";

interface FacilityCardProps {
  facility: Facility;
  showBadge?: boolean;
}

export default function FacilityCard({ facility, showBadge = true }: FacilityCardProps) {
  const recommended =
    (facility.rating ?? 0) >= RECOMMENDED_RATING_THRESHOLD && facility.rating != null;
  const mapsUrl = `https://www.google.com/maps?q=${facility.latitude},${facility.longitude}`;
  const careDisplay = getCareTypeDisplay(facility.care_type);

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
    <article className="rounded-xl border border-teal-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <div className="mb-2 flex flex-wrap items-center gap-2">
        {facility.featured && (
          <span className="rounded-full bg-amber-400/80 px-2.5 py-0.5 text-xs font-semibold text-amber-950">
            Featured Listing
          </span>
        )}
        {showBadge &&
          (recommended ? (
            <span className="rounded-full bg-emerald-200/90 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
              Recommended
            </span>
          ) : (
            <span className="rounded-full bg-amber-200/90 px-2.5 py-0.5 text-xs font-medium text-amber-800">
              Review Carefully
            </span>
          ))}
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${careDisplay.badgeClass}`}>
          {careDisplay.emoji} {careDisplay.label}
        </span>
      </div>
      <h3 className="font-heading font-semibold text-slate-800">{facility.name}</h3>
      <p className="mt-1 text-sm text-slate-500">
        {facility.address}, {facility.city}, {facility.state}
      </p>
      <div className="mt-3 flex flex-wrap gap-3 text-sm">
        {facility.phone && (
          <a href={`tel:${facility.phone}`} className="text-teal-600 hover:underline">
            {facility.phone}
          </a>
        )}
        {facility.website && (
          <a
            href={facility.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:underline"
          >
            Website
          </a>
        )}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-600 hover:underline"
        >
          Map
        </a>
      </div>
      {(facility.rating != null || facility.reviews > 0) && (
        <p className="mt-2 text-sm text-slate-600">
          ★ {facility.rating?.toFixed(1) ?? "—"} ({facility.reviews ?? 0} reviews)
        </p>
      )}
    </article>
  );
}
