import { test, expect } from "@playwright/test";

const previewUrl = process.env.DEPLOYED_PREVIEW_URL;
const expectedCommit = process.env.EXPECTED_DEPLOYED_COMMIT;

test.use({ trace: "on" });

test.skip(!previewUrl, "Runs only when the isolated Cloudflare preview URL is supplied.");

test("deployed Astro preview serves the exact verified commit", async ({ page }) => {
  await page.goto(previewUrl!);
  await expect(page).toHaveTitle(/A developer, a dreamer, and ever so often, a human/);
  if (expectedCommit) {
    await expect(page.locator("meta[name='portfolio-build-commit']")).toHaveAttribute("content", expectedCommit);
    await expect(page.locator("html")).toHaveAttribute("data-build-commit", expectedCommit);
  }
});

test("deployed Astro preview changes theme only through its explicit switch", async ({ page }, info) => {
  const origin = previewUrl!;
  const route = (path: string) => new URL(path, origin).toString();
  await page.goto(origin);
  await expect(page).toHaveTitle(/A developer, a dreamer, and ever so often, a human/);
  const initial = await page.locator("html").getAttribute("data-theme");
  await expect(page.locator("button[data-theme-toggle]")).toHaveCount(1);
  await expect(page.locator("button[data-theme]")).toHaveCount(0);

  await page.locator(".hero-quote").click();
  await page.locator(".hero-intro p").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", initial!);
  if (info.project.name.startsWith("mobile")) {
    await page.getByRole("button", { name: "Toggle navigation" }).click();
  }
  await page.locator('nav a[href="/about/"]').click();
  await expect(page).toHaveURL(route("/about/"));
  await expect(page.locator("html")).toHaveAttribute("data-theme", initial!);

  await page.goto(route("/projects/"));
  await page.getByRole("button", { name: "Website", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", initial!);
  await page.getByRole("button", { name: "All", exact: true }).click();
  await page.locator(".project-card .project-cover").first().click();
  await expect(page).toHaveURL(/\/projects\/[^/]+\/$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", initial!);

  await page.goto(route("/writing/"));
  await page.locator(".writing-entry h2 a").first().click();
  await expect(page).toHaveURL(/\/writing\/[^/]+\/$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", initial!);

  await page.goto(origin);
  const control = page.locator("button[data-theme-toggle]");
  await page.evaluate(() => {
    const root = document.documentElement;
    let changes = 0;
    const observer = new MutationObserver(() => { changes += 1; });
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    (window as typeof window & { __themeChanges?: () => number }).__themeChanges = () => changes;
  });
  const beforeToggle = await page.locator("html").getAttribute("data-theme");
  await control.click();
  const afterToggle = beforeToggle === "dark" ? "light" : "dark";
  await expect(page.locator("html")).toHaveAttribute("data-theme", afterToggle);
  await expect(control).toHaveAttribute("aria-pressed", String(afterToggle === "dark"));
  await expect.poll(() => page.evaluate(() => (window as typeof window & { __themeChanges?: () => number }).__themeChanges?.() ?? 0)).toBe(1);
  expect(await page.evaluate(() => localStorage.getItem("portfolio-theme"))).toBe(afterToggle);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", afterToggle);
});

test("capture deployed preview visual evidence", async ({ page }, info) => {
  const origin = previewUrl!;
  const device = info.project.name.startsWith("mobile") ? "mobile" : "desktop";
  const capture = async (name: string) => {
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `visual-evidence/deployed-${device}-${name}.png`, fullPage: true });
  };
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(origin);
  await capture("home-light");
  await page.getByRole("button", { name: "Toggle light and dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await capture("home-dark");

  const pages = [
    { path: "/projects/", name: "work-archive" },
    { path: "/writing/", name: "writing-archive" },
    { path: "/writing/choose-node-framework/", name: "writing-entry" },
    { path: "/about/", name: "about" },
    { path: "/approach/", name: "engineering-approach" },
    { path: "/projects/injaz/", name: "project-case-study" }
  ];
  for (const item of pages) {
    await page.goto(new URL(item.path, origin).toString());
    await capture(item.name);
  }
  if (device === "mobile") {
    await page.goto(origin);
    const menu = page.getByRole("button", { name: "Toggle navigation" });
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await capture("mobile-navigation-open");
  }
});
