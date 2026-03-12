import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getStateNameFromSlug,
  getFacilitiesForState,
  getCitiesForState,
  getCareTypeBreakdown,
  getTopCitiesForState,
  getTopCareTypes,
  slugify,
} from "@/lib/data";
import { US_STATES, stateToSlug } from "@/lib/states";
import { RECOMMENDED_RATING_THRESHOLD } from "@/lib/types";
import FacilityCard from "@/components/FacilityCard";

const VALID_STATE_SLUGS = new Set(US_STATES.map((s) => stateToSlug(s)));
const SITE_URL = "https://www.daycaredirectories.com";

export function generateStaticParams() {
  return US_STATES.map((stateName) => ({
    "state-slug": stateToSlug(stateName),
  }));
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
  const cities = getCitiesForState(stateSlug);
  const breakdown = getCareTypeBreakdown(facilities);
  const topCities = getTopCitiesForState(stateSlug, 3);
  const topCareTypes = getTopCareTypes(breakdown, 4);
  const recommended = facilities.filter(
    (f) => (f.rating ?? 0) >= RECOMMENDED_RATING_THRESHOLD
  );
  const reviewCarefully = facilities.filter(
    (f) => (f.rating ?? 0) < RECOMMENDED_RATING_THRESHOLD || f.rating == null
  );

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
    <div className="bg-gradient-to-b from-teal-50/60 to-amber-50/40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="font-heading text-3xl font-bold text-teal-900">
          {stateName} Daycare, Preschool & Childcare Directory
        </h1>
        <div className="mt-4 space-y-3 text-slate-600">
          <p className="leading-relaxed">
            {stateName} is home to {facilities.length.toLocaleString()} daycare centers, preschools,
            and childcare providers across {cities.length} {cities.length === 1 ? "city" : "cities"}.
            {cityPhrase ? (
              <>
                {" "}
                From {cityPhrase}, parents across {stateName} have access to a wide range of
                licensed childcare options including {careTypePhrase}.
              </>
            ) : (
              <>
                {" "}
                Parents across {stateName} have access to a wide range of licensed childcare
                options including {careTypePhrase}.
              </>
            )}
          </p>
          <p className="leading-relaxed">
            Use our directory to browse by city, compare ratings, and find the right fit for your
            family. Select a city below to see all licensed facilities, or explore our recommended
            and review-carefully lists to narrow your search.
          </p>
        </div>

        {/* Care type breakdown */}
        {Object.keys(breakdown).length > 0 && (
          <section className="mt-8">
            <h2 className="font-heading text-lg font-semibold text-slate-800">Care types</h2>
            <ul className="mt-2 flex flex-wrap gap-3">
              {Object.entries(breakdown)
                .sort((a, b) => b[1] - a[1])
                .map(([type, count]) => (
                  <li
                    key={type}
                    className="rounded-lg bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm ring-1 ring-teal-200/60"
                  >
                    {type}: {count}
                  </li>
                ))}
            </ul>
          </section>
        )}

        {/* Recommended vs Review Carefully */}
        <section className="mt-10">
          <h2 className="font-heading text-lg font-semibold text-slate-800">By rating</h2>
          <p className="mt-1 text-sm text-slate-600">
            Recommended = rating ≥ {RECOMMENDED_RATING_THRESHOLD}. Review carefully = lower or no rating.
          </p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-medium text-emerald-800">
                Recommended ({recommended.length})
              </h3>
              <ul className="mt-2 space-y-2">
                {recommended.slice(0, 10).map((f) => (
                  <li key={`${f.name}-${f.city}`}>
                    <Link
                      href={`/${stateSlug}/${slugify(f.city)}`}
                      className="text-teal-700 hover:underline"
                    >
                      {f.name}, {f.city}
                    </Link>
                  </li>
                ))}
                {recommended.length > 10 && (
                  <li className="text-sm text-slate-500">
                    +{recommended.length - 10} more in city pages
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-amber-800">
                Review carefully ({reviewCarefully.length})
              </h3>
              <ul className="mt-2 space-y-2">
                {reviewCarefully.slice(0, 10).map((f) => (
                  <li key={`${f.name}-${f.city}`}>
                    <Link
                      href={`/${stateSlug}/${slugify(f.city)}`}
                      className="text-teal-700 hover:underline"
                    >
                      {f.name}, {f.city}
                    </Link>
                  </li>
                ))}
                {reviewCarefully.length > 10 && (
                  <li className="text-sm text-slate-500">
                    +{reviewCarefully.length - 10} more in city pages
                  </li>
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* City listing */}
        <section className="mt-10">
          <h2 className="font-heading text-lg font-semibold text-slate-800">Cities</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/${stateSlug}/${city.slug}`}
                  className="rounded-lg bg-white px-4 py-2 text-teal-700 shadow-sm ring-1 ring-teal-200/60 hover:bg-teal-50 hover:ring-teal-300"
                >
                  {city.name} ({city.count})
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Sample facility cards (first 6) */}
        {facilities.length > 0 && (
          <section className="mt-10">
            <h2 className="font-heading text-lg font-semibold text-slate-800">Sample listings</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {facilities.slice(0, 6).map((f) => (
                <FacilityCard key={`${f.name}-${f.city}-${f.address}`} facility={f} showBadge />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
