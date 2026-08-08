export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://camilomeza.com";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/seo/og_image.png`;

export const SITE_NAME = "Camilo Meza Asesoría Financiera";

export const DEFAULT_DESCRIPTION =
  "Asesoría financiera personal y empresarial en Bogotá: educación, mentalidad financiera, presupuesto, control de gastos y portafolio de inversión.";

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
