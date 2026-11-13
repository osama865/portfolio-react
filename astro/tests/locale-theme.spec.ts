import { test, expect } from "@playwright/test";

const englishRoutes = ["/", "/projects/", "/projects/injaz/", "/projects/life-advise/", "/about/", "/approach/", "/contact/", "/writing/"];
const arabicRoutes = ["/ar/", "/ar/projects/", "/ar/projects/injaz/", "/ar/projects/life-advise/", "/ar/about/", "/ar/approach/", "/ar/contact/", "/ar/writing/"];

test("public English routes declare English LTR document semantics", async ({ page }) => {
  for (const route of englishRoutes) {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  }
});

test("Arabic editorial routes declare Arabic RTL document semantics", async ({ page }) => {
  for (const route of arabicRoutes) {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("nav")).toContainText("الأعمال");
    await expect(page.getByRole("link", { name: "English" })).toBeVisible();
  }
});

test("language switch preserves homepage, project and article identity", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "العربية" }).click();
  await expect(page).toHaveURL(/\/ar\/$/);
  await page.goto("/projects/injaz/");
  await page.getByRole("link", { name: "العربية" }).click();
  await expect(page).toHaveURL(/\/ar\/projects\/injaz\/$/);
  await expect(page).toHaveTitle(/إنجاز/);
  await page.getByRole("link", { name: "English" }).click();
  await expect(page).toHaveURL(/\/projects\/injaz\/$/);
});

test("Arabic case studies retain their project identity and fit mobile viewport", async ({ page }) => {
  for (const route of ["/ar/projects/injaz/", "/ar/projects/life-advise/"]) {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".diagram")).toBeVisible();
    const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client + 1);
  }
});

test("Arabic archive retains all project records and filter interaction", async ({ page }) => {
  await page.goto("/ar/projects/");
  await expect(page.locator(".project-card")).toHaveCount(13);
  const all = await page.locator(".project-card:visible").count();
  await page.getByRole("button", { name: "الكل" }).click();
  await expect(page.locator(".project-card:visible")).toHaveCount(all);
  for (const card of await page.locator(".project-card").all()) {
    await expect(card.locator("a").first()).toHaveAttribute("href", /\/ar\/projects\//);
  }
});

test("theme control exposes the action icon and synchronized state in both locales", async ({ page }) => {
  for (const route of ["/", "/ar/"]) {
    await page.goto(route);
    await page.evaluate(() => localStorage.removeItem("portfolio-theme"));
    await page.reload();
    const button = page.locator("[data-theme-toggle]");
    await expect(button).toHaveAttribute("aria-pressed", "false");
    await expect(button).toHaveAttribute("aria-label", route.startsWith("/ar") ? "التبديل إلى المظهر الداكن" : "Switch to dark theme");
    await expect(button.locator(".theme-icon-moon")).toBeVisible();
    await button.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(button).toHaveAttribute("aria-label", route.startsWith("/ar") ? "التبديل إلى المظهر الفاتح" : "Switch to light theme");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  }
});

test("only the theme control changes theme and unsupported transitions fall back immediately", async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(document, "startViewTransition", { configurable: true, value: undefined }); });
  await page.goto("/");
  await page.locator("body").click({ position: { x: 4, y: 4 } });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.locator("[data-theme-toggle]").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("reduced motion preference does not invoke the elaborate transition", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator("[data-theme-toggle]").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const animation = await page.locator("html").evaluate(el => getComputedStyle(el, "::view-transition-new(root)").animationName);
  expect(animation).toBe("none");
});

test("Arabic case-study pages have no broken local images or horizontal overflow", async ({ page }) => {
  for (const route of ["/ar/", "/ar/projects/", "/ar/projects/injaz/", "/ar/projects/life-advise/"]) {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(route);
    const broken = await page.locator("img").evaluateAll(async images => {
      const elements = images as HTMLImageElement[];
      elements.forEach(img => { img.loading = "eager"; });
      await Promise.all(elements.map(img => img.decode().catch(() => undefined)));
      return elements.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
    });
    expect(broken, route).toEqual([]);
    const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    expect(dimensions.scroll, route).toBeLessThanOrEqual(dimensions.client + 1);
    expect(errors, route).toEqual([]);
  }
});

test("language switch and theme control are operable by keyboard with visible focus", async ({ page }) => {
  await page.goto("/");
  const language = page.locator("a.language-switch");
  for (let index = 0; index < 16 && !(await language.evaluate(element => element === document.activeElement)); index++) {
    await page.keyboard.press("Tab");
  }
  await expect(language).toBeFocused();
  expect(await language.evaluate(element => getComputedStyle(element).outlineStyle)).not.toBe("none");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(new RegExp("/ar/$"));

  const theme = page.locator("[data-theme-toggle]");
  for (let index = 0; index < 16 && !(await theme.evaluate(element => element === document.activeElement)); index++) {
    await page.keyboard.press("Tab");
  }
  await expect(theme).toBeFocused();
  expect(await theme.evaluate(element => getComputedStyle(element).outlineStyle)).not.toBe("none");
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
