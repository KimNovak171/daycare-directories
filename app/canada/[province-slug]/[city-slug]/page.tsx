import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProvinceSlugs,
  getFacilitiesForProvinceCity,
  getCitiesForProvince,
  getCityNameFromSlug,
  getOtherCitiesInProvince,
  slugToProvinceName,
} from "@/lib/canadaData";
import { getCareTypeBreakdown, getTopCareTypes } from "@/lib/data";
import FacilityCard from "@/components/FacilityCard";

const SITE_URL = "https://www.daycaredirectories.com";
const BORDER_LEFT = "#115e59";

export function generateStaticParams() {
  const params: { "province-slug": string; "city-slug": string }[] = [];
  const provinceSlugs = getProvinceSlugs();
  for (const provinceSlug of provinceSlugs) {
    const cities = getCitiesForProvince(provinceSlug)
      .slice()
      .sort((a, b) => b.count - a.count);
    for (const city of cities) {
      params.push({ "province-slug": provinceSlug, "city-slug": city.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ "province-slug": string; "city-slug": string }>;
}) {
  const { "province-slug": provinceSlug, "city-slug": citySlug } = await params;
  const provinceName = slugToProvinceName(provinceSlug);
  const cityName = getCityNameFromSlug(provinceSlug, citySlug);
  if (!cityName) return { title: "City | Daycare Directories" };
  const canonical = `/canada/${provinceSlug}/${citySlug}`;
  const title = `${cityName}, ${provinceName} Daycare & Childcare | Daycare Directories`;
  const description = `Find daycare centers and childcare in ${cityName}, ${provinceName}, Canada. Compare ratings and contact info.`;
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

export default async function CanadaCityPage({
  params,
}: {
  params: Promise<{ "province-slug": string; "city-slug": string }>;
}) {
  const { "province-slug": provinceSlug, "city-slug": citySlug } = await params;
  const provinceSlugs = getProvinceSlugs();
  if (!provinceSlugs.includes(provinceSlug)) {
    notFound();
  }

  let cityName = getCityNameFromSlug(provinceSlug, citySlug);
  const provinceName = slugToProvinceName(provinceSlug);
  const facilities = getFacilitiesForProvinceCity(provinceSlug, citySlug);
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
  const otherCities = getOtherCitiesInProvince(provinceSlug, citySlug, 6);

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
      { "@type": "ListItem", position: 2, name: "Canada", item: `${SITE_URL}/canada` },
      { "@type": "ListItem", position: 3, name: provinceName, item: `${SITE_URL}/canada/${provinceSlug}` },
      {
        "@type": "ListItem",
        position: 4,
        name: cityName,
        item: `${SITE_URL}/canada/${provinceSlug}/${citySlug}`,
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
          Daycare, Preschool & Childcare in {cityName}, {provinceName}, Canada
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          {cityName}, {provinceName} has {facilities.length.toLocaleString()} daycare center
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
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/canada" className="text-teal-600 hover:text-teal-700">
              Canada
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/canada/${provinceSlug}`} className="text-teal-600 hover:text-teal-700">
              {provinceName}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-700">{cityName}</li>
        </ol>
      </nav>

      <section className="mt-8 space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-900">
          Facilities in {cityName}
        </h2>

        {facilities.length === 0 ? (
          <p className="text-sm text-slate-600">
            We don&apos;t have facilities listed for {cityName}, {provinceName} yet. As new data
            becomes available, facilities will appear here. Check back soon or browse other cities
            in{" "}
            <Link href={`/canada/${provinceSlug}`} className="text-teal-600 hover:underline">
              {provinceName}
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
            Other cities in {provinceName}
          </h2>
          <p className="text-sm text-slate-600">
            Continue exploring nearby city directories within {provinceName}.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {otherCities.map((city) => (
              <Link
                key={city.slug}
                href={`/canada/${provinceSlug}/${city.slug}`}
                className="rounded-lg border border-slate-200 border-l-[3px] bg-white px-3 py-2 text-sm text-teal-900 shadow-sm transition hover:border-teal-500 hover:bg-teal-700 hover:text-white"
                style={{ borderLeftColor: BORDER_LEFT }}
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
