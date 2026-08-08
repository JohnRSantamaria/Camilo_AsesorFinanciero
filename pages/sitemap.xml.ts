import type { GetServerSideProps } from "next";
import { createPublicClient } from "@/lib/supabase/public";
import { isPostLive } from "@/lib/posts/visibility";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import type { Post } from "@/types/post";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(loc: string, lastmod?: string | null, priority = "0.7") {
  const lastmodTag = lastmod
    ? `\n    <lastmod>${escapeXml(lastmod.slice(0, 10))}</lastmod>`
    : "";
  return `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmodTag}
    <priority>${priority}</priority>
  </url>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const staticUrls = [
    urlEntry(SITE_URL, null, "1.0"),
    urlEntry(absoluteUrl("/blog"), null, "0.9"),
    urlEntry(absoluteUrl("/privacidad"), null, "0.3"),
  ];

  let postUrls: string[] = [];
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("posts")
      .select("slug, published, published_at, updated_at")
      .eq("published", true)
      .order("published_at", { ascending: false });

    const live = ((data ?? []) as Pick<
      Post,
      "slug" | "published" | "published_at" | "updated_at"
    >[]).filter((post) => isPostLive(post));

    postUrls = live.map((post) =>
      urlEntry(
        absoluteUrl(`/blog/${post.slug}`),
        post.updated_at || post.published_at,
        "0.8"
      )
    );
  } catch {
    postUrls = [];
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...postUrls].join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=86400");
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function SitemapXml() {
  return null;
}
