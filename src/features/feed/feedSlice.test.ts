import { describe, expect, it } from "vitest";

import {
  feedReducer,
  setItems,
  appendItems,
  reorderItems,
  setFeedOrder,
  setPage,
  setHasMore,
  resetFeed,
} from "./feedSlice";

import type { NewsContentItem } from "@/types/content";

const item1: NewsContentItem = {
  id: "1",
  type: "news",
  title: "Article One",
  description: "Description one",
  publishedAt: "2026-09-23T10:00:00.000Z",
  isFavorite: false,
  source: "Source One",
  url: "https://example.com/1",
};

const item2: NewsContentItem = {
  id: "2",
  type: "news",
  title: "Article Two",
  description: "Description two",
  publishedAt: "2026-09-23T11:00:00.000Z",
  isFavorite: false,
  source: "Source Two",
  url: "https://example.com/2",
};

const item3: NewsContentItem = {
  id: "3",
  type: "news",
  title: "Article Three",
  description: "Description three",
  publishedAt: "2026-09-23T12:00:00.000Z",
  isFavorite: false,
  source: "Source Three",
  url: "https://example.com/3",
};

describe("feedSlice", () => {
  it("sets feed items with composite ordering IDs", () => {
    const state = feedReducer(
      undefined,
      setItems([item1, item2]),
    );

    expect(state.items).toHaveLength(2);

    expect(state.orderedIds).toEqual([
      "news-1",
      "news-2",
    ]);
  });

  it("appends only new items", () => {
    const initialState = feedReducer(
      undefined,
      setItems([item1, item2]),
    );

    const state = feedReducer(
      initialState,
      appendItems([item2, item3]),
    );

    expect(state.items).toHaveLength(3);

    expect(state.orderedIds).toEqual([
      "news-1",
      "news-2",
      "news-3",
    ]);
  });

  it("reorders feed items", () => {
    const initialState = feedReducer(
      undefined,
      setItems([
        item1,
        item2,
        item3,
      ]),
    );

    const state = feedReducer(
      initialState,
      reorderItems({
        oldIndex: 0,
        newIndex: 2,
      }),
    );

    expect(state.orderedIds).toEqual([
      "news-2",
      "news-3",
      "news-1",
    ]);
  });

  it("restores a persisted feed order", () => {
    const initialState = feedReducer(
      undefined,
      setItems([
        item1,
        item2,
        item3,
      ]),
    );

    const state = feedReducer(
      initialState,
      setFeedOrder([
        "news-3",
        "news-1",
        "news-2",
      ]),
    );

    expect(state.orderedIds).toEqual([
      "news-3",
      "news-1",
      "news-2",
    ]);
  });

  it("preserves restored order when fresh API data arrives", () => {
    const initialState = feedReducer(
      undefined,
      setItems([
        item1,
        item2,
        item3,
      ]),
    );

    const persistedState = feedReducer(
      initialState,
      setFeedOrder([
        "news-3",
        "news-1",
        "news-2",
      ]),
    );

    const refreshedState = feedReducer(
      persistedState,
      setItems([
        item2,
        item3,
        item1,
      ]),
    );

    expect(
      refreshedState.orderedIds,
    ).toEqual([
      "news-3",
      "news-1",
      "news-2",
    ]);
  });

  it("updates pagination state", () => {
    const state = feedReducer(
      undefined,
      setPage(3),
    );

    expect(state.page).toBe(3);
  });

  it("updates hasMore", () => {
    const state = feedReducer(
      undefined,
      setHasMore(false),
    );

    expect(state.hasMore).toBe(false);
  });

  it("resets the feed", () => {
    const modifiedState = feedReducer(
      undefined,
      setItems([item1]),
    );

    const state = feedReducer(
      modifiedState,
      resetFeed(),
    );

    expect(state.items).toEqual([]);
    expect(state.orderedIds).toEqual([]);
    expect(state.page).toBe(1);
    expect(state.hasMore).toBe(true);
  });
});
