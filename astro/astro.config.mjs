import { defineConfig } from "astro/config";
import { writeFile } from "node:fs/promises";

export default defineConfig({
  output: "static",
  trailingSlash: "always",
  site: process.env.PUBLIC_SITE_URL || undefined,
  integrations: [{
    name: "indexing-safety-headers",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        // Indexing is opt-in. Preview and local builds stay noindex unless the
        // production deployment explicitly supplies both public-site settings.
        if (process.env.PUBLIC_SITE_INDEXABLE !== "true" || !process.env.PUBLIC_SITE_URL) {
          await writeFile(new URL("_headers", dir), "/*\n  X-Robots-Tag: noindex, nofollow\n");
        }
      }
    }
  }]
});
