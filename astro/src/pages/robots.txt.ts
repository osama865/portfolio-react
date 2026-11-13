export const prerender = true;

export function GET() {
  const siteUrl = process.env.PUBLIC_SITE_URL?.replace(/\/+$/, "");
  const indexable = process.env.PUBLIC_SITE_INDEXABLE === "true" && Boolean(siteUrl);
  const body = indexable
    ? `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`
    : "User-agent: *\nDisallow: /\n";

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
