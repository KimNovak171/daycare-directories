import Link from "next/link";
import {
  getStateSlugs,
  getAllFacilities,
  getFeaturedFacilities,
  getFacilitiesForState,
} from "@/lib/data";
import { US_STATES, stateToSlug } from "@/lib/states";
import type { Facility } from "@/lib/types";
import { getCareTypeDisplay } from "@/lib/careTypeDisplay";

// Ensure homepage is statically generated at build time (fixes 404 on Vercel)
export const dynamic = "force-static";

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

const STATE_CARD_COLORS = [
  "bg-amber-50/90 border-amber-200/70",
  "bg-sky-50/90 border-sky-200/70",
  "bg-emerald-50/90 border-emerald-200/70",
  "bg-orange-50/90 border-orange-200/70",
] as const;

function FeaturedCard({ f }: { f: Facility }) {
  const mapsUrl = `https://www.google.com/maps?q=${f.latitude},${f.longitude}`;
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

export default function HomePage() {
  const stateSlugs = getStateSlugs();
  const allFacilities = getAllFacilities();
  const totalFacilities = allFacilities.length;
  const totalStates = stateSlugs.length;
  const featured = getFeaturedFacilities(3);
  const showFeatured = featured.length > 0 ? featured : EXAMPLE_FACILITIES;

  return (
    <div className="bg-gradient-to-b from-teal-50/60 to-amber-50/40">
      {/* Hero — warm gradient + subtle decorative background */}
      <section className="relative overflow-hidden border-b border-teal-200/60 px-4 py-14 sm:px-6 sm:py-20">
        {/* Warm gradient: light sky blue → soft yellow-white */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(224, 242, 254, 0.95) 0%, rgba(255, 251, 235, 0.9) 50%, rgba(255, 255, 255, 0.95) 100%)",
          }}
        />
        {/* Subtle watermark-style SVG decorations (10–15% opacity) */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          {/* Star */}
          <svg
            className="absolute left-[10%] top-[20%] h-8 w-8 text-teal-600"
            style={{ opacity: 0.12 }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.5-6.3 4.5 2.3-7-6-4.6h7.6z" />
          </svg>
          {/* Small star */}
          <svg
            className="absolute right-[15%] top-[25%] h-5 w-5 text-amber-600"
            style={{ opacity: 0.1 }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.5-6.3 4.5 2.3-7-6-4.6h7.6z" />
          </svg>
          {/* ABC block — simple flat square */}
          <svg
            className="absolute bottom-[30%] left-[8%] h-9 w-9 text-teal-500"
            style={{ opacity: 0.12 }}
            viewBox="0 0 32 32"
            fill="currentColor"
          >
            <rect x="4" y="8" width="24" height="20" rx="2" transform="rotate(-4 16 18)" />
          </svg>
          {/* Crayon — simple flat shape */}
          <svg
            className="absolute right-[12%] bottom-[25%] h-5 w-5 text-rose-400"
            style={{ opacity: 0.12 }}
            viewBox="0 0 20 24"
            fill="currentColor"
          >
            <path d="M2 2h16l-3 20H5L2 2z" />
          </svg>
          {/* Schoolhouse */}
          <svg
            className="absolute left-[75%] top-[15%] h-12 w-12 text-teal-600"
            style={{ opacity: 0.11 }}
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path d="M24 4L4 16v24h12V28h16v12h12V16L24 4z" />
            <path d="M24 4v12M4 16l20-12 20 12" />
          </svg>
          {/* Second star */}
          <svg
            className="absolute right-[25%] bottom-[35%] h-6 w-6 text-amber-500"
            style={{ opacity: 0.1 }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.5-6.3 4.5 2.3-7-6-4.6h7.6z" />
          </svg>
        </div>
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-teal-900 sm:text-4xl md:text-5xl">
            Daycare Directories
          </h1>
          <p className="mt-4 text-lg text-slate-600 sm:text-xl">
            Find the Perfect Childcare for Your Family — City by City
          </p>
          <p className="mt-6 text-slate-600">
            Search or browse daycare centers, preschools, and childcare providers
            by state and city. Compare ratings and find the right fit for your family.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap justify-center gap-8 rounded-2xl bg-white/80 px-6 py-6 shadow-sm ring-1 ring-teal-200/60">
          <div className="text-center">
            <p className="font-heading text-3xl font-bold text-teal-700">{totalFacilities.toLocaleString()}</p>
            <p className="text-sm text-slate-600">Facilities</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-3xl font-bold text-teal-700">{totalStates}</p>
            <p className="text-sm text-slate-600">States Covered</p>
          </div>
        </div>
      </section>

      {/* State cards */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="font-heading text-xl font-semibold text-slate-800">Browse by State</h2>
        <p className="mt-1 text-slate-600">
          Select a state to see cities and daycare listings.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {US_STATES.map((stateName, index) => {
            const slug = stateToSlug(stateName);
            const count = getFacilitiesForState(slug).length;
            const colorClass = STATE_CARD_COLORS[index % STATE_CARD_COLORS.length];
            return (
              <Link
                key={stateName}
                href={`/${slug}`}
                className={`rounded-xl border p-5 shadow-sm transition hover:shadow-md ${colorClass}`}
              >
                <span className="font-heading font-medium text-slate-800">{stateName}</span>
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

      {/* Text list of all states */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h2 className="font-heading text-xl font-semibold text-slate-800">All States (A–Z)</h2>
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm">
          {US_STATES.map((stateName) => (
            <li key={stateName}>
              <Link
                href={`/${stateToSlug(stateName)}`}
                className="text-teal-700 hover:underline"
              >
                {stateName}
              </Link>
              <span className="text-slate-300">
                {stateName !== US_STATES[US_STATES.length - 1] ? " | " : ""}
              </span>
            </li>
          ))}
        </ul>
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
