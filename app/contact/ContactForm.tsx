"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="mt-4 rounded-lg bg-teal-50 p-4 text-sm text-teal-800">
        Thank you for your message. We&apos;ll respond at the email you provided.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          required
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-teal-500 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
      >
        Send message
      </button>
    </form>
  );
}
