"use client";

import { useEffect, type ReactNode } from "react";

import { StoreProvider } from "@/store/provider";
import { useAppSelector } from "@/store/hooks";
import { store } from "@/store/store";

import { setFavorites } from "@/features/favorites/favoritesSlice";
import { setTheme } from "@/features/theme/themeSlice";
import { updatePreferences } from "@/features/preferences/preferencesSlice";
import { setFeedOrder } from "@/features/feed/feedSlice";

import { STORAGE_KEYS } from "@/lib/constants";
import {
  readStorage,
  writeStorage,
} from "@/lib/storage";

import type { FavoriteItem, UserPreferences } from "@/types/user";
import type { ThemeMode } from "@/features/theme/themeSlice";

interface ProvidersProps {
  children: ReactNode;
}

function ThemeSync() {
  const mode = useAppSelector(
    (state) => state.theme.mode,
  );

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      mode === "dark",
    );
  }, [mode]);

  return null;
}

function PersistenceSync() {
  useEffect(() => {
    /*
     * Restore saved state once when the application starts.
     */

    const storedFavorites = readStorage<FavoriteItem[]>(
      STORAGE_KEYS.FAVORITES,
      [],
    );

    const storedPreferences =
      readStorage<Partial<UserPreferences>>(
        STORAGE_KEYS.PREFERENCES,
        {},
      );

    const storedTheme = readStorage<ThemeMode>(
      "pulsefeed-theme",
      "light",
    );

    const storedFeedOrder = readStorage<string[]>(
      STORAGE_KEYS.FEED_ORDER,
      [],
    );

    if (storedFavorites.length > 0) {
      store.dispatch(
        setFavorites(storedFavorites),
      );
    }

    if (
      Object.keys(storedPreferences).length > 0
    ) {
      store.dispatch(
        updatePreferences(storedPreferences),
      );
    }

    store.dispatch(setTheme(storedTheme));

    if (storedFeedOrder.length > 0) {
      store.dispatch(
        setFeedOrder(storedFeedOrder),
      );
    }

    /*
     * Persist relevant Redux state whenever it changes.
     */

    let previousFavorites = JSON.stringify(
      store.getState().favorites.items,
    );

    let previousPreferences = JSON.stringify(
      store.getState().preferences,
    );

    let previousTheme = store.getState().theme.mode;

    let previousFeedOrder = JSON.stringify(
      store.getState().feed.orderedIds,
    );

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();

      const favorites = JSON.stringify(
        state.favorites.items,
      );

      if (favorites !== previousFavorites) {
        writeStorage(
          STORAGE_KEYS.FAVORITES,
          state.favorites.items,
        );

        previousFavorites = favorites;
      }

      const preferences = JSON.stringify(
        state.preferences,
      );

      if (
        preferences !== previousPreferences
      ) {
        writeStorage(
          STORAGE_KEYS.PREFERENCES,
          state.preferences,
        );

        previousPreferences = preferences;
      }

      const theme = state.theme.mode;

      if (theme !== previousTheme) {
        writeStorage(
          "pulsefeed-theme",
          theme,
        );

        previousTheme = theme;
      }

      const feedOrder = JSON.stringify(
        state.feed.orderedIds,
      );

      if (
        feedOrder !== previousFeedOrder &&
        state.feed.orderedIds.length > 0
      ) {
        writeStorage(
          STORAGE_KEYS.FEED_ORDER,
          state.feed.orderedIds,
        );

        previousFeedOrder = feedOrder;
      }
    });

    return unsubscribe;
  }, []);

  return null;
}

export function Providers({
  children,
}: ProvidersProps) {
  return (
    <StoreProvider>
      <ThemeSync />
      <PersistenceSync />
      {children}
    </StoreProvider>
  );
}

export default Providers;
