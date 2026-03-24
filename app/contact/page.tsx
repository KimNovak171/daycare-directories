import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Us | Daycare Directories",
  description:
    "Get in touch with Daycare Directories. Send us a message or email hello@directoriesnetwork.com.",
};

const CONTACT_EMAIL = "hello@directoriesnetwork.com";

export default function ContactPage() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
        <h1 className="font-heading text-3xl font-bold text-teal-900">
          Contact Us
        </h1>
        <p className="mt-2 text-slate-600">
          Have a question or feedback? Send us a message or reach us by email.
        </p>

        <div className="mt-8 rounded-2xl border-2 border-teal-200/80 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-heading text-xl font-semibold text-slate-800">
            Send a message
          </h2>
          <ContactForm />
        </div>

        <div className="mt-8 rounded-2xl border-2 border-teal-200/80 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-heading text-xl font-semibold text-slate-800">
            Email
          </h2>
          <p className="mt-2 text-slate-600">
            You can also contact us directly at:
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-2 inline-block font-medium text-teal-600 hover:text-teal-700 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          <Link href="/" className="text-teal-600 hover:underline">
            ← Back to homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
