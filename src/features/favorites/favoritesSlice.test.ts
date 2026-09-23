import { describe, expect, it } from "vitest";
import {
  favoritesReducer,
  toggleFavorite,
  removeFavorite,
  clearFavorites,
} from "./favoritesSlice";
import type { NewsContentItem } from "@/types/content";

const mockItem: NewsContentItem = {
  id: "news-1",
  type: "news",
  title: "Test article",
  description: "Test description",
  imageUrl: "https://example.com/image.jpg",
  category: "technology",
  publishedAt: "2026-09-23T10:00:00.000Z",
  isFavorite: false,
  source: "Test Source",
  author: "Test Author",
  url: "https://example.com",
};

describe("favoritesSlice", () => {
  it("adds an item to favorites", () => {
    const state = favoritesReducer(
      undefined,
      toggleFavorite({
        contentId: mockItem.id,
        contentType: mockItem.type,
        addedAt: "2026-09-23T10:00:00.000Z",
        item: mockItem,
      }),
    );

    expect(state.items).toHaveLength(1);
    expect(state.items[0]?.contentId).toBe(
      mockItem.id,
    );
  });

  it("removes an existing favorite when toggled", () => {
    const initialState = {
      items: [
        {
          contentId: mockItem.id,
          contentType: mockItem.type,
          addedAt: "2026-09-23T10:00:00.000Z",
          item: mockItem,
        },
      ],
    };

    const state = favoritesReducer(
      initialState,
      toggleFavorite({
        contentId: mockItem.id,
        contentType: mockItem.type,
        addedAt: "2026-09-23T10:00:00.000Z",
        item: mockItem,
      }),
    );

    expect(state.items).toHaveLength(0);
  });

  it("removes a specific favorite", () => {
    const initialState = {
      items: [
        {
          contentId: mockItem.id,
          contentType: mockItem.type,
          addedAt: "2026-09-23T10:00:00.000Z",
          item: mockItem,
        },
      ],
    };

    const state = favoritesReducer(
      initialState,
      removeFavorite({
        contentId: mockItem.id,
        contentType: mockItem.type,
      }),
    );

    expect(state.items).toHaveLength(0);
  });

  it("clears all favorites", () => {
    const initialState = {
      items: [
        {
          contentId: "1",
          contentType: "news" as const,
          addedAt: "2026-09-23T10:00:00.000Z",
        },
        {
          contentId: "2",
          contentType: "movie" as const,
          addedAt: "2026-09-23T10:00:00.000Z",
        },
      ],
    };

    const state = favoritesReducer(
      initialState,
      clearFavorites(),
    );

    expect(state.items).toHaveLength(0);
  });
});