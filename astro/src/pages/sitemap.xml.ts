import { projects } from "../data/projects";
import { writing } from "../data/writing";

export const prerender = true;

const staticRoutes = ["/", "/projects/", "/about/", "/approach/", "/contact/", "/writing/"];
const routes = [
  ...staticRoutes,
  ...projects.map(({ slug }) => `/projects/${slug}/`),
  ...writing.map(({ slug }) => `/writing/${slug}/`),
  ...staticRoutes.map((path) => path === "/" ? "/ar/" : `/ar${path}`),
  ...projects.map(({ slug }) => `/ar/projects/${slug}/`),
  ...writing.map(({ slug }) => `/ar/writing/${slug}/`)
];

const xmlEscape = (value: string) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&apos;");

export function GET() {
  const siteUrl = process.env.PUBLIC_SITE_URL?.replace(/\/+$/, "");
  const indexable = process.env.PUBLIC_SITE_INDEXABLE === "true" && Boolean(siteUrl);
  const urls = indexable
    ? [...new Set(routes)].map((path) => `  <url><loc>${xmlEscape(new URL(path, siteUrl).href)}</loc></url>`).join("\n")
    : "";

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } }
  );
}
