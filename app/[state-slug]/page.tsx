import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getStateNameFromSlug,
  getFacilitiesForState,
  getCareTypeBreakdown,
  getTopCitiesForState,
  getTopCareTypes,
  getCitiesForStateWithRating,
} from "@/lib/data";
import { US_STATES, stateToSlug } from "@/lib/states";
import FacilityCard from "@/components/FacilityCard";

const VALID_STATE_SLUGS = new Set([
  ...US_STATES.map((s) => stateToSlug(s)),
  "washington-dc",
]);
const SITE_URL = "https://www.daycaredirectories.com";

// Rich dark teal (parent-friendly substitute for navy)
const HERO_BG = "#0f766e";
const HERO_SOFT = "rgba(13, 148, 136, 0.15)";
const ACCENT_TEAL = "#0d9488";
const BORDER_LEFT = "#115e59";

export const dynamicParams = false;

export function generateStaticParams() {
  const stateParams = US_STATES.map((stateName) => ({
    "state-slug": stateToSlug(stateName),
  }));
  return [...stateParams, { "state-slug": "washington-dc" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ "state-slug": string }>;
}) {
  const { "state-slug": stateSlug } = await params;
  const name = getStateNameFromSlug(stateSlug);
  const facilities = getFacilitiesForState(stateSlug);
  const canonical = `/${stateSlug}`;
  const title = `${name} Daycare & Childcare Directory | Daycare Directories`;
  const description = `Find daycare centers, preschools, and childcare in ${name}. ${facilities.length} facilities. Browse by city.`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${canonical}`,
      siteName: "Daycare Directories",
      type: "website",
    },
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ "state-slug": string }>;
}) {
  const { "state-slug": stateSlug } = await params;
  if (!VALID_STATE_SLUGS.has(stateSlug)) {
    notFound();
  }

  const stateName = getStateNameFromSlug(stateSlug);
  const facilities = getFacilitiesForState(stateSlug);
  const cities = getCitiesForStateWithRating(stateSlug);
  const breakdown = getCareTypeBreakdown(facilities);
  const topCities = getTopCitiesForState(stateSlug, 4);
  const topCareTypes = getTopCareTypes(breakdown, 4);
  const averageRating =
    facilities.length > 0
      ? facilities.reduce((sum, f) => sum + (f.rating ?? 0), 0) /
        facilities.filter((f) => f.rating != null).length
      : null;
  const hasRating = typeof averageRating === "number" && !Number.isNaN(averageRating);
  const featuredFacilities = facilities.filter((f) => f.featured || f.premium).slice(0, 3);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: stateName, item: `${SITE_URL}/${stateSlug}` },
    ],
  };

  const cityList = topCities.map((c) => c.name);
  const cityPhrase =
    cityList.length >= 2
      ? `${cityList.slice(0, -1).join(", ")} and ${cityList[cityList.length - 1]}`
      : cityList[0] ?? "";
  const careTypePhrase =
    topCareTypes.length > 0
      ? topCareTypes.slice(0, 3).join(", ") + (topCareTypes.length > 3 ? ", and more" : "")
      : "day care centers, preschools, after school programs, and more";

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav className="mb-4" aria-label="Breadcrumb">
        <Link
          href="/"
          className="text-sm font-medium text-teal-600 hover:text-teal-700 hover:underline"
        >
          ← Back to homepage
        </Link>
      </nav>
      <Link
        href="/advertise"
        className="mb-4 flex items-center justify-center gap-2 rounded-full bg-teal-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
        aria-label="View featured listing pricing and benefits"
      >
        Get your facility featured — view pricing &amp; benefits →
      </Link>

      <section
        className="rounded-2xl px-5 py-6 text-white shadow-lg ring-1 ring-amber-200/40 sm:px-8 sm:py-8"
        style={{ backgroundColor: HERO_BG }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/90">
          State overview
        </p>
        <h1 className="mt-2 font-heading text-3xl font-semibold sm:text-4xl">
          Daycare, Preschool & Childcare in {stateName}
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-white/90">
          {stateName} is home to {facilities.length.toLocaleString()} daycare centers, preschools,
          and childcare providers across {cities.length} {cities.length === 1 ? "city" : "cities"}.
          {cityPhrase ? (
            <> From {cityPhrase}, parents have access to licensed options including {careTypePhrase}.</>
          ) : (
            <> Parents have access to licensed options including {careTypePhrase}.</>
          )}{" "}
          Use this page to browse by city, compare ratings, and find the right fit for your family.
        </p>
        <div className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
          <div className="rounded-xl p-4 ring-1 ring-white/10" style={{ backgroundColor: HERO_SOFT }}>
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-200/90">
              Facilities listed
            </p>
            <p className="mt-1 text-2xl font-semibold">{facilities.length.toLocaleString()}</p>
          </div>
          <div className="rounded-xl p-4 ring-1 ring-white/10" style={{ backgroundColor: HERO_SOFT }}>
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-200/90">
              Cities covered
            </p>
            <p className="mt-1 text-2xl font-semibold">{cities.length}</p>
          </div>
          <div className="rounded-xl p-4 ring-1 ring-white/10" style={{ backgroundColor: HERO_SOFT }}>
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-200/90">
              Average rating
            </p>
            <p className="mt-1 flex items-baseline gap-2 text-2xl font-semibold">
              {hasRating ? averageRating?.toFixed(1) : "—"}
              {hasRating && (
                <span className="text-xs font-medium text-amber-200/90">/ 5 stars</span>
              )}
            </p>
          </div>
        </div>
      </section>

      {featuredFacilities.length > 0 && (
        <section className="mt-8 space-y-4 rounded-2xl border-2 border-teal-200 bg-teal-50/50 p-6">
          <h2 className="inline-block border-b border-teal-300 pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-teal-800">
            Top Picks in {stateName}
          </h2>
          <p className="text-sm text-slate-600">
            Featured facilities in {stateName} — verified listings with priority placement.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredFacilities.map((f) => (
              <FacilityCard key={`${f.name}-${f.city}-${f.address}`} facility={f} showBadge />
            ))}
          </div>
        </section>
      )}

      <section className="mt-8 space-y-4 rounded-2xl border-2 border-teal-200/80 bg-teal-50/30 p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="inline-block border-b-2 border-teal-400/50 pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-teal-900">
              Daycare & Childcare by City in {stateName}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              Choose a city to view all listed daycare centers, preschools, and childcare providers.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            <Link href="/" className="text-teal-600 hover:text-teal-700">
              Back to homepage
            </Link>
          </div>
        </div>

        {cities.length === 0 ? (
          <p className="text-sm text-slate-600">
            We don&apos;t have facilities listed for {stateName} yet. As new data becomes available,
            cities and facilities will appear here.
          </p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${stateSlug}/${city.slug}`}
                className="group flex items-center justify-between rounded-lg border border-slate-200 border-l-[3px] bg-white px-3 py-2 text-sm text-teal-900 shadow-sm transition hover:border-teal-500 hover:bg-teal-700 hover:text-white"
                style={{ borderLeftColor: BORDER_LEFT }}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{city.name}</span>
                  <span className="text-xs text-slate-600 group-hover:text-white/85">
                    {city.count.toLocaleString()}{" "}
                    {city.count === 1 ? "facility" : "facilities"}
                  </span>
                </div>
                <span
                  className="rounded-full px-2.5 py-1 text-xs font-bold text-white"
                  style={{ backgroundColor: ACCENT_TEAL }}
                >
                  {city.averageRating ? `${city.averageRating.toFixed(1)}★` : "N/A"}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
