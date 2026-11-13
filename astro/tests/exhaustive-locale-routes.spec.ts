import { test, expect } from "@playwright/test";
import { projects } from "../src/data/projects";
import { writing } from "../src/data/writing";

const pairedRoutes = [
  ["/", "/ar/"],
  ["/projects/", "/ar/projects/"],
  ["/about/", "/ar/about/"],
  ["/approach/", "/ar/approach/"],
  ["/contact/", "/ar/contact/"],
  ["/writing/", "/ar/writing/"],
  ...projects.map(project => [`/projects/${project.slug}/`, `/ar/projects/${project.slug}/`]),
  ...writing.map(item => [`/writing/${item.slug}/`, `/ar/writing/${item.slug}/`]),
] as const;

test("every generated English and Arabic route renders, switches locale, and preserves identity", async ({ page }) => {
  test.setTimeout(180_000);
  const allRoutes = new Set(pairedRoutes.flat());

  for (const [english, arabic] of pairedRoutes) {
    for (const [route, locale, direction] of [[english, "en", "ltr"], [arabic, "ar", "rtl"]] as const) {
      await page.goto(route);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveAttribute("dir", direction);
      await expect(page.locator("main h1").first()).toBeVisible();
      await expect(page.locator("main")).not.toBeEmpty();
      await expect(page).toHaveTitle(/.+/);
      await expect(page.locator("meta[name=description]")).toHaveAttribute("content", /.+/);
      await expect(page.locator("meta[property="og:title"]")).toHaveAttribute("content", /.+/);
      await expect(page.locator("meta[property="og:description"]")).toHaveAttribute("content", /.+/);
      await expect(page.locator("meta[property="og:locale"]")).toHaveAttribute("content", locale === "ar" ? "ar_AR" : "en_US");
      await expect(page.locator("meta[name="twitter:card"]")).toHaveAttribute("content", "summary");

      const pageText = (await page.locator("main").innerText()).trim();
      expect(pageText.length, route).toBeGreaterThan(80);
      expect(pageText, route).not.toMatch(/\{\{[^}]+\}\}|\[missing:[^\]]+\]|TODO_TRANSLATE|undefined|nullnull/i);

      const internalLinks = await page.locator('a[href^="/"]').evaluateAll(anchors =>
        (anchors as HTMLAnchorElement[]).map(anchor => new URL(anchor.href).pathname)
      );
      for (const href of internalLinks) {
        if (href.startsWith("/assets/") || href.startsWith("/favicon")) continue;
        expect(allRoutes.has(href), `Unexpected internal route ${href} from ${route}`).toBeTruthy();
      }

      const dimensions = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth
      }));
      expect(dimensions.scroll, route).toBeLessThanOrEqual(dimensions.client + 1);

      const switchLink = page.locator("a.language-switch");
      await expect(switchLink).toHaveAttribute("href", locale === "en" ? arabic : english);
      await switchLink.click();
      await expect(page).toHaveURL(new RegExp((locale === "en" ? arabic : english).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$"));
      await expect(page.locator("html")).toHaveAttribute("lang", locale === "en" ? "ar" : "en");
      await expect(page.locator("main h1").first()).toBeVisible();
    }
  }

  await page.goto("/ar/projects/");
  await expect(page.locator(".project-card")).toHaveCount(13);
  await page.goto("/ar/writing/");
  await expect(page.locator(".writing-entry")).toHaveCount(17);
});
