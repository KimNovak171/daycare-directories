import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProvinceSlugs,
  getFacilitiesForProvince,
  getCitiesForProvinceWithRating,
  getTopCitiesForProvince,
  getOtherCitiesInProvince,
  slugToProvinceName,
} from "@/lib/canadaData";
import { getCareTypeBreakdown, getTopCareTypes } from "@/lib/data";
import FacilityCard from "@/components/FacilityCard";

const SITE_URL = "https://www.daycaredirectories.com";
const HERO_BG = "#0f766e";
const HERO_SOFT = "rgba(13, 148, 136, 0.15)";
const ACCENT_TEAL = "#0d9488";
const BORDER_LEFT = "#115e59";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getProvinceSlugs().map((slug) => ({ "province-slug": slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ "province-slug": string }>;
}) {
  const { "province-slug": provinceSlug } = await params;
  const name = slugToProvinceName(provinceSlug);
  const facilities = getFacilitiesForProvince(provinceSlug);
  const canonical = `/canada/${provinceSlug}`;
  const title = `${name} Daycare, Preschool & Childcare Directory | Daycare Directories`;
  const description = `Find daycare centers, preschools, and childcare in ${name}, Canada. ${facilities.length} facilities. Browse by city.`;
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

export default async function CanadaProvincePage({
  params,
}: {
  params: Promise<{ "province-slug": string }>;
}) {
  const { "province-slug": provinceSlug } = await params;
  const provinceSlugs = getProvinceSlugs();
  if (!provinceSlugs.includes(provinceSlug)) {
    notFound();
  }

  const provinceName = slugToProvinceName(provinceSlug);
  const facilities = getFacilitiesForProvince(provinceSlug);
  const cities = getCitiesForProvinceWithRating(provinceSlug);
  const breakdown = getCareTypeBreakdown(facilities);
  const topCities = getTopCitiesForProvince(provinceSlug, 4);
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
      { "@type": "ListItem", position: 2, name: "Canada", item: `${SITE_URL}/canada` },
      { "@type": "ListItem", position: 3, name: provinceName, item: `${SITE_URL}/canada/${provinceSlug}` },
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
      <nav className="mb-4 text-sm text-slate-600" aria-label="Breadcrumb">
        <Link href="/" className="font-medium text-teal-600 hover:text-teal-700 hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/canada" className="font-medium text-teal-600 hover:text-teal-700 hover:underline">
          Canada
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{provinceName}</span>
      </nav>

      <section
        className="rounded-2xl px-5 py-6 text-white shadow-lg ring-1 ring-amber-200/40 sm:px-8 sm:py-8"
        style={{ backgroundColor: HERO_BG }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/90">
          Province overview
        </p>
        <h1 className="mt-2 font-heading text-3xl font-semibold sm:text-4xl">
          {provinceName} Daycare, Preschool & Childcare Directory
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-white/90">
          {provinceName} is home to {facilities.length.toLocaleString()} daycare centers, preschools,
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
            Top Picks in {provinceName}
          </h2>
          <p className="text-sm text-slate-600">
            Featured facilities in {provinceName} — verified listings with priority placement.
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
              Daycare & Childcare by City in {provinceName}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              Choose a city to view all listed daycare centers, preschools, and childcare providers.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            <Link href="/canada" className="text-teal-600 hover:text-teal-700">
              Back to Canada
            </Link>
          </div>
        </div>

        {cities.length === 0 ? (
          <p className="text-sm text-slate-600">
            We don&apos;t have facilities listed for {provinceName} yet. As new data becomes available,
            cities and facilities will appear here.
          </p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/canada/${provinceSlug}/${city.slug}`}
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
