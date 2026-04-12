import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPostMeta = {
  title: string;
  date: string;
  description: string;
  slug: string;
};

export type BlogPost = BlogPostMeta & {
  contentHtml: string;
};

function resolveSlug(filename: string, frontMatterSlug: unknown): string {
  if (typeof frontMatterSlug === "string" && frontMatterSlug.trim() !== "") {
    return frontMatterSlug.trim();
  }
  return filename.replace(/\.md$/i, "");
}

async function markdownToHtml(markdown: string): Promise<string> {
  const file = await remark().use(remarkHtml).process(markdown);
  return String(file);
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts: BlogPostMeta[] = [];

  for (const file of files) {
    const fullPath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);
    posts.push({
      title: String(data.title ?? ""),
      date: String(data.date ?? ""),
      description: String(data.description ?? ""),
      slug: resolveSlug(file, data.slug),
    });
  }

  posts.sort((a, b) => {
    const tb = new Date(b.date).getTime();
    const ta = new Date(a.date).getTime();
    if (Number.isNaN(tb) && Number.isNaN(ta)) return 0;
    if (Number.isNaN(tb)) return -1;
    if (Number.isNaN(ta)) return 1;
    return tb - ta;
  });

  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!fs.existsSync(BLOG_DIR)) {
    return null;
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const fullPath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);
    const postSlug = resolveSlug(file, data.slug);
    if (postSlug !== slug) {
      continue;
    }

    const contentHtml = await markdownToHtml(content);
    return {
      title: String(data.title ?? ""),
      date: String(data.date ?? ""),
      description: String(data.description ?? ""),
      slug: postSlug,
      contentHtml,
    };
  }

  return null;
}
