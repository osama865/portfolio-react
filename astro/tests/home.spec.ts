import { test, expect } from "@playwright/test";
test("homepage renders the hero and selected projects", async ({ page }, info) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("complex things");
  await expect(page.getByRole("link", { name: /explore my work/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /projects with a purpose/i })).toBeVisible();
  await page.screenshot({
    path: info.project.name.startsWith("mobile") ? "test-results/home-mobile.png" : "test-results/home-desktop.png",
    fullPage: true
  });
});
test("theme toggle changes the document theme", async ({ page }) => {
  await page.goto("/");
  const before = await page.locator("html").getAttribute("data-theme");
  await page.getByRole("button", { name: "Toggle light and dark theme" }).click();
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", before ?? "light");
});
test("mobile navigation opens and reaches projects", async ({ page }, info) => {
  test.skip(!info.project.name.startsWith("mobile"), "navigation drawer is specific to the mobile layout");
  await page.goto("/");
  await page.getByRole("button", { name: "Toggle navigation" }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await page.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
});
