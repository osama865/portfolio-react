import { test, expect } from "@playwright/test";

const routes = [
  { path: "/", title: "Osama Ibrahim — A developer, a dreamer, and ever so often, a human." },
  { path: "/writing/", title: "Writing — Osama Ibrahim" },
  { path: "/writing/choose-node-framework/", title: "How To Choose The Right Framework For Your Next Node.js App. — Writing by Osama Ibrahim" },
  { path: "/writing/node-caching-redis/", title: "Advanced Node.js Topics: Caching. — Writing by Osama Ibrahim" },
  { path: "/writing/docker-brief-introduction/", title: "Docker: Brief Introduction. — Writing by Osama Ibrahim" },
  { path: "/writing/life-advise-side-project/", title: "Side Project: Life-Advise Web App. — Writing by Osama Ibrahim" },
  { path: "/writing/javascript-arrays-iterators/", title: "Javascript 1O1 series: Array’s Methods And Iterators Part(1), Methods. — Writing by Osama Ibrahim" },
  { path: "/writing/javascript-scopes-execution-context/", title: "Javascript 1O1 series: Scopes and Execution Contexts. — Writing by Osama Ibrahim" },
  { path: "/writing/javascript-functions/", title: "Javascript 1O1 series: Functions. — Writing by Osama Ibrahim" },
  { path: "/writing/javascript-variables-constants/", title: "Javascript 1O1 series: Variables vs Constants, and Let keyword. — Writing by Osama Ibrahim" },
  { path: "/writing/javascript-loops/", title: "Javascript 1O1 series: Writing loops with For, While and Do while. — Writing by Osama Ibrahim" },
  { path: "/writing/free-javascript-resources/", title: "Great collection of Free resources to learn javascript and web development. — Writing by Osama Ibrahim" },
  { path: "/writing/conditional-loops-practice/", title: "Conditional statements and loops Practices in Javascript. — Writing by Osama Ibrahim" },
  { path: "/writing/javascript-console-time/", title: "Javascript console.time(), What is it? — Writing by Osama Ibrahim" },
  { path: "/writing/javascript-conditionals/", title: "Javascript 1O1 series: Conditional statements. if, if else and switch. — Writing by Osama Ibrahim" },
  { path: "/writing/javascript-syntax-variables-datatypes/", title: "Javascript 1O1 series: Learn syntax, variables and datatypes. — Writing by Osama Ibrahim" },
  { path: "/writing/javascript-introduction/", title: "Javascript 1O1 series: introduction. — Writing by Osama Ibrahim" },
  { path: "/writing/document-designmode/", title: "Document.designMode, What is it? — Writing by Osama Ibrahim" },
  { path: "/writing/what-to-write-about/", title: "what to write about — Writing by Osama Ibrahim" },
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
