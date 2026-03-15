import Link from "next/link";
import { getProvinceSlugs, getFacilitiesForProvince } from "@/lib/canadaData";
import { slugToProvinceName } from "@/lib/canada";

export const dynamic = "force-static";

export const metadata = {
  title: "Canada Daycare & Childcare Directory | Daycare Directories",
  description:
    "Find daycare centers and childcare providers across Canada. Browse by province and territory.",
};

export default function CanadaPage() {
  const provinceSlugs = getProvinceSlugs();

  return (
    <div className="bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <nav className="mb-6 text-sm text-slate-600" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-teal-600 hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">Canada</span>
        </nav>

        <h1 className="font-heading text-3xl font-bold text-teal-900">
          Canada Daycare & Childcare Directory
        </h1>
        <p className="mt-2 text-slate-600">
          Browse daycare and childcare listings by province. Select a province to see cities and facilities.
        </p>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
            Browse by Province
          </h2>
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
    </div>
  );
}
