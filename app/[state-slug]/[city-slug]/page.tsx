import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getStateNameFromSlug,
  getFacilitiesForCity,
  getCitiesForState,
  getCityNameFromSlug,
  getCareTypeBreakdown,
  getTopCareTypes,
  getOtherCitiesInState,
} from "@/lib/data";
import { US_STATES, stateToSlug } from "@/lib/states";
import FacilityCard from "@/components/FacilityCard";

const VALID_STATE_SLUGS = new Set(US_STATES.map((s) => stateToSlug(s)));
const SITE_URL = "https://www.daycaredirectories.com";

export const dynamicParams = true;
export const revalidate = 86400; // 24 hours ISR — city pages generated on first request

const DEPLOYED_STATE_NAMES = [
  "Alabama",
  "Arizona",
  "California",
  "Colorado",
  "Florida",
  "Georgia",
  "Illinois",
  "Indiana",
  "Louisiana",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Missouri",
  "New York",
  "North Carolina",
  "Ohio",
  "Pennsylvania",
  "South Carolina",
  "Texas",
  "Virginia",
  "Washington",
  "Wisconsin",
] as const;

export function generateStaticParams() {
  const params: { "state-slug": string; "city-slug": string }[] = [];
  for (const stateName of DEPLOYED_STATE_NAMES) {
    const stateSlug = stateToSlug(stateName);
    const cities = getCitiesForState(stateSlug)
      .slice()
      .sort((a, b) => b.count - a.count)
      .slice(0, 2);
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
  const canonical = `/${stateSlug}/${citySlug}`;
  const title = `${cityName}, ${stateName} Daycare & Childcare | Daycare Directories`;
  const description = `Find daycare centers and childcare in ${cityName}, ${stateName}. Compare ratings and contact info.`;
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

export default async function CityPage({
  params,
}: {
  params: Promise<{ "state-slug": string; "city-slug": string }>;
}) {
  const { "state-slug": stateSlug, "city-slug": citySlug } = await params;
  if (!VALID_STATE_SLUGS.has(stateSlug)) {
    notFound();
  }
  let cityName = getCityNameFromSlug(stateSlug, citySlug);
  const stateName = getStateNameFromSlug(stateSlug);
  const facilities = getFacilitiesForCity(stateSlug, citySlug);
  if (!cityName) {
    cityName = citySlug
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }
  const cityBreakdown = getCareTypeBreakdown(facilities);
  const topCareTypes = getTopCareTypes(cityBreakdown, 4);
  const careTypePhrase =
    topCareTypes.length > 0
      ? topCareTypes.slice(0, 3).join(", ") + (topCareTypes.length > 3 ? ", and more" : "")
      : "day care centers, preschools, and after school programs";
  const otherCities = getOtherCitiesInState(stateSlug, citySlug, 6);

  const facilitiesSorted = [...facilities].sort((a, b) => {
    const score = (f: { featured?: boolean; premium?: boolean }) =>
      f.premium ? 2 : f.featured ? 1 : 0;
    return score(b) - score(a);
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: stateName, item: `${SITE_URL}/${stateSlug}` },
      {
        "@type": "ListItem",
        position: 3,
        name: cityName,
        item: `${SITE_URL}/${stateSlug}/${citySlug}`,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
          Childcare by city
        </p>
        <h1 className="font-heading text-3xl font-semibold text-teal-900">
          Daycare, Preschool & Childcare in {cityName}, {stateName}
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          {cityName}, {stateName} has {facilities.length.toLocaleString()} daycare center
          {facilities.length !== 1 ? "s" : ""} and childcare provider{facilities.length !== 1 ? "s" : ""}{" "}
          listed in our directory. Browse our complete list of licensed facilities including{" "}
          {careTypePhrase} in {cityName}.
        </p>
        <p className="max-w-2xl text-sm text-slate-600">
          Compare ratings, read reviews, and contact providers directly to find the best childcare
          for your family. Use the links below to visit provider websites or get directions.
        </p>
      </header>

      <nav
        aria-label="Breadcrumb"
        className="mt-3 text-xs font-medium text-slate-600"
      >
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="text-teal-600 hover:text-teal-700">
              Home
            </Link>
          </li>
          <li aria-hidden="true">→</li>
          <li>
            <Link href={`/${stateSlug}`} className="text-teal-600 hover:text-teal-700">
              {stateName}
            </Link>
          </li>
          <li aria-hidden="true">→</li>
          <li className="text-slate-700">{cityName}</li>
        </ol>
      </nav>

      <section className="mt-8 space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-900">
          Facilities in {cityName}
        </h2>

        {facilities.length === 0 ? (
          <p className="text-sm text-slate-600">
            We don&apos;t have facilities listed for {cityName}, {stateName} yet. As new data
            becomes available, facilities will appear here. Check back soon or browse other cities
            in{" "}
            <Link href={`/${stateSlug}`} className="text-teal-600 hover:underline">
              {stateName}
            </Link>
            .
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {facilitiesSorted.map((facility) => (
              <FacilityCard
                key={`${facility.name}-${facility.address}`}
                facility={facility}
                showBadge
              />
            ))}
          </div>
        )}
      </section>

      {otherCities.length > 0 && (
        <section className="mt-10 space-y-3 border-t border-slate-200 pt-6">
          <h2 className="text-base font-semibold text-teal-900">
            Other cities in {stateName}
          </h2>
          <p className="text-sm text-slate-600">
            Continue exploring nearby city directories within {stateName}.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {otherCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${stateSlug}/${city.slug}`}
                className="rounded-lg border border-slate-200 border-l-[3px] bg-white px-3 py-2 text-sm text-teal-900 shadow-sm transition hover:border-teal-500 hover:bg-teal-700 hover:text-white"
                style={{ borderLeftColor: "#115e59" }}
              >
                <p className="font-medium">{city.name}</p>
                <p className="text-xs text-slate-600">
                  {city.count.toLocaleString()}{" "}
                  {city.count === 1 ? "facility" : "facilities"}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
