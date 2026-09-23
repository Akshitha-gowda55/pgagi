"use client";

import { Loader2, Sparkles } from "lucide-react";

import { ContentCard } from "@/components/content/ContentCard";

import { useGetNewsQuery } from "@/services/api/newsApi";
import { useGetMoviesQuery } from "@/services/api/moviesApi";
import { useGetSocialQuery } from "@/services/api/socialApi";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
  appendItems,
  setHasMore,
  setItems,
  setPage,
  setStatus,
} from "@/features/feed/feedSlice";

import type { UnifiedContentItem } from "@/types/content";

interface UnifiedFeedProps {
  query?: string;
}

export function UnifiedFeed({
  query = "",
}: UnifiedFeedProps) {
  const dispatch = useAppDispatch();

  const feedItems = useAppSelector(
    (state) => state.feed.items,
  );

  const hasMore = useAppSelector(
    (state) => state.feed.hasMore,
  );

  const page = useAppSelector(
    (state) => state.feed.page,
  );

  const search = query.trim();

  const news = useGetNewsQuery({
    category: search ? undefined : "technology",
    query: search || undefined,
    page,
    pageSize: 6,
  });

  const movies = useGetMoviesQuery({
    query: search,
    page,
  });

  const social = useGetSocialQuery({
    query: search || undefined,
    page,
    pageSize: 6,
  });

  const isLoading =
    news.isLoading ||
    movies.isLoading ||
    social.isLoading;

  const isFetching =
    news.isFetching ||
    movies.isFetching ||
    social.isFetching;

  const items: UnifiedContentItem[] = [
    ...(news.data?.items ?? []),
    ...(movies.data?.items ?? []),
    ...(social.data?.items ?? []),
  ];

  const uniqueItems = Array.from(
    new Map(
      items.map((item) => [
        `${item.type}-${item.id}`,
        item,
      ]),
    ).values(),
  );

  function loadMore() {
    if (isFetching || !hasMore) {
      return;
    }

    if (uniqueItems.length > 0) {
      if (page === 1) {
        dispatch(setItems(uniqueItems));
      } else {
        dispatch(appendItems(uniqueItems));
      }
    }

    const moreAvailable =
      Boolean(news.data?.hasMore) ||
      Boolean(movies.data?.hasMore) ||
      Boolean(social.data?.hasMore);

    dispatch(setHasMore(moreAvailable));
    dispatch(setStatus("loading"));
    dispatch(setPage(page + 1));
  }

  if (
    isLoading &&
    feedItems.length === 0
  ) {
    return (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map(
          (_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="h-48 animate-pulse bg-slate-200 dark:bg-slate-800" />

              <div className="space-y-3 p-5">
                <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                <div className="h-6 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          ),
        )}
      </div>
    );
  }

  if (
    !isLoading &&
    feedItems.length === 0
  ) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <Sparkles size={24} />
        </div>

        <h3 className="mt-4 text-lg font-semibold">
          No content found
        </h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-muted">
          Try another search term or check your
          content preferences.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {feedItems.map((item) => (
          <ContentCard
            key={`${item.type}-${item.id}`}
            item={item}
          />
        ))}
      </div>

      <div className="flex justify-center py-8">
        {hasMore ? (
          <button
            type="button"
            onClick={loadMore}
            disabled={isFetching}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-muted shadow-sm transition hover:border-accent hover:bg-accent-soft hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isFetching && (
              <Loader2
                size={16}
                className="animate-spin"
              />
            )}

            {isFetching
              ? "Loading..."
              : "Load more"}
          </button>
        ) : (
          <p className="text-xs text-muted">
            You&apos;ve reached the end of your feed.
          </p>
        )}
      </div>
    </div>
  );
}