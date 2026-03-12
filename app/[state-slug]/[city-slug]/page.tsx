import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getStateNameFromSlug,
  getFacilitiesForCity,
  getCitiesForState,
  getCityNameFromSlug,
  getCareTypeBreakdown,
  getTopCareTypes,
} from "@/lib/data";
import { US_STATES, stateToSlug } from "@/lib/states";
import FacilityCard from "@/components/FacilityCard";

const VALID_STATE_SLUGS = new Set(US_STATES.map((s) => stateToSlug(s)));
const SITE_URL = "https://www.daycaredirectories.com";

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
  const cityName = getCityNameFromSlug(stateSlug, citySlug);
  if (!cityName) {
    notFound();
  }
  const stateName = getStateNameFromSlug(stateSlug);
  const facilities = getFacilitiesForCity(stateSlug, citySlug);
  const cityBreakdown = getCareTypeBreakdown(facilities);
  const topCareTypes = getTopCareTypes(cityBreakdown, 4);
  const careTypePhrase =
    topCareTypes.length > 0
      ? topCareTypes.slice(0, 3).join(", ") + (topCareTypes.length > 3 ? ", and more" : "")
      : "day care centers, preschools, and after school programs";

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
    <div className="bg-gradient-to-b from-teal-50/60 to-amber-50/40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <nav className="mb-6 text-sm text-slate-600">
          <Link href="/" className="hover:text-teal-600 hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/${stateSlug}`} className="hover:text-teal-600 hover:underline">
            {stateName}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">{cityName}</span>
        </nav>
        <h1 className="font-heading text-3xl font-bold text-teal-900">
          Daycare, Preschool & Childcare in {cityName}, {stateName}
        </h1>
        <div className="mt-4 space-y-3 text-slate-600">
          <p className="leading-relaxed">
            {cityName}, {stateName} has {facilities.length.toLocaleString()} daycare center
            {facilities.length !== 1 ? "s" : ""} and childcare provider{facilities.length !== 1 ? "s" : ""}{" "}
            listed in our directory. Browse our complete list of licensed facilities including{" "}
            {careTypePhrase} in {cityName}.
          </p>
          <p className="leading-relaxed">
            Compare ratings, read reviews, and contact providers directly to find the best childcare
            for your family. Use the links below to visit provider websites or get directions.
          </p>
        </div>

        {facilities.length === 0 ? (
          <p className="mt-8 text-slate-600">
            No facilities listed yet. Check back soon or browse other cities in{" "}
            <Link href={`/${stateSlug}`} className="text-teal-600 hover:underline">
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
