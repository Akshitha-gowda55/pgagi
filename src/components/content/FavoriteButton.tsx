"use client";

import { Heart } from "lucide-react";

import { toggleFavorite } from "@/features/favorites/favoritesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import type {
  ContentType,
  UnifiedContentItem,
} from "@/types/content";

interface FavoriteButtonProps {
  contentId: string;
  contentType: ContentType;
  item?: UnifiedContentItem;
}

export function FavoriteButton({
  contentId,
  contentType,
  item,
}: FavoriteButtonProps) {
  const dispatch = useAppDispatch();

  const isFavorite = useAppSelector((state) =>
    state.favorites.items.some(
      (favorite) =>
        favorite.contentId === contentId &&
        favorite.contentType === contentType,
    ),
  );

  function handleClick() {
    dispatch(
      toggleFavorite({
        contentId,
        contentType,
        addedAt: new Date().toISOString(),
        item,
      }),
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={
        isFavorite
          ? "Remove from favorites"
          : "Add to favorites"
      }
      className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur transition ${
        isFavorite
          ? "border-rose-200 bg-rose-50 text-rose-500 dark:border-rose-900 dark:bg-rose-950/50"
          : "border-slate-200 bg-white/90 text-slate-500 hover:border-rose-200 hover:text-rose-500 dark:border-slate-700 dark:bg-slate-900/90"
      }`}
    >
      <Heart
        size={17}
        fill={isFavorite ? "currentColor" : "none"}
      />
    </button>
  );
}