import Link from "next/link";
import {
  getProvinceSlugs,
  getFacilitiesForProvince,
  getCitiesForProvince,
  slugToProvinceName,
} from "@/lib/canadaFacilities";

const SITE_URL = "https://www.daycaredirectories.com";
const HERO_BG = "#0f766e";
const HERO_SOFT = "rgba(13, 148, 136, 0.2)";

export const dynamic = "force-static";

export const metadata = {
  title: "Canada Daycare & Childcare Directory | Daycare Directories",
  description:
    "Find daycare centers, preschools, and childcare providers by province and city across Canada.",
  alternates: { canonical: "/canada" },
  openGraph: {
    title: "Canada Daycare & Childcare Directory | Daycare Directories",
    description:
      "Find daycare centers, preschools, and childcare providers by province and city across Canada.",
    url: `${SITE_URL}/canada`,
    siteName: "Daycare Directories",
    type: "website",
  },
};

export default function CanadaIndexPage() {
  const provinceSlugs = getProvinceSlugs();
  const totalFacilities = provinceSlugs.reduce(
    (acc, slug) => acc + getFacilitiesForProvince(slug).length,
    0
  );
  const totalCities = provinceSlugs.reduce(
    (acc, slug) => acc + getCitiesForProvince(slug).length,
    0
  );

  return (
    <div className="bg-slate-50 text-slate-900">
      <section
        className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20"
        style={{ backgroundColor: HERO_BG }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="space-y-6 text-white">
            <p className="inline-flex rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200 ring-1 ring-amber-200/40">
              Canada
            </p>
            <h1 className="font-heading text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Daycare & Childcare Directory — Canada
            </h1>
            <p className="max-w-2xl text-balance text-sm text-white/90 sm:text-base">
              Browse licensed daycare centers, preschools, and childcare providers by province and
              city. Compare ratings and find trusted care near you.
            </p>
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden px-4 pb-14 sm:px-6 sm:pb-20"
        style={{ backgroundColor: HERO_BG }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid w-full grid-cols-3 gap-4 rounded-2xl border-2 border-amber-200/40 p-6 shadow-xl sm:gap-6">
            <div
              className="rounded-xl p-4 text-center ring-1 ring-white/10"
              style={{ backgroundColor: HERO_SOFT }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-200/90">
                Facilities
              </p>
              <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                {totalFacilities.toLocaleString()}
              </p>
            </div>
            <div
              className="rounded-xl p-4 text-center ring-1 ring-white/10"
              style={{ backgroundColor: HERO_SOFT }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-200/90">
                Provinces
              </p>
              <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                {provinceSlugs.length}
              </p>
            </div>
            <div
              className="rounded-xl p-4 text-center ring-1 ring-white/10"
              style={{ backgroundColor: HERO_SOFT }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-200/90">
                Cities covered
              </p>
              <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                {totalCities.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <nav className="mb-6" aria-label="Breadcrumb">
          <Link
            href="/"
            className="text-sm font-medium text-teal-600 hover:text-teal-700 hover:underline"
          >
            ← Back to homepage
          </Link>
        </nav>
        <h2 className="font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
          Browse by Province
        </h2>
        <p className="mt-1 text-slate-600">
          Select a province or territory to see cities and daycare listings.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {provinceSlugs.map((slug) => {
            const name = slugToProvinceName(slug);
            const count = getFacilitiesForProvince(slug).length;
            return (
              <Link
                key={slug}
                href={`/canada/${slug}`}
                className="rounded-xl border-2 border-teal-200 bg-white p-5 shadow-md transition hover:border-teal-500 hover:bg-teal-50/50"
              >
                <p className="font-heading text-lg font-semibold text-slate-800">{name}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {count.toLocaleString()} {count === 1 ? "facility" : "facilities"}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
