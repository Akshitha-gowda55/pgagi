import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UnifiedContentItem } from "@/types/content";
import type { FeedState } from "@/types/feed";

const initialState: FeedState = {
  items: [],
  orderedIds: [],
  page: 1,
  hasMore: true,
  status: "idle",
  error: null,
  lastUpdated: null,
};

function getContentKey(item: UnifiedContentItem): string {
  return `${item.type}-${item.id}`;
}

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<UnifiedContentItem[]>) {
      const incomingItems = action.payload;
      const incomingIds = incomingItems.map(getContentKey);
      const incomingIdSet = new Set(incomingIds);

      if (state.items.length === 0) {
        state.items = incomingItems;

        // Preserve an order restored from localStorage before
        // the first API response arrives.
        const preservedOrder = state.orderedIds.filter((id) =>
          incomingIdSet.has(id),
        );

        const preservedIdSet = new Set(preservedOrder);

        const newIds = incomingIds.filter(
          (id) => !preservedIdSet.has(id),
        );

        state.orderedIds = [...preservedOrder, ...newIds];
        state.lastUpdated = new Date().toISOString();

        return;
      }

      const existingOrderedIds = state.orderedIds.filter((id) =>
        incomingIdSet.has(id),
      );

      const existingIdSet = new Set(existingOrderedIds);

      const newIds = incomingIds.filter(
        (id) => !existingIdSet.has(id),
      );

      state.items = incomingItems;
      state.orderedIds = [...existingOrderedIds, ...newIds];
      state.lastUpdated = new Date().toISOString();
    },

    appendItems(
      state,
      action: PayloadAction<UnifiedContentItem[]>,
    ) {
      const existingIds = new Set(
        state.items.map(getContentKey),
      );

      const newItems = action.payload.filter(
        (item) => !existingIds.has(getContentKey(item)),
      );

      if (newItems.length === 0) {
        return;
      }

      state.items.push(...newItems);

      state.orderedIds.push(
        ...newItems.map(getContentKey),
      );

      state.lastUpdated = new Date().toISOString();
    },

    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },

    setHasMore(state, action: PayloadAction<boolean>) {
      state.hasMore = action.payload;
    },

    setStatus(
      state,
      action: PayloadAction<FeedState["status"]>,
    ) {
      state.status = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    setFeedOrder(
      state,
      action: PayloadAction<string[]>,
    ) {
      if (action.payload.length === 0) {
        return;
      }

      state.orderedIds = action.payload;
    },

    reorderItems(
      state,
      action: PayloadAction<{
        oldIndex: number;
        newIndex: number;
      }>,
    ) {
      const { oldIndex, newIndex } = action.payload;

      if (
        oldIndex < 0 ||
        newIndex < 0 ||
        oldIndex >= state.orderedIds.length ||
        newIndex >= state.orderedIds.length
      ) {
        return;
      }

      const [moved] = state.orderedIds.splice(
        oldIndex,
        1,
      );

      if (moved !== undefined) {
        state.orderedIds.splice(newIndex, 0, moved);
      }
    },

    resetFeed() {
      return { ...initialState };
    },
  },
});

export const {
  setItems,
  appendItems,
  setPage,
  setHasMore,
  setStatus,
  setError,
  setFeedOrder,
  reorderItems,
  resetFeed,
} = feedSlice.actions;

export const feedReducer = feedSlice.reducer;

export default feedSlice.reducer;
