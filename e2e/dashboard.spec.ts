import { test, expect } from "@playwright/test";

test.describe("Personalized Content Dashboard", () => {
  test("loads the dashboard", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: /everything worth knowing, in one place/i,
      }),
    ).toBeVisible();
  });

  test("shows the main navigation", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("link", {
        name: /dashboard/i,
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("link", {
        name: "Trending",
	exact:true,
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("link", {
        name: /favorites/i,
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("link", {
        name: /settings/i,
      }),
    ).toBeVisible();
  });

  test("navigates to settings", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", {
      name: /settings/i,
    }).click();

    await expect(page).toHaveURL(/\/settings/);

    await expect(
      page.getByRole("heading", {
        name: /customize your feed/i,
      }),
    ).toBeVisible();
  });

  test("navigates to trending", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", {
      name: "Trending",
	exact:true,
    }).click();

    await expect(page).toHaveURL(/\/trending/);

    await expect(
      page.getByRole("heading", {
        name: /trending/i,
      }),
    ).toBeVisible();
  });

  test("navigates to favorites", async ({ page }) => {
    await page.goto("/");

    const favoritesLink = page.locator(
      'a[href="/favourites"]'
    ).first();

    await expect(favoritesLink).toBeVisible();

    await favoritesLink.click();

    await expect(page).toHaveURL(/\/favourites/);

    await expect(
      page.getByRole("heading", {
        name: /saved favorites/i,
      }),
    ).toBeVisible();
  });
});
