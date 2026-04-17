import Link from "next/link";

export const metadata = {
  title: "Advertise Your Daycare | Daycare Directories",
  description:
    "Feature your daycare with a Featured monthly or annual listing. Reach families searching for childcare in your city.",
};

const FEATURED_MONTHLY_LINK = "https://buy.stripe.com/eVqcN5fiGgaba4eaLDfAc02";
const FEATURED_ANNUAL_LINK = "https://buy.stripe.com/aFa4gzfiG2jl90aaLDfAc0O";

export default function AdvertisePage() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h1 className="font-heading text-3xl font-bold text-teal-900">
          Advertise With Us
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Get in front of families searching for trusted childcare in your city.
          Choose the option that works best for your daycare.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <section className="flex flex-col rounded-2xl border-2 border-teal-200/80 bg-white p-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-amber-400/90 px-3 py-1 text-sm font-semibold text-amber-950">
                Featured
              </span>
              <h2 className="text-2xl font-semibold text-slate-800">
                Featured Listing — $49/month
              </h2>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Your daycare appears at the top of your city page, above all
              standard listings. Be the first daycare families find when searching
              in your city.
            </p>
            <ul className="mt-4 list-inside list-disc space-y-1.5 text-sm text-slate-600">
              <li>Top placement on your city directory page</li>
              <li>Featured badge on your listing</li>
              <li>Website and contact details highlighted</li>
              <li>Cancel anytime</li>
            </ul>
            <div className="mt-6">
              <a
                href={FEATURED_MONTHLY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-teal-500 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              >
                Get Featured — $49/month
              </a>
            </div>
          </section>

          <section className="flex flex-col rounded-2xl border-2 border-teal-200/80 bg-white p-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-amber-400/90 px-3 py-1 text-sm font-semibold text-amber-950">
                Best Value
              </span>
              <h2 className="text-2xl font-semibold text-slate-800">
                Featured Listing — $247/year
              </h2>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Same top city page placement, billed once a year. One new enrollment
              more than covers the entire year.
            </p>
            <ul className="mt-4 list-inside list-disc space-y-1.5 text-sm text-slate-600">
              <li>Everything in the monthly plan</li>
              <li>Billed once annually</li>
              <li>Save $341 compared to monthly pricing</li>
              <li>Cancel anytime</li>
            </ul>
            <div className="mt-6">
              <a
                href={FEATURED_ANNUAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-teal-500 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              >
                Get Featured — $247/year
              </a>
            </div>
          </section>
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          Questions?{" "}
          <Link href="/" className="font-medium text-teal-600 hover:underline">
            Return home
          </Link>{" "}
          or contact us for custom or multi-location pricing.
        </p>
      </div>
    </div>
  );
}
