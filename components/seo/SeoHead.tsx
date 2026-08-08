import Head from "next/head";
import {
  absoluteUrl,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
} from "@/lib/seo";

type SeoHeadProps = {
  title: string;
  description?: string;
  path?: string;
  image?: string | null;
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string | null;
};

export default function SeoHead({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image,
  type = "website",
  noIndex = false,
  publishedTime,
}: SeoHeadProps) {
  const url = absoluteUrl(path);
  const ogImage = image
    ? absoluteUrl(image)
    : DEFAULT_OG_IMAGE;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="es_CO" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {type === "article" && publishedTime ? (
        <meta property="article:published_time" content={publishedTime} />
      ) : null}
    </Head>
  );
}
