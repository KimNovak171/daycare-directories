import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

const SITE_URL = "https://www.daycaredirectories.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Article | Daycare Directories" };
  }
  const canonical = `/blog/${post.slug}`;
  return {
    title: `${post.title} | Daycare Directories`,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}${canonical}`,
      siteName: "Daycare Directories",
      type: "article",
    },
  };
}

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

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  return (
    <div className="bg-slate-50">
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <header>
          <p className="text-sm font-medium text-slate-500">
            {formatPostDate(post.date)}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-teal-900 sm:text-4xl">
            {post.title}
          </h1>
        </header>

        <div
          className="blog-prose mt-10 max-w-none text-slate-700 [&_a]:font-medium [&_a]:text-teal-600 [&_a]:underline-offset-2 hover:[&_a]:text-teal-700 [&_blockquote]:border-l-4 [&_blockquote]:border-teal-200 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-600 [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-slate-800 [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-slate-800 [&_li]:my-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_p]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-slate-800 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <p className="mt-12 text-sm text-slate-500">
          <Link
            href="/blog"
            className="font-medium text-teal-600 hover:text-teal-700 hover:underline"
          >
            ← Back to Blog
          </Link>
        </p>
      </article>
    </div>
  );
}
