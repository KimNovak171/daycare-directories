import Link from "next/link";
import { notFound } from "next/navigation";
import { CANADA_PROVINCES, provinceToSlug, slugToProvinceName } from "@/lib/canada";

const VALID_PROVINCE_SLUGS = new Set(CANADA_PROVINCES.map((p) => provinceToSlug(p)));

export function generateStaticParams() {
  return [];
}

export default async function CanadaCityPage({
  params,
}: {
  params: Promise<{ "province-slug": string; "city-slug": string }>;
}) {
  const { "province-slug": provinceSlug, "city-slug": citySlug } = await params;
  if (!VALID_PROVINCE_SLUGS.has(provinceSlug)) {
    notFound();
  }
  const provinceName = slugToProvinceName(provinceSlug);
  const cityName = citySlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="bg-gradient-to-b from-sky-50/80 to-emerald-50/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <nav className="mb-6 text-sm text-slate-600">
          <Link href="/" className="hover:text-sky-600 hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/canada" className="hover:text-sky-600 hover:underline">
            Canada
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/canada/${provinceSlug}`}
            className="hover:text-sky-600 hover:underline"
          >
            {provinceName}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">{cityName}</span>
        </nav>
        <h1 className="text-3xl font-bold text-sky-900">
          Daycare & Childcare in {cityName}, {provinceName}
        </h1>
        <p className="mt-2 text-slate-600">
          No facilities listed yet for this city. Check back soon.
        </p>
      </div>
    </div>
  );
}
