import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Daycare Tips & Guides for Parents | Daycare Directories",
  description:
    "Practical articles on choosing daycare, costs, transitions, health policies, and more for parents and caregivers.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Daycare Tips & Guides for Parents | Daycare Directories",
    description:
      "Practical articles on choosing daycare, costs, transitions, health policies, and more for parents and caregivers.",
    url: "https://www.daycaredirectories.com/blog",
    siteName: "Daycare Directories",
    type: "website",
  },
};

function formatPostDate(isoDate: string): string {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) {
    return isoDate;
  }
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="font-heading text-3xl font-bold text-teal-900 sm:text-4xl">
          Daycare Tips &amp; Guides for Parents
        </h1>
        <p className="mt-3 text-slate-600">
          Articles to help you choose care, understand policies, and support your
          child&apos;s transition and well-being.
        </p>

        <ul className="mt-10 space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="rounded-2xl border-2 border-teal-200/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-lg"
                >
                  <h2 className="font-heading text-xl font-semibold text-teal-800 group-hover:text-teal-600 sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {formatPostDate(post.date)}
                  </p>
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    {post.description}
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold text-teal-600 group-hover:text-teal-700 group-hover:underline">
                    Read article →
                  </span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
