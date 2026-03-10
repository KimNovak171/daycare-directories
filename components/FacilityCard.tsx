import type { Facility } from "@/lib/types";
import { RECOMMENDED_RATING_THRESHOLD } from "@/lib/types";

interface FacilityCardProps {
  facility: Facility;
  showBadge?: boolean;
}

export default function FacilityCard({ facility, showBadge = true }: FacilityCardProps) {
  const recommended =
    (facility.rating ?? 0) >= RECOMMENDED_RATING_THRESHOLD && facility.rating != null;
  const mapsUrl = `https://www.google.com/maps?q=${facility.latitude},${facility.longitude}`;

  return (
    <article className="rounded-xl border border-sky-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
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
      </div>
      <h3 className="font-semibold text-slate-800">{facility.name}</h3>
      <p className="mt-1 text-sm text-slate-600">{facility.care_type}</p>
      <p className="mt-1 text-sm text-slate-500">
        {facility.address}, {facility.city}, {facility.state}
      </p>
      <div className="mt-3 flex flex-wrap gap-3 text-sm">
        {facility.phone && (
          <a href={`tel:${facility.phone}`} className="text-sky-600 hover:underline">
            {facility.phone}
          </a>
        )}
        {facility.website && (
          <a
            href={facility.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 hover:underline"
          >
            Website
          </a>
        )}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 hover:underline"
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
