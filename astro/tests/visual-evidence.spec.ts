import { test, expect } from "@playwright/test";

test("capture Phase 1.5 visual evidence across themes and destinations", async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const device = info.project.name.startsWith("mobile") ? "mobile" : "desktop";
  const capture = async (name: string) => {
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `test-results/evidence/local-${device}-${name}.png`, fullPage: true });
  };

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("A developer,");
  await capture("home-light");
  await page.getByRole("button", { name: "Toggle light and dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await capture("home-dark");

  await page.goto("/projects/");
  await expect(page.locator(".project-card")).toHaveCount(13);
  await capture("work-archive");

  await page.goto("/writing/");
  await expect(page.locator(".writing-entry")).toHaveCount(17);
  await capture("writing-archive");

  await page.goto("/writing/choose-node-framework/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("How To Choose");
  await capture("writing-entry");

  await page.goto("/about/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await capture("about");

  await page.goto("/approach/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await capture("engineering-approach");

  await page.goto("/projects/injaz/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("INJAZ");
  await capture("project-case-study");

  if (device === "mobile") {
    await page.goto("/");
    const menu = page.getByRole("button", { name: "Toggle navigation" });
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Work" })).toBeVisible();
    await capture("mobile-navigation-open");
  }
});

test("dark theme keeps text and surfaces distinct", async ({ page }) => {
  await page.goto("/");
  const light = await page.locator("body").evaluate((element) => ({
    background: getComputedStyle(element).backgroundColor,
    color: getComputedStyle(element).color
  }));
  await page.getByRole("button", { name: "Toggle light and dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect.poll(() => page.locator("body").evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(light.background);
  const dark = await page.locator("body").evaluate((element) => ({
    background: getComputedStyle(element).backgroundColor,
    color: getComputedStyle(element).color
  }));
  expect(dark.background).not.toBe(light.background);
  expect(dark.color).not.toBe(light.color);
  expect(dark.background).not.toBe(dark.color);
});

test("reduced motion leaves revealed content visible without transforms", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/writing/");
  const entry = page.locator(".writing-entry").first();
  await expect(entry).toBeVisible();
  await expect(entry).toHaveCSS("opacity", "1");
  await expect(entry).toHaveCSS("transform", "none");
});
