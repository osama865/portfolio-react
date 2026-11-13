import { test, expect } from "@playwright/test";

const previewUrl = process.env.DEPLOYED_PREVIEW_URL;
const expectedCommit = process.env.EXPECTED_DEPLOYED_COMMIT;

test.use({ trace: "on" });
test.skip(!previewUrl, "Runs only when the isolated Cloudflare preview URL is supplied.");

const route = (path: string) => new URL(path, previewUrl!).toString();

test("deployed Astro preview serves the exact verified commit", async ({ page }) => {
  await page.goto(previewUrl!);
  await expect(page).toHaveTitle(/A developer, a dreamer, and ever so often, a human/);
  if (expectedCommit) {
    await expect(page.locator("meta[name='portfolio-build-commit']")).toHaveAttribute("content", expectedCommit);
    await expect(page.locator("html")).toHaveAttribute("data-build-commit", expectedCommit);
  }
});

test("deployed preview preserves theme and locale navigation on desktop and mobile", async ({ page }, info) => {
  await page.goto(previewUrl!);
  const initial = await page.locator("html").getAttribute("data-theme");
  await expect(page.locator("button[data-theme-toggle]")).toHaveCount(1);
  await expect(page.locator("button[data-theme]")).toHaveCount(0);

  await page.locator(".hero-quote").click();
  await page.locator(".hero-intro p").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", initial!);

  if (info.project.name.startsWith("mobile")) {
    const menu = page.getByRole("button", { name: "Toggle navigation" });
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page.locator("a.language-switch").click();
    await expect(page).toHaveURL(route("/ar/"));
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await page.locator("a.language-switch").click();
    await expect(page).toHaveURL(route("/"));
  }

  await page.locator("[data-theme-toggle]").click();
  const selected = initial === "dark" ? "light" : "dark";
  await expect(page.locator("html")).toHaveAttribute("data-theme", selected);
  await expect(page.locator("[data-theme-toggle]")).toHaveAttribute("aria-pressed", String(selected === "dark"));
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", selected);
});

test("capture English and Arabic visual matrix on deployed preview", async ({ page }, info) => {
  const device = info.project.name.startsWith("mobile") ? "mobile" : "desktop";
  const capture = async (name: string) => {
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `visual-evidence/deployed-${device}-${name}.png`, fullPage: true });
  };
  await page.emulateMedia({ reducedMotion: "reduce" });

  await page.goto(previewUrl!);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await capture("en-home-light");
  await page.locator("[data-theme-toggle]").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await capture("en-home-dark");

  await page.locator("a.language-switch").click();
  await expect(page).toHaveURL(route("/ar/"));
  await capture("ar-home-dark");
  await page.locator("[data-theme-toggle]").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await capture("ar-home-light");

  const pages = [
    { path: "/projects/", name: "en-project-archive" },
    { path: "/ar/projects/", name: "ar-project-archive" },
    { path: "/projects/injaz/", name: "en-injaz-case-study" },
    { path: "/ar/projects/injaz/", name: "ar-injaz-case-study" },
    { path: "/projects/life-advise/", name: "en-life-advise-case-study" },
    { path: "/ar/projects/life-advise/", name: "ar-life-advise-case-study" },
    { path: "/writing/", name: "en-writing-archive" },
    { path: "/ar/writing/", name: "ar-writing-archive" },
    { path: "/writing/choose-node-framework/", name: "en-writing-entry" },
    { path: "/ar/writing/choose-node-framework/", name: "ar-writing-entry" }
  ];
  for (const item of pages) {
    await page.goto(route(item.path));
    await capture(item.name);
  }

  if (device === "mobile") {
    await page.goto(previewUrl!);
    const menu = page.getByRole("button", { name: "Toggle navigation" });
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await capture("mobile-navigation-open");
  }
});
