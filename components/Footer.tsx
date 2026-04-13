import Link from "next/link";
import { US_STATES, stateToSlug } from "@/lib/states";
import { getStateSlugs, getCitiesForState } from "@/lib/data";

export default function Footer() {
  const stateSlugsWithData = getStateSlugs();

  return (
    <footer className="border-t border-teal-200/60 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="font-heading text-lg font-bold text-teal-800">
            Daycare Directories
          </Link>
          <p className="text-sm text-slate-600">
            Find the Perfect Childcare for Your Family — City by City
          </p>
        </div>
        <nav className="flex flex-col flex-wrap gap-y-4 text-sm">
          <h3 className="font-heading font-semibold text-slate-800">USA — States & Cities</h3>
          <ul className="flex flex-col gap-1">
            {US_STATES.map((stateName) => {
              const slug = stateToSlug(stateName);
              const hasData = stateSlugsWithData.includes(slug);
              const cities = hasData ? getCitiesForState(slug) : [];
              return (
                <li key={slug} className="flex flex-col gap-0.5">
                  <Link
                    href={`/${slug}`}
                    className="font-medium text-teal-700 hover:underline"
                  >
                    {stateName}
                  </Link>
                  {cities.length > 0 && (
                    <ul className="ml-4 flex flex-wrap gap-x-1 gap-y-0.5">
                      {cities.map((city, i) => (
                        <li key={city.slug} className="inline">
                          <Link
                            href={`/${slug}/${city.slug}`}
                            className="text-slate-600 hover:text-teal-600 hover:underline"
                          >
                            {city.name}
                          </Link>
                          {i < cities.length - 1 ? (
                            <span className="text-slate-400"> · </span>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 pt-4 border-t border-slate-200">
            <Link
              href="/advertise"
              className="font-medium text-teal-700 hover:underline"
            >
              Advertise
            </Link>
            <Link
              href="/contact"
              className="font-medium text-teal-700 hover:underline"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="font-medium text-teal-700 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </nav>
        <p className="mt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} Daycare Directories. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
