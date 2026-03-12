import Link from "next/link";
import { notFound } from "next/navigation";
import { CANADA_PROVINCES, provinceToSlug, slugToProvinceName } from "@/lib/canada";

const VALID_PROVINCE_SLUGS = new Set(CANADA_PROVINCES.map((p) => provinceToSlug(p)));

export function generateStaticParams() {
  return CANADA_PROVINCES.map((name) => ({
    "province-slug": provinceToSlug(name),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ "province-slug": string }>;
}) {
  const { "province-slug": provinceSlug } = await params;
  const name = slugToProvinceName(provinceSlug);
  return {
    title: `${name} Daycare & Childcare | Daycare Directories`,
    description: `Find daycare and childcare in ${name}, Canada.`,
  };
}

export default async function CanadaProvincePage({
  params,
}: {
  params: Promise<{ "province-slug": string }>;
}) {
  const { "province-slug": provinceSlug } = await params;
  if (!VALID_PROVINCE_SLUGS.has(provinceSlug)) {
    notFound();
  }
  const provinceName = slugToProvinceName(provinceSlug);

  return (
    <div className="bg-gradient-to-b from-teal-50/60 to-amber-50/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <nav className="mb-6 text-sm text-slate-600">
          <Link href="/" className="hover:text-teal-600 hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/canada" className="hover:text-teal-600 hover:underline">
            Canada
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">{provinceName}</span>
        </nav>
        <h1 className="font-heading text-3xl font-bold text-teal-900">
          {provinceName} Daycare & Childcare
        </h1>
        <p className="mt-2 text-slate-600">
          Daycare and childcare listings for {provinceName}. City data coming soon.
        </p>
        <p className="mt-6 text-slate-500">
          No city listings yet for this province. Check back soon.
        </p>
      </div>
    </div>
  );
}
