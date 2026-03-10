import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getStateNameFromSlug,
  getFacilitiesForCity,
  getCitiesForState,
  getCityNameFromSlug,
} from "@/lib/data";
import { US_STATES, stateToSlug } from "@/lib/states";
import FacilityCard from "@/components/FacilityCard";

const VALID_STATE_SLUGS = new Set(US_STATES.map((s) => stateToSlug(s)));

export function generateStaticParams() {
  const params: { "state-slug": string; "city-slug": string }[] = [];
  for (const stateName of US_STATES) {
    const stateSlug = stateToSlug(stateName);
    const cities = getCitiesForState(stateSlug);
    for (const city of cities) {
      params.push({ "state-slug": stateSlug, "city-slug": city.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ "state-slug": string; "city-slug": string }>;
}) {
  const { "state-slug": stateSlug, "city-slug": citySlug } = await params;
  const stateName = getStateNameFromSlug(stateSlug);
  const cityName = getCityNameFromSlug(stateSlug, citySlug);
  if (!cityName) return { title: "City | Daycare Directories" };
  return {
    title: `${cityName}, ${stateName} Daycare & Childcare | Daycare Directories`,
    description: `Find daycare centers and childcare in ${cityName}, ${stateName}. Compare ratings and contact info.`,
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ "state-slug": string; "city-slug": string }>;
}) {
  const { "state-slug": stateSlug, "city-slug": citySlug } = await params;
  if (!VALID_STATE_SLUGS.has(stateSlug)) {
    notFound();
  }
  const cityName = getCityNameFromSlug(stateSlug, citySlug);
  if (!cityName) {
    notFound();
  }
  const stateName = getStateNameFromSlug(stateSlug);
  const facilities = getFacilitiesForCity(stateSlug, citySlug);

  return (
    <div className="bg-gradient-to-b from-sky-50/80 to-emerald-50/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <nav className="mb-6 text-sm text-slate-600">
          <Link href="/" className="hover:text-sky-600 hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/${stateSlug}`} className="hover:text-sky-600 hover:underline">
            {stateName}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">{cityName}</span>
        </nav>
        <h1 className="text-3xl font-bold text-sky-900">
          Daycare & Childcare in {cityName}, {stateName}
        </h1>
        <p className="mt-2 text-slate-600">
          {facilities.length} facility{facilities.length !== 1 ? "ies" : ""} in this city.
        </p>

        {facilities.length === 0 ? (
          <p className="mt-8 text-slate-600">
            No facilities listed yet. Check back soon or browse other cities in{" "}
            <Link href={`/${stateSlug}`} className="text-sky-600 hover:underline">
              {stateName}
            </Link>
            .
          </p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility) => (
              <FacilityCard
                key={`${facility.name}-${facility.address}`}
                facility={facility}
                showBadge
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
