import { test, expect } from "@playwright/test";

test.describe("Dashboard search", () => {
  test("allows the user to enter a search query", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.getByRole("textbox", {
      name: /search/i,
    });

    await expect(searchInput).toBeVisible();

    await searchInput.fill("technology");

    await expect(searchInput).toHaveValue("technology");
  });
});
