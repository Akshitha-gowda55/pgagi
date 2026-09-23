import { configureStore } from "@reduxjs/toolkit";
import { feedReducer } from "@/features/feed/feedSlice";
import { favoritesReducer } from "@/features/favorites/favoritesSlice";
import { preferencesReducer } from "@/features/preferences/preferencesSlice";
import { searchReducer } from "@/features/search/searchSlice";
import { themeReducer } from "@/features/theme/themeSlice";
import { baseApi } from "@/services/api/baseApi";

import "@/services/api/newsApi";
import "@/services/api/moviesApi";
import "@/services/api/socialApi";

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    favorites: favoritesReducer,
    preferences: preferencesReducer,
    search: searchReducer,
    theme: themeReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
    ),

  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
