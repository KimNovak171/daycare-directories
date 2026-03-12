import Link from "next/link";

export const metadata = {
  title: "Advertise Your Daycare | Daycare Directories",
  description:
    "Feature your daycare or childcare business with a Featured or Premium listing. Reach families searching for childcare.",
};

const FEATURED_PAYMENT_LINK = "https://buy.stripe.com/eVqcN5fiGgaba4eaLDfAc02";
const PREMIUM_PAYMENT_LINK = "https://buy.stripe.com/9B628r2vU1fh1xI6vnfAc03";

export default function AdvertisePage() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h1 className="font-heading text-3xl font-bold text-teal-900">
          Advertise With Us
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Get in front of families searching for trusted childcare. Choose a
          listing tier below to feature your facility.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Featured Listing */}
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
              Stand out in city and state listings with a Featured badge and
              higher placement. Ideal for single locations.
            </p>
            <ul className="mt-4 list-inside list-disc space-y-1.5 text-sm text-slate-600">
              <li>Featured badge on your facility card</li>
              <li>Higher visibility in city and state directories</li>
              <li>Eligible for homepage Featured Daycare Centers</li>
              <li>Website and contact details highlighted</li>
            </ul>
            <div className="mt-6">
              <a
                href={FEATURED_PAYMENT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-teal-500 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              >
                Get Featured — $49/month
              </a>
            </div>
          </section>

          {/* Premium Listing */}
          <section className="flex flex-col rounded-2xl border-2 border-teal-300 bg-white p-8 shadow-sm ring-1 ring-teal-200/60">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-teal-500 px-3 py-1 text-sm font-semibold text-white">
                Premium
              </span>
              <h2 className="text-2xl font-semibold text-slate-800">
                Premium Listing — $99/month
              </h2>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Maximum visibility with top placement, Premium badge, and priority
              support. Best for multi-location or high-volume providers.
            </p>
            <ul className="mt-4 list-inside list-disc space-y-1.5 text-sm text-slate-600">
              <li>Everything in Featured, plus:</li>
              <li>Premium badge and top placement in results</li>
              <li>Extended profile with photos and description</li>
              <li>Priority support and listing updates</li>
            </ul>
            <div className="mt-6">
              <a
                href={PREMIUM_PAYMENT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-teal-500 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              >
                Get Premium — $99/month
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
