"use client";

import {
  Flame,
  SearchX,
  TrendingUp,
} from "lucide-react";

import { useGetMoviesQuery } from "@/services/api/moviesApi";
import { useGetNewsQuery } from "@/services/api/newsApi";
import { useGetSocialQuery } from "@/services/api/socialApi";

import { ContentCard } from "@/components/content/ContentCard";

export default function TrendingPage() {
  const news = useGetNewsQuery({
    category: "technology",
    page: 1,
    pageSize: 6,
  });

  const movies = useGetMoviesQuery({
    query: "",
    page: 1,
  });

  const social = useGetSocialQuery({
    page: 1,
    pageSize: 6,
  });

  const items = [
    ...(news.data?.items ?? []),
    ...(movies.data?.items ?? []),
    ...(social.data?.items ?? []),
  ];

  const isLoading =
    news.isLoading ||
    movies.isLoading ||
    social.isLoading;

  return (
    <div className="space-y-8 pb-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[28px] border border-border bg-card shadow-sm">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 dark:bg-orange-950/40 dark:text-orange-400">
            <Flame size={24} strokeWidth={2.2} />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-accent">
            Discover what&apos;s popular
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-[42px]">
            Trending now
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base">
            Explore popular news, movies, and social conversations
            from across the available sources.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-medium text-muted">
              News
            </span>

            <span className="rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-medium text-muted">
              Movies
            </span>

            <span className="rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-medium text-muted">
              Social
            </span>
          </div>
        </div>
      </section>

      {/* Trending content */}
      <section className="space-y-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <TrendingUp size={17} />
            </div>

            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              Popular content
            </h2>
          </div>

          <p className="mt-2 text-sm text-muted">
            Content getting attention across your available sources.
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="h-48 animate-pulse bg-slate-200 dark:bg-slate-800" />

                <div className="space-y-3 p-5">
                  <div className="h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                  <div className="h-5 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                  <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                  <div className="pt-2">
                    <div className="h-9 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        {!isLoading && items.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <ContentCard
                key={`${item.type}-${item.id}`}
                item={item}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && items.length === 0 && (
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
              <SearchX size={26} />
            </div>

            <h3 className="mt-5 text-base font-semibold">
              No trending content available
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
              We couldn&apos;t load trending content right now.
              Check your API configuration and try again.
            </p>
          </div>
        )}
      </section>

      {/* Bottom information card */}
      <section className="rounded-2xl border border-border bg-card">
        <div className="flex items-center gap-3 p-5 sm:p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <Flame size={18} />
          </div>

          <div>
            <p className="text-sm font-semibold">
              Stay in the loop
            </p>

            <p className="mt-0.5 text-xs leading-5 text-muted">
              Trending content helps you discover what people are
              reading, watching, and discussing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
