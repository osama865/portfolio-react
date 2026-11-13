import { test, expect } from "@playwright/test";

test("writing archive presents verified entries and category filters", async ({ page }) => {
  await page.goto("/writing/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Some ideas deserve");
  await expect(page.locator(".writing-entry")).toHaveCount(17);
  await expect(page.getByRole("link", { name: /How To Choose The Right Framework/ })).toBeVisible();
  await page.getByRole("button", { name: "Personal note" }).click();
  await expect(page.locator(".writing-entry:visible")).toHaveCount(1);
  await expect(page.locator(".writing-entry:visible h2")).toContainText("what to write about");
  await page.getByRole("button", { name: "All writing" }).click();
  await expect(page.locator(".writing-entry:visible")).toHaveCount(17);
});

test("writing detail points to the original publication and marks cross-posts", async ({ page }) => {
  await page.goto("/writing/choose-node-framework/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("How To Choose The Right Framework");
  await expect(page.getByRole("link", { name: "Read the original article" })).toHaveAttribute("href", /medium.com/);
  await expect(page.getByRole("link", { name: /Also published on DEV/ })).toHaveAttribute("href", /dev.to/);
});

test("writing page is readable with reduced motion enabled", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/writing/");
  await expect(page.locator(".writing-entry").first()).toBeVisible();
  await expect(page.locator(".writing-entry").last()).toBeVisible();
});
