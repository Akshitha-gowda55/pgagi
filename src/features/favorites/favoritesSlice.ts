import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { FavoriteItem } from "@/types/user";
import type { UnifiedContentItem } from "@/types/content";

interface FavoritesState {
  items: FavoriteItem[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(
      state,
      action: PayloadAction<{
        contentId: string;
        contentType: FavoriteItem["contentType"];
        addedAt: string;
        item?: UnifiedContentItem;
      }>,
    ) {
      const existingIndex = state.items.findIndex(
        (favorite) =>
          favorite.contentId === action.payload.contentId &&
          favorite.contentType === action.payload.contentType,
      );

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
        return;
      }

      state.items.push({
        contentId: action.payload.contentId,
        contentType: action.payload.contentType,
        addedAt: action.payload.addedAt,
        item: action.payload.item,
      });
    },

    setFavorites(
      state,
      action: PayloadAction<FavoriteItem[]>,
    ) {
      state.items = action.payload;
    },

    removeFavorite(
      state,
      action: PayloadAction<{
        contentId: string;
        contentType: FavoriteItem["contentType"];
      }>,
    ) {
      state.items = state.items.filter(
        (favorite) =>
          !(
            favorite.contentId === action.payload.contentId &&
            favorite.contentType === action.payload.contentType
          ),
      );
    },

    clearFavorites(state) {
      state.items = [];
    },
  },
});

export const {
  toggleFavorite,
  setFavorites,
  removeFavorite,
  clearFavorites,
} = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;