import { test, expect } from "@playwright/test";

const routes = [
  { path: "/", title: "Osama Ibrahim — Building useful digital products" },
  { path: "/about/", title: "About — Osama Ibrahim" },
  { path: "/approach/", title: "Engineering approach — Osama Ibrahim" },
  { path: "/contact/", title: "Contact — Osama Ibrahim" },
  { path: "/projects/", title: "Projects — Osama Ibrahim" },
  { path: "/projects/injaz/", title: "INJAZ | إنجاز — Osama Ibrahim" },
  { path: "/projects/life-advise/", title: "Life-Advise — Osama Ibrahim" },
  { path: "/projects/netflix-clone/", title: "Netflix interface — Osama Ibrahim" },
  { path: "/projects/restaurant-website/", title: "Restaurant website — Osama Ibrahim" },
  { path: "/projects/amazon-clone/", title: "Amazon storefront concept — Osama Ibrahim" },
  { path: "/projects/portfolio-legacy/", title: "Personal portfolio · legacy — Osama Ibrahim" },
  { path: "/projects/hotel-room-rental/", title: "Hotel room rental — Osama Ibrahim" },
  { path: "/projects/chat-room/", title: "Chat room — Osama Ibrahim" },
  { path: "/projects/galarey/", title: "Galarey — Osama Ibrahim" },
  { path: "/projects/weather-pwa/", title: "Weather PWA — Osama Ibrahim" },
  { path: "/projects/food-recipes-pwa/", title: "Food recipes PWA — Osama Ibrahim" },
  { path: "/projects/gym-landing-page/", title: "Gym landing page — Osama Ibrahim" },
  { path: "/projects/aos-testing/", title: "AOS animation tests — Osama Ibrahim" }
];

for (const route of routes) {
  test(`route ${route.path} renders correctly`, async ({ page }) => {
    const response = await page.goto(route.path);
    expect(response?.status(), `${route.path} should return HTTP 200`).toBe(200);
    await expect(page).toHaveTitle(route.title);
    await expect(page.locator("main h1").first()).toBeVisible();
    await expect(page.locator("nav[data-nav]")).toBeAttached();
    const brokenImages = await page.locator("img").evaluateAll(async (images) => {
      const results = await Promise.all(images.map(async (image) => {
        const img = image as HTMLImageElement;
        img.loading = "eager";
        try {
          await img.decode();
          return img.naturalWidth === 0 ? img.getAttribute("src") : null;
        } catch {
          return img.getAttribute("src");
        }
      }));
      return results.filter((src): src is string => Boolean(src));
    });
    expect(brokenImages, `Broken images on ${route.path}`).toEqual([]);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow, `Horizontal overflow on ${route.path}`).toBe(false);
  });
}
