import { test, expect } from "@playwright/test";

async function currentTheme(page: import("@playwright/test").Page) {
  return page.locator("html").getAttribute("data-theme");
}

test("ordinary page content clicks never change the theme", async ({ page }) => {
  await page.goto("/");
  const before = await currentTheme(page);
  await page.locator(".hero-quote").click();
  await page.locator(".hero-intro p").click();
  await page.locator(".intro-band").click();
  expect(await currentTheme(page)).toBe(before);
});

test("project card navigation preserves the selected theme", async ({ page }) => {
  await page.goto("/projects/");
  await page.locator(".project-card .project-cover").first().click();
  await expect(page).toHaveURL(new RegExp("/projects/[^/]+/$"));
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("opening a writing article does not change the theme", async ({ page }) => {
  await page.goto("/writing/");
  await page.locator(".writing-entry h2 a").first().click();
  await expect(page).toHaveURL(new RegExp("/writing/[^/]+/$"));
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("navigation and ordinary buttons do not change the theme", async ({ page }, info) => {
  await page.goto("/");
  const before = await currentTheme(page);
  if (info.project.name.startsWith("mobile")) {
    await page.getByRole("button", { name: "Toggle navigation" }).click();
  }
  await page.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL("/about/");
  expect(await currentTheme(page)).toBe(before);

  await page.goto("/projects/");
  await page.getByRole("button", { name: "Website", exact: true }).click();
  expect(await currentTheme(page)).toBe(before);
});

test("the explicit theme switch changes the theme exactly once per activation", async ({ page }) => {
  await page.goto("/");
  const control = page.getByRole("button", { name: "Toggle light and dark theme" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.evaluate(() => {
    const root = document.documentElement;
    let changes = 0;
    const observer = new MutationObserver(() => { changes += 1; });
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    (window as typeof window & { __themeChanges?: () => number }).__themeChanges = () => changes;
  });
  await control.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect.poll(() => page.evaluate(() => (window as typeof window & { __themeChanges?: () => number }).__themeChanges?.() ?? 0)).toBe(1);
  expect(await page.evaluate(() => localStorage.getItem("portfolio-theme"))).toBe("dark");
  await control.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(await page.evaluate(() => localStorage.getItem("portfolio-theme"))).toBe("light");
});

test("the selected theme persists across internal navigation and reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Toggle light and dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("link", { name: "Writing", exact: true }).click();
  await expect(page).toHaveURL("/writing/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Toggle light and dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("both themes retain visible content and distinct foreground/background colors", async ({ page }) => {
  await page.goto("/");
  for (const selected of ["light", "dark"] as const) {
    if (await currentTheme(page) !== selected) {
      await page.getByRole("button", { name: "Toggle light and dark theme" }).click();
    }
    await expect(page.locator("html")).toHaveAttribute("data-theme", selected);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const colors = await page.locator("body").evaluate((element) => {
      const style = getComputedStyle(element);
      return { background: style.backgroundColor, color: style.color };
    });
    expect(colors.background).not.toBe(colors.color);
  }
});
