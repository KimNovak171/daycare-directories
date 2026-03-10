import Link from "next/link";
import {
  getStateSlugs,
  getAllFacilities,
  getFeaturedFacilities,
} from "@/lib/data";
import { US_STATES, stateToSlug } from "@/lib/states";
import type { Facility } from "@/lib/types";

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
  const mapsUrl = `https://www.google.com/maps?q=${f.latitude},${f.longitude}`;
  return (
    <article className="rounded-xl border border-sky-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-full bg-amber-400/80 px-2.5 py-0.5 text-xs font-semibold text-amber-950">
          Featured
        </span>
      </div>
      <h3 className="font-semibold text-slate-800">{f.name}</h3>
      <p className="mt-1 text-sm text-slate-600">{f.care_type}</p>
      <p className="mt-1 text-sm text-slate-500">{f.address}, {f.city}, {f.state}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        {f.phone && (
          <a href={`tel:${f.phone}`} className="text-sky-600 hover:underline">
            {f.phone}
          </a>
        )}
        {f.website && (
          <a
            href={f.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 hover:underline"
          >
            Website
          </a>
        )}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 hover:underline"
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
    <div className="bg-gradient-to-b from-sky-50/80 to-emerald-50/50">
      {/* Hero */}
      <section className="border-b border-sky-200/60 bg-white/60 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-sky-900 sm:text-4xl md:text-5xl">
            Daycare Directories
          </h1>
          <p className="mt-4 text-lg text-slate-600 sm:text-xl">
            Find Trusted Childcare — City by City
          </p>
          <p className="mt-6 text-slate-600">
            Search or browse daycare centers, preschools, and childcare providers
            by state and city. Compare ratings and find the right fit for your family.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap justify-center gap-8 rounded-2xl bg-white/80 px-6 py-6 shadow-sm ring-1 ring-sky-200/60">
          <div className="text-center">
            <p className="text-3xl font-bold text-sky-700">{totalFacilities.toLocaleString()}</p>
            <p className="text-sm text-slate-600">Facilities</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-700">{totalStates}</p>
            <p className="text-sm text-slate-600">States Covered</p>
          </div>
        </div>
      </section>

      {/* State cards */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="text-xl font-semibold text-slate-800">Browse by State</h2>
        <p className="mt-1 text-slate-600">
          Select a state to see cities and daycare listings.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {US_STATES.map((stateName) => (
            <Link
              key={stateName}
              href={`/${stateToSlug(stateName)}`}
              className="rounded-xl border border-sky-200/80 bg-white p-5 shadow-sm transition hover:border-sky-300 hover:shadow-md"
            >
              <span className="font-medium text-sky-800">{stateName}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Text list of all states */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h2 className="text-xl font-semibold text-slate-800">All States (A–Z)</h2>
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm">
          {US_STATES.map((stateName) => (
            <li key={stateName}>
              <Link
                href={`/${stateToSlug(stateName)}`}
                className="text-sky-700 hover:underline"
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
        <div className="rounded-2xl border border-sky-200/80 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">Canada</h2>
          <p className="mt-2 text-slate-600">
            Browse daycare and childcare listings by province.
          </p>
          <Link
            href="/canada"
            className="mt-4 inline-block rounded-full bg-sky-600 px-5 py-2.5 font-medium text-white hover:bg-sky-700"
          >
            Browse Canada
          </Link>
        </div>
      </section>

      {/* Featured Daycare Centers */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="text-xl font-semibold text-slate-800">Featured Daycare Centers</h2>
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
