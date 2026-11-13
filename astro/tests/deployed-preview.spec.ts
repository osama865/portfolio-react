import { test, expect } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

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

test("axe accessibility smoke scan covers representative English and Arabic routes in both themes", async ({ page }, info) => {
  const device = info.project.name.startsWith("mobile") ? "mobile" : "desktop";
  const routes = [
    ["/", "en-home"],
    ["/ar/", "ar-home"],
    ["/projects/", "en-project-archive"],
    ["/ar/projects/", "ar-project-archive"],
    ["/projects/injaz/", "en-injaz"],
    ["/ar/projects/injaz/", "ar-injaz"],
    ["/projects/life-advise/", "en-life-advise"],
    ["/ar/projects/life-advise/", "ar-life-advise"],
    ["/writing/", "en-writing"],
    ["/ar/writing/", "ar-writing"],
    ["/writing/choose-node-framework/", "en-writing-entry"],
    ["/ar/writing/choose-node-framework/", "ar-writing-entry"]
  ] as const;
  const reports: Array<{ route: string; theme: string; violations: unknown[]; incomplete: unknown[] }> = [];
  // Stabilise computed colors before axe reads them; theme transitions remain covered by the interaction tests.
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const [path, name] of routes) {
    await page.goto(route(path));
    await page.addScriptTag({ url: "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.3/axe.min.js" });
    for (const theme of ["light", "dark"] as const) {
      const current = await page.locator("html").getAttribute("data-theme");
      if (current !== theme) await page.locator("[data-theme-toggle]").click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      const result = await page.evaluate(async () => {
        const axe = (window as any).axe;
        return axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] }
        });
      });
      const violations = result.violations.map((violation: any) => ({
        id: violation.id,
        impact: violation.impact ?? null,
        description: violation.description,
        help: violation.help,
        helpUrl: violation.helpUrl,
        nodes: violation.nodes.map((node: any) => ({
          target: node.target,
          html: node.html,
          failureSummary: node.failureSummary,
          any: node.any.map((check: any) => ({
            id: check.id,
            message: check.message,
            data: check.data,
            relatedNodes: check.relatedNodes
          })),
          all: node.all.map((check: any) => ({
            id: check.id,
            message: check.message,
            data: check.data,
            relatedNodes: check.relatedNodes
          })),
          none: node.none.map((check: any) => ({
            id: check.id,
            message: check.message,
            data: check.data,
            relatedNodes: check.relatedNodes
          }))
        }))
      }));
      reports.push({ route: path, theme, violations, incomplete: result.incomplete });
      console.log(`AXE ${device} ${theme} ${name}: ${result.violations.length} violations`);
    }
  }

  mkdirSync("test-results", { recursive: true });
  writeFileSync(`test-results/axe-${device}-report.json`, JSON.stringify(reports, null, 2));
  const serious = reports.flatMap(report => report.violations.flatMap((violation: any) =>
    (violation.impact === "serious" || violation.impact === "critical")
      ? [{ route: report.route, theme: report.theme, id: violation.id, impact: violation.impact, nodes: violation.nodes }]
      : []));
  expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
});
