import {
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { FavoriteButton } from "./FavoriteButton";
import { renderWithRedux } from "@/test/test-utils";
import { store } from "@/store/store";
import { clearFavorites } from "@/features/favorites/favoritesSlice";

import type { NewsContentItem } from "@/types/content";

const mockNewsItem: NewsContentItem = {
  id: "test-news-1",
  type: "news",
  title: "Test Technology Article",
  description: "Test article description",
  imageUrl: "https://example.com/test-image.jpg",
  category: "technology",
  publishedAt: "2026-09-23T10:00:00.000Z",
  isFavorite: false,
  source: "Test News",
  author: "Test Author",
  url: "https://example.com/article",
};

function renderFavoriteButton() {
  return renderWithRedux(
    <FavoriteButton
      contentId={mockNewsItem.id}
      contentType={mockNewsItem.type}
      item={mockNewsItem}
    />,
  );
}

describe("FavoriteButton", () => {
  beforeEach(() => {
    store.dispatch(clearFavorites());
  });

  it("renders the add-to-favorites button initially", () => {
    renderFavoriteButton();

    expect(
      screen.getByRole("button", {
        name: "Add to favorites",
      }),
    ).toBeInTheDocument();
  });

  it("adds an item to favorites when clicked", async () => {
    const user = userEvent.setup();

    renderFavoriteButton();

    await user.click(
      screen.getByRole("button", {
        name: "Add to favorites",
      }),
    );

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: "Remove from favorites",
        }),
      ).toBeInTheDocument();
    });

    const favorites =
      store.getState().favorites.items;

    expect(favorites).toHaveLength(1);
    expect(favorites[0]?.contentId).toBe(
      mockNewsItem.id,
    );
    expect(favorites[0]?.contentType).toBe(
      mockNewsItem.type,
    );
  });

  it("removes an item from favorites when clicked again", async () => {
    const user = userEvent.setup();

    renderFavoriteButton();

    await user.click(
      screen.getByRole("button", {
        name: "Add to favorites",
      }),
    );

    const removeButton =
      await screen.findByRole("button", {
        name: "Remove from favorites",
      });

    await user.click(removeButton);

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: "Add to favorites",
        }),
      ).toBeInTheDocument();
    });

    expect(
      store.getState().favorites.items,
    ).toHaveLength(0);
  });

  it("stores the complete content item in favorites", async () => {
    const user = userEvent.setup();

    renderFavoriteButton();

    await user.click(
      screen.getByRole("button", {
        name: "Add to favorites",
      }),
    );

    await waitFor(() => {
      const favorites =
        store.getState().favorites.items;

      expect(favorites).toHaveLength(1);
      expect(favorites[0]?.item).toEqual(
        mockNewsItem,
      );
    });
  });
});
