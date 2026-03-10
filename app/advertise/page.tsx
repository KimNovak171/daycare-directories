export const metadata = {
  title: "Advertise Your Daycare | Daycare Directories",
  description:
    "Feature your daycare or childcare business with a Featured or Premium listing. Reach families searching for childcare.",
};

export default function AdvertisePage() {
  return (
    <div className="bg-gradient-to-b from-sky-50/80 to-emerald-50/50">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-bold text-sky-900">Advertise With Us</h1>
        <p className="mt-4 text-lg text-slate-600">
          Get in front of families searching for trusted childcare. We offer two
          listing options to help your facility stand out.
        </p>

        <section className="mt-12">
          <div className="rounded-2xl border border-sky-200/80 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-400/80 px-3 py-1 text-sm font-semibold text-amber-950">
                Featured
              </span>
              <h2 className="text-2xl font-semibold text-slate-800">
                Featured Listing — $49/month
              </h2>
            </div>
            <ul className="mt-4 list-inside list-disc space-y-2 text-slate-600">
              <li>Featured Listing badge on your facility card</li>
              <li>Higher visibility in city and state listings</li>
              <li>Include in our Featured Daycare Centers section when relevant</li>
              <li>Link to your website and contact info</li>
            </ul>
            <p className="mt-4 text-sm text-slate-500">
              Payment link will be added here. Contact us to get started.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <div className="rounded-2xl border border-sky-200/80 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-sky-500/90 px-3 py-1 text-sm font-semibold text-white">
                Premium
              </span>
              <h2 className="text-2xl font-semibold text-slate-800">
                Premium Listing — $99/month
              </h2>
            </div>
            <ul className="mt-4 list-inside list-disc space-y-2 text-slate-600">
              <li>Everything in Featured, plus:</li>
              <li>Premium badge and top placement in search results</li>
              <li>Extended profile with photos and description</li>
              <li>Priority support and listing updates</li>
            </ul>
            <p className="mt-4 text-sm text-slate-500">
              Payment link will be added here. Contact us to get started.
            </p>
          </div>
        </section>

        <p className="mt-10 text-center text-slate-600">
          Stripe payment links will be integrated here. Add your links when ready.
        </p>
      </div>
    </div>
  );
}
