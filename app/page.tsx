import Link from "next/link";
import {
  getStateSlugs,
  getAllFacilities,
  getFeaturedFacilities,
  getFacilitiesForState,
  getCitiesForState,
} from "@/lib/data";
import { US_STATES, stateToSlug } from "@/lib/states";
import type { Facility } from "@/lib/types";
import { getCareTypeDisplay } from "@/lib/careTypeDisplay";

// Ensure homepage is statically generated at build time (fixes 404 on Vercel)
export const dynamic = "force-static";

export const metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    siteName: "Daycare Directories",
    type: "website",
  },
};

const EXAMPLE_FACILITIES: Facility[] = [
  {
    name: "Sunshine Kids Learning Center",
    address: "123 Main St",
    city: "Miami",
    state: "Florida",
    phone: "(305) 555-0100",
    website: "https://example.com",
    rating: 4.5,
    reviews: 24,
    care_type: "Day Care Center",
    recommended: true,
    latitude: 25.7617,
    longitude: -80.1918,
    featured: true,
  },
  {
    name: "Little Stars Preschool",
    address: "456 Oak Ave",
    city: "Orlando",
    state: "Florida",
    phone: "(407) 555-0200",
    website: "https://example.com",
    rating: 4.2,
    reviews: 18,
    care_type: "Preschool",
    recommended: true,
    latitude: 28.5383,
    longitude: -81.3792,
    featured: true,
  },
  {
    name: "Happy Tots Childcare",
    address: "789 Pine Rd",
    city: "Tampa",
    state: "Florida",
    phone: "(813) 555-0300",
    website: "https://example.com",
    rating: 4.8,
    reviews: 31,
    care_type: "Day Care Center",
    recommended: true,
    latitude: 27.9506,
    longitude: -82.4572,
    featured: true,
  },
];

function FeaturedCard({ f }: { f: Facility }) {
  const mapsUrl =
    f.latitude != null && f.longitude != null
      ? `https://www.google.com/maps?q=${f.latitude},${f.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          [f.address, f.city, f.state].filter(Boolean).join(", ")
        )}`;
  const careDisplay = getCareTypeDisplay(f.care_type);
  return (
    <article className="rounded-xl border border-teal-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-amber-400/80 px-2.5 py-0.5 text-xs font-semibold text-amber-950">
          Featured
        </span>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${careDisplay.badgeClass}`}>
          {careDisplay.emoji} {careDisplay.label}
        </span>
      </div>
      <h3 className="font-heading font-semibold text-slate-800">{f.name}</h3>
      <p className="mt-1 text-sm text-slate-500">{f.address}, {f.city}, {f.state}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        {f.phone && (
          <a href={`tel:${f.phone}`} className="text-teal-600 hover:underline">
            {f.phone}
          </a>
        )}
        {f.website && (
          <a
            href={f.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:underline"
          >
            Website
          </a>
        )}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-600 hover:underline"
        >
          Map
        </a>
      </div>
      <p className="mt-2 text-sm text-slate-600">
        ★ {f.rating} ({f.reviews} reviews)
      </p>
    </article>
  );
}

const HERO_BG = "#0f766e";
const HERO_SOFT = "rgba(13, 148, 136, 0.2)";

export default function HomePage() {
  const stateSlugs = getStateSlugs();
  const allFacilities = getAllFacilities();
  const totalFacilities = allFacilities.length;
  const totalStates = stateSlugs.length;
  const totalCities = stateSlugs.reduce(
    (acc, slug) => acc + getCitiesForState(slug).length,
    0
  );
  const featured = getFeaturedFacilities(3);
  const showFeatured = featured.length > 0 ? featured : EXAMPLE_FACILITIES;

  return (
    <div className="bg-slate-50 text-slate-900">
      {/* Hero — dark teal, white headline, strong contrast */}
      <section
        className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20"
        style={{ backgroundColor: HERO_BG }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="space-y-6 text-white">
            <p className="inline-flex rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200 ring-1 ring-amber-200/40">
              Daycare Directories
            </p>
            <h1 className="font-heading text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Find the Perfect Childcare for Your Family — City by City
            </h1>
            <p className="max-w-2xl text-balance text-sm text-white/90 sm:text-base">
              Search or browse daycare centers, preschools, and childcare providers by state and
              city. Compare ratings and find the right fit for your family.
            </p>
          </div>

          {/* Stats bar — inside hero, large bold white/amber numbers */}
          <div className="mt-8 grid w-full grid-cols-3 gap-4 rounded-2xl border-2 border-amber-200/40 p-6 shadow-xl sm:gap-6">
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
                States Covered
              </p>
              <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                {totalStates}
              </p>
            </div>
            <div
              className="rounded-xl p-4 text-center ring-1 ring-white/10"
              style={{ backgroundColor: HERO_SOFT }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-200/90">
                Cities Covered
              </p>
              <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                {totalCities.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* State cards — bold heading, bullet-separated state links, cards with count + border + hover */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
          Browse by State
        </h2>
        <p className="mt-1 text-slate-600">
          Select a state to see cities and daycare listings.
        </p>
        <p className="mt-3 text-sm font-medium text-slate-600">
          {US_STATES.map((stateName) => (
            <span key={stateName}>
              <Link
                href={`/${stateToSlug(stateName)}`}
                className="text-teal-600 underline underline-offset-2 hover:text-teal-700"
              >
                {stateName}
              </Link>
              {stateName !== US_STATES[US_STATES.length - 1] ? " • " : ""}
            </span>
          ))}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {US_STATES.map((stateName) => {
            const slug = stateToSlug(stateName);
            const count = getFacilitiesForState(slug).length;
            return (
              <Link
                key={stateName}
                href={`/${slug}`}
                className="rounded-xl border-2 border-teal-200 bg-white p-5 shadow-md transition hover:border-teal-500 hover:bg-teal-50/50"
              >
                <p className="font-heading text-lg font-semibold text-slate-800">{stateName}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {count.toLocaleString()} {count === 1 ? "facility" : "facilities"}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SEO content */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="max-w-none space-y-4 text-slate-600">
          <h2 className="font-heading text-xl font-semibold text-slate-800">
            Find Daycare Near You — A Trusted Childcare Directory
          </h2>
          <p className="leading-relaxed">
            Looking for <strong>daycare near me</strong> or the best <strong>preschool</strong> in your area?
            Our <strong>childcare directory</strong> makes it easy to discover licensed daycare centers,
            preschools, and after-school programs across the United States. Whether you need full-time
            care, part-time options, or a <strong>kindergarten</strong> that fits your schedule, you can
            browse <strong>daycare centers by city</strong> and state to find options that work for your family.
          </p>
          <p className="leading-relaxed">
            We help parents <strong>compare daycare ratings</strong> and reviews so you can make an
            informed decision. Every listing includes contact details, addresses, and links to provider
            websites and maps. Use our state and city pages to narrow your search — from large metro
            areas to smaller towns — and <strong>find preschool</strong> and childcare options that meet
            your needs for quality, location, and care type.
          </p>
          <p className="leading-relaxed">
            Our goal is simple: to connect families with trusted childcare. This <strong>childcare
            directory</strong> is built for parents who want to <strong>compare daycare ratings</strong>,
            explore <strong>daycare centers by city</strong>, and quickly see which providers are
            recommended by other families. Bookmark your state page and check back as we add more
            facilities and cities.
          </p>
          <p className="leading-relaxed">
            Start by choosing your state above, then pick your city to view local daycare centers,
            preschools, nursery schools, and after-school programs. You can <strong>find preschool</strong>
            and <strong>daycare near me</strong> in minutes — we organize everything so you spend less
            time searching and more time visiting the places that feel right for your child.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="font-heading text-xl font-semibold text-slate-800">How It Works</h2>
        <p className="mt-1 text-slate-600">
          Find the right childcare in three simple steps.
        </p>
        <ol className="mt-6 flex flex-col gap-6 sm:flex-row sm:gap-8">
          <li className="flex flex-1 items-start gap-3 rounded-xl border border-teal-200/70 bg-teal-50/50 p-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white">1</span>
            <div>
              <h3 className="font-heading font-semibold text-slate-800">Browse by State</h3>
              <p className="mt-1 text-sm text-slate-600">Select your state to see all cities and facilities we cover.</p>
            </div>
          </li>
          <li className="flex flex-1 items-start gap-3 rounded-xl border border-teal-200/70 bg-teal-50/50 p-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white">2</span>
            <div>
              <h3 className="font-heading font-semibold text-slate-800">Choose Your City</h3>
              <p className="mt-1 text-sm text-slate-600">Pick your city to view daycare centers, preschools, and childcare providers near you.</p>
            </div>
          </li>
          <li className="flex flex-1 items-start gap-3 rounded-xl border border-teal-200/70 bg-teal-50/50 p-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white">3</span>
            <div>
              <h3 className="font-heading font-semibold text-slate-800">Compare & Contact</h3>
              <p className="mt-1 text-sm text-slate-600">Compare ratings and reviews, then call or visit provider websites to get started.</p>
            </div>
          </li>
        </ol>
      </section>

      {/* Canada */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-teal-200/80 bg-white p-8 shadow-sm">
          <h2 className="font-heading text-xl font-semibold text-slate-800">Canada</h2>
          <p className="mt-2 text-slate-600">
            Browse daycare and childcare listings by province.
          </p>
          <Link
            href="/canada"
            className="mt-4 inline-block rounded-full bg-teal-500 px-5 py-2.5 font-medium text-white hover:bg-teal-600"
          >
            Browse Canada
          </Link>
        </div>
      </section>

      {/* Featured Daycare Centers */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="font-heading text-xl font-semibold text-slate-800">Featured Daycare Centers</h2>
        <p className="mt-1 text-slate-600">
          Highlighted providers with strong ratings and reviews.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {showFeatured.map((f) => (
            <FeaturedCard key={`${f.name}-${f.city}`} f={f} />
          ))}
        </div>
      </section>
    </div>
  );
}
