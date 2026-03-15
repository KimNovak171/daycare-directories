import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Daycare Directories",
  description:
    "Privacy policy for Daycare Directories. How we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="font-heading text-3xl font-bold text-teal-900">
          Privacy Policy
        </h1>
        <p className="mt-2 text-slate-600">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-10 space-y-8 text-slate-700">
          <section>
            <h2 className="font-heading text-xl font-semibold text-slate-800">
              Introduction
            </h2>
            <p className="mt-2">
              Daycare Directories (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is operated by Stonecreek Stationery Inc. This Privacy Policy explains how we collect, use, and protect your information when you use our website daycaredirectories.com.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-slate-800">
              Information We Collect
            </h2>
            <p className="mt-2">
              We may collect the following types of information:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>
                <strong>Contact form submissions:</strong> When you use our contact form, we collect the name, email address, and message you provide. We use this information solely to respond to your inquiry.
              </li>
              <li>
                <strong>Analytics:</strong> We may use analytics services (such as Google Analytics) to understand how visitors use our site. This can include information such as pages visited, time on site, general location (e.g., country or region), and device type. This data is aggregated and does not personally identify you.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-slate-800">
              Google AdSense
            </h2>
            <p className="mt-2">
              We may use Google AdSense to display advertisements on our website. Google AdSense uses cookies and similar technologies to show ads based on your prior visits to our site or other websites. You can learn more about how Google uses data at{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:underline"
              >
                Google&apos;s Advertising Policy
              </a>
              . You can opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:underline"
              >
                Google Ad Settings
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-slate-800">
              Use of Cookies
            </h2>
            <p className="mt-2">
              We use cookies and similar technologies to improve your experience on our site. Cookies are small text files stored on your device. They may be used for:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Remembering your preferences</li>
              <li>Understanding how you use our site (analytics)</li>
              <li>Delivering and measuring the effectiveness of ads (e.g., via Google AdSense)</li>
            </ul>
            <p className="mt-2">
              You can control or delete cookies through your browser settings. Note that disabling cookies may affect how some parts of our site function.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-slate-800">
              We Do Not Sell Your Personal Data
            </h2>
            <p className="mt-2">
              We do not sell, rent, or trade your personal information to third parties. Any data we collect is used only as described in this policy—to respond to your inquiries, improve our site, and (where applicable) to display relevant advertising.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-slate-800">
              Contact Information
            </h2>
            <p className="mt-2">
              If you have questions about this Privacy Policy or your personal data, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Stonecreek Stationery Inc.</strong>
              <br />
              Email:{" "}
              <a
                href="mailto:hello@daycaredirectories.com"
                className="text-teal-600 hover:underline"
              >
                hello@daycaredirectories.com
              </a>
            </p>
          </section>
        </div>

        <p className="mt-10 text-sm text-slate-500">
          <Link href="/" className="text-teal-600 hover:underline">
            ← Back to homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
