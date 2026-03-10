import Link from "next/link";
import { CANADA_PROVINCES, provinceToSlug } from "@/lib/canada";

export const metadata = {
  title: "Canada Daycare & Childcare Directory | Daycare Directories",
  description:
    "Find daycare centers and childcare providers across Canada. Browse by province and territory.",
};

export default function CanadaPage() {
  return (
    <div className="bg-gradient-to-b from-sky-50/80 to-emerald-50/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold text-sky-900">
          Canada Daycare & Childcare
        </h1>
        <p className="mt-2 text-slate-600">
          Browse daycare and childcare listings by province and territory.
        </p>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-800">Provinces & Territories</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {CANADA_PROVINCES.map((name) => (
              <Link
                key={name}
                href={`/canada/${provinceToSlug(name)}`}
                className="rounded-xl border border-sky-200/80 bg-white p-5 shadow-sm transition hover:border-sky-300 hover:shadow-md"
              >
                <span className="font-medium text-sky-800">{name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
