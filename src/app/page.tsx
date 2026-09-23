"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import {
  SearchX,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

import { useGetNewsQuery } from "@/services/api/newsApi";
import { useGetMoviesQuery } from "@/services/api/moviesApi";
import { useGetSocialQuery } from "@/services/api/socialApi";

import { DraggableFeed } from "@/components/feed/DraggableFeed";
import { FeedError } from "@/components/feed/FeedError";
import { LoadMoreButton } from "@/components/feed/LoadMoreButton";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setItems } from "@/features/feed/feedSlice";

import { useDebounce } from "@/hooks/useDebounce";

import type { UnifiedContentItem } from "@/types/content";

function HomePageContent() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const query = useAppSelector((state) => state.search.query);

  const selectedCategories = useAppSelector(
    (state) => state.preferences.categories,
  );

  const selectedContentTypes = useAppSelector(
    (state) => state.preferences.contentTypes,
  );

  const orderedIds = useAppSelector(
    (state) => state.feed.orderedIds,
  );

  const debouncedQuery = useDebounce(query.trim(), 400);

  const [newsPage, setNewsPage] = useState(1);
  const [moviesPage, setMoviesPage] = useState(1);
  const [socialPage, setSocialPage] = useState(1);

  const [loadedItems, setLoadedItems] = useState<UnifiedContentItem[]>([]);

  const sourceParam = searchParams.get("source");

  const activeSource =
    sourceParam === "movies"
      ? "movie"
      : sourceParam === "news"
        ? "news"
        : sourceParam === "social"
          ? "social"
          : null;

  const shouldLoadNews =
    (activeSource === null || activeSource === "news") &&
    selectedContentTypes.includes("news");

  const shouldLoadMovies =
    (activeSource === null || activeSource === "movie") &&
    selectedContentTypes.includes("movie");

  const shouldLoadSocial =
    (activeSource === null || activeSource === "social") &&
    selectedContentTypes.includes("social");

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setNewsPage(1);
    setMoviesPage(1);
    setSocialPage(1);
    setLoadedItems([]);
  }, [
    debouncedQuery,
    activeSource,
    selectedCategories,
    selectedContentTypes,
  ]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const news = useGetNewsQuery(
    {
      categories:
        selectedCategories.length > 0
          ? selectedCategories
          : ["technology"],
      query: debouncedQuery || undefined,
      page: newsPage,
      pageSize: 6,
    },
    {
      skip: !shouldLoadNews,
    },
  );

  const movies = useGetMoviesQuery(
    {
      query: debouncedQuery,
      categories:
        selectedCategories.length > 0
          ? selectedCategories
          : ["technology"],
      page: moviesPage,
    },
    {
      skip: !shouldLoadMovies,
    },
  );

  const social = useGetSocialQuery(
    {
      query: debouncedQuery || undefined,
      page: socialPage,
      pageSize: 6,
    },
    {
      skip: !shouldLoadSocial,
    },
  );

  /*
   * Keep the three API sources separate for rendering.
   * We still maintain one combined Redux feed so favorites/order
   * persistence continues to work.
   */
  const currentItems = useMemo(
    () => [
      ...(news.data?.items ?? []),
      ...(movies.data?.items ?? []),
      ...(social.data?.items ?? []),
    ],
    [
      news.data?.items,
      movies.data?.items,
      social.data?.items,
    ],
  );

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (currentItems.length === 0) {
      return;
    }

    setLoadedItems((previousItems) => {
      const existingIds = new Set(
        previousItems.map(
          (item) => `${item.type}-${item.id}`,
        ),
      );

      const newItems = currentItems.filter(
        (item) =>
          !existingIds.has(`${item.type}-${item.id}`),
      );

      if (newItems.length === 0) {
        return previousItems;
      }

      return [...previousItems, ...newItems];
    });
  }, [currentItems]);
  /* eslint-enable react-hooks/set-state-in-effect */

  /*
   * Keep Redux aware of every loaded item.
   * Rendering is separated below into News / Movies / Social.
   */
  useEffect(() => {
    if (loadedItems.length === 0) {
      return;
    }

    const needsSync = loadedItems.some(
      (item) =>
        !orderedIds.includes(`${item.type}-${item.id}`),
    );

    if (needsSync) {
      dispatch(setItems(loadedItems));
    }
  }, [dispatch, loadedItems, orderedIds]);

  /*
   * Separate content collections.
   * This prevents News, Movies and Social cards from becoming jumbled.
   */
  const newsItems = useMemo(
    () =>
      loadedItems.filter(
        (item) => item.type === "news",
      ),
    [loadedItems],
  );

  const movieItems = useMemo(
    () =>
      loadedItems.filter(
        (item) => item.type === "movie",
      ),
    [loadedItems],
  );

  const socialItems = useMemo(
    () =>
      loadedItems.filter(
        (item) => item.type === "social",
      ),
    [loadedItems],
  );

  const isLoading =
    news.isLoading ||
    movies.isLoading ||
    social.isLoading;

  const isFetching =
    news.isFetching ||
    movies.isFetching ||
    social.isFetching;

  const hasError =
    news.isError ||
    movies.isError ||
    social.isError;

  const isSearching = debouncedQuery.length > 0;

  const newsHasMore =
    shouldLoadNews &&
    Boolean(news.data?.hasMore);

  const moviesHasMore =
    shouldLoadMovies &&
    Boolean(movies.data?.hasMore);

  const socialHasMore =
    shouldLoadSocial &&
    Boolean(social.data?.hasMore);

  const hasMore =
    newsHasMore ||
    moviesHasMore ||
    socialHasMore;

  const sourceTitle =
    activeSource === "news"
      ? "News"
      : activeSource === "movie"
        ? "Movies"
        : activeSource === "social"
          ? "Social"
          : "Your feed";

  const sourceDescription =
    activeSource === "news"
      ? "Latest news based on your interests."
      : activeSource === "movie"
        ? "Movies and recommendations for you."
        : activeSource === "social"
          ? "Social conversations and community posts."
          : "News, movies and conversations selected for you.";

  function handleLoadMore() {
    if (isFetching) {
      return;
    }

    if (newsHasMore) {
      setNewsPage((page) => page + 1);
    }

    if (moviesHasMore) {
      setMoviesPage((page) => page + 1);
    }

    if (socialHasMore) {
      setSocialPage((page) => page + 1);
    }
  }

  function handleRetry() {
    if (shouldLoadNews) {
      void news.refetch();
    }

    if (shouldLoadMovies) {
      void movies.refetch();
    }

    if (shouldLoadSocial) {
      void social.refetch();
    }
  }

  /*
   * When the user explicitly selects one source,
   * only that source section is displayed.
   */
  const showNewsSection =
    shouldLoadNews &&
    (activeSource === null || activeSource === "news");

  const showMoviesSection =
    shouldLoadMovies &&
    (activeSource === null || activeSource === "movie");

  const showSocialSection =
    shouldLoadSocial &&
    (activeSource === null || activeSource === "social");

  return (
    <div className="space-y-8 pb-6">

      {/* Hero */}
      {!isSearching && activeSource === null && (
        <section className="relative overflow-hidden rounded-[28px] border border-border bg-card shadow-sm">
          <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 right-56 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 dark:border-teal-900/60 dark:bg-teal-950/50 dark:text-teal-300">
                <Sparkles size={13} />
                Personalized for you
              </div>

              <h1 className="text-[36px] font-bold leading-[1.08] tracking-[-0.035em] text-slate-950 dark:text-white sm:text-[46px] lg:text-[54px]">
                Everything worth knowing,
                <span className="block text-teal-600 dark:text-teal-400">
                  in one place.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                Discover relevant news, movies, and social conversations
                based on your interests — organized into dedicated sections.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {selectedCategories.length > 0 ? (
                  selectedCategories.map((category) => (
                    <span
                      key={category}
                      className="rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-medium capitalize text-muted"
                    >
                      {category}
                    </span>
                  ))
                ) : (
                  <span className="rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-medium text-muted">
                    All content
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search / Source heading */}
      {(isSearching || activeSource !== null) && (
        <section className="rounded-[24px] border border-border bg-card p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            {isSearching ? "Search results" : "Content source"}
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {isSearching
              ? `Results for "${debouncedQuery}"`
              : sourceTitle}
          </h1>

          <p className="mt-2 text-sm text-muted">
            {isSearching
              ? `Searching ${sourceTitle.toLowerCase()} content.`
              : sourceDescription}
          </p>
        </section>
      )}

      {/* Initial loading */}
      {isLoading && loadedItems.length === 0 && (
        <section className="space-y-8">
          <div>
            <div className="mb-4 h-7 w-40 animate-pulse rounded-lg bg-card" />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`news-skeleton-${index}`}
                  className="h-[360px] animate-pulse rounded-2xl border border-border bg-card"
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 h-7 w-40 animate-pulse rounded-lg bg-card" />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`movie-skeleton-${index}`}
                  className="h-[360px] animate-pulse rounded-2xl border border-border bg-card"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Error */}
      {!isLoading &&
        hasError &&
        loadedItems.length === 0 && (
          <FeedError
            onRetry={handleRetry}
            message="One or more content sources could not be loaded. Please try again."
          />
        )}

      {/* =========================
          NEWS SECTION
         ========================= */}
      {showNewsSection && (
        <section className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  📰 News
                </h2>

                <span className="rounded-full bg-accent-soft px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-accent-dark dark:text-accent">
                  Latest
                </span>
              </div>

              <p className="mt-1.5 text-sm text-muted">
                Latest news based on your selected interests.
              </p>
            </div>

           </div>

          {!news.isLoading &&
            newsItems.length > 0 && (
              <DraggableFeed items={newsItems} />
            )}

          {!news.isLoading &&
            newsItems.length === 0 &&
            !news.isError && (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <SearchX className="mx-auto text-muted" size={25} />
                <p className="mt-3 text-sm font-semibold">
                  No news available
                </p>
              </div>
            )}
        </section>
      )}

      {/* =========================
          MOVIES SECTION
         ========================= */}
      {showMoviesSection && (
        <section className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  🎬 Movies
                </h2>

                <span className="rounded-full bg-accent-soft px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-accent-dark dark:text-accent">
                  For you
                </span>
              </div>

              <p className="mt-1.5 text-sm text-muted">
                Movies recommended based on your interests.
              </p>
            </div>

          </div>

          {!movies.isLoading &&
            movieItems.length > 0 && (
              <DraggableFeed items={movieItems} />
            )}

          {!movies.isLoading &&
            movieItems.length === 0 &&
            !movies.isError && (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <SearchX className="mx-auto text-muted" size={25} />
                <p className="mt-3 text-sm font-semibold">
                  No movies available
                </p>
              </div>
            )}
        </section>
      )}

      {/* =========================
          TRENDING / SOCIAL SECTION
         ========================= */}
      {showSocialSection && (
        <section className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  🔥 Trending & Social
                </h2>

                <span className="rounded-full bg-accent-soft px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-accent-dark dark:text-accent">
                  Trending
                </span>
              </div>

              <p className="mt-1.5 text-sm text-muted">
                Trending conversations and community content.
              </p>
            </div>

          
          </div>

          {!social.isLoading &&
            socialItems.length > 0 && (
              <DraggableFeed items={socialItems} />
            )}

          {!social.isLoading &&
            socialItems.length === 0 &&
            !social.isError && (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <SearchX className="mx-auto text-muted" size={25} />
                <p className="mt-3 text-sm font-semibold">
                  No trending content available
                </p>
              </div>
            )}
        </section>
      )}

      {/* Completely empty */}
      {!isLoading &&
        !hasError &&
        loadedItems.length === 0 && (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
              <SearchX size={25} />
            </div>

            <h3 className="mt-4 font-semibold">
              {isSearching
                ? "No results found"
                : "No content available"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              {isSearching
                ? `We couldn't find anything matching "${debouncedQuery}". Try another search.`
                : `There is currently no ${sourceTitle.toLowerCase()} content available. Check your API keys or enable this source in Settings.`}
            </p>
          </div>
        )}

      {/* Pagination */}
      {loadedItems.length > 0 && (
        <LoadMoreButton
          onClick={handleLoadMore}
          loading={isFetching}
          disabled={isFetching}
          hasMore={hasMore}
        />
      )}

      {/* Personalization footer */}
      {!isSearching && activeSource === null && (
        <section className="rounded-2xl border border-border bg-card">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <TrendingUp size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Your feed is personalized
                </p>

                <p className="mt-0.5 text-xs text-muted">
                  Search or save content to make PulseFeed more useful.
                </p>
              </div>
            </div>

            <a
              href="/settings"
              className="self-start rounded-lg border border-border px-3.5 py-2 text-xs font-semibold text-muted transition hover:border-accent hover:bg-accent-soft hover:text-accent"
            >
              Customize feed
            </a>
          </div>
        </section>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] animate-pulse rounded-2xl border border-border bg-card" />
      }
    >
      <HomePageContent />
    </Suspense>
  );
}
