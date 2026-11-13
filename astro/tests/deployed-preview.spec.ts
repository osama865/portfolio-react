import { test, expect } from "@playwright/test";

const previewUrl = process.env.DEPLOYED_PREVIEW_URL;

test.skip(!previewUrl, "Runs only when the isolated Cloudflare preview URL is supplied.");

test("deployed Astro preview changes theme only through its explicit switch", async ({ page }) => {
  const origin = previewUrl!;
  const route = (path: string) => new URL(path, origin).toString();

  await page.goto(origin);
  await expect(page).toHaveTitle(/A developer, a dreamer, and ever so often, a human/);
  const initial = await page.locator("html").getAttribute("data-theme");

  // Ordinary content clicks must not affect theme state.
  await page.locator(".hero-quote").click();
  await page.locator(".hero-intro p").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", initial!);

  // Project-card navigation and filter buttons are not theme controls.
  await page.goto(route("/projects/"));
  await page.getByRole("button", { name: "Website", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", initial!);
  await page.locator(".project-card .project-cover").first().click();
  await expect(page).toHaveURL(/\/projects\/[^/]+\/$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", initial!);

  // Opening an article is also theme-neutral.
  await page.goto(route("/writing/"));
  await page.locator(".writing-entry h2 a").first().click();
  await expect(page).toHaveURL(/\/writing\/[^/]+\/$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", initial!);

  // The explicit theme control changes the attribute once and persists it.
  await page.goto(origin);
  const control = page.getByRole("button", { name: "Toggle light and dark theme" });
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
  await expect.poll(() => page.evaluate(() => (window as typeof window & { __themeChanges?: () => number }).__themeChanges?.() ?? 0)).toBe(1);
  expect(await page.evaluate(() => localStorage.getItem("portfolio-theme"))).toBe(afterToggle);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", afterToggle);
});
