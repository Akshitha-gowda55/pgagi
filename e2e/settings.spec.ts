import { test, expect } from "@playwright/test";

test.describe("Settings", () => {
  test("allows changing interests", async ({ page }) => {
    await page.goto("/settings");

    const technologyButton = page.getByRole("button", {
      name: /technology/i,
    });

    await expect(technologyButton).toBeVisible();

    await technologyButton.click();

    await technologyButton.click();

    await expect(
      page.getByRole("heading", {
        name: /customize your feed/i,
      }),
    ).toBeVisible();
  });

  test("has a reset preferences action", async ({ page }) => {
    await page.goto("/settings");

    await expect(
      page.getByRole("button", {
        name: /reset preferences/i,
      }),
    ).toBeVisible();
  });
});
