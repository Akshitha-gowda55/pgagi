"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  Heart,
  SearchX,
  Sparkles,
} from "lucide-react";

import { ContentCard } from "@/components/content/ContentCard";
import { useAppSelector } from "@/store/hooks";

export default function FavoritesPage() {
  const favorites = useAppSelector(
    (state) => state.favorites.items,
  );

  const savedItems = favorites
    .map((favorite) => favorite.item)
    .filter((item) => item !== undefined);

  return (
    <div className="space-y-8 pb-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[28px] border border-border bg-card shadow-sm">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-rose-400/10 blur-3xl" />

        <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 dark:bg-rose-950/40 dark:text-rose-400">
            <Heart size={23} fill="currentColor" />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-accent">
            Your collection
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Saved favorites
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base">
            Keep the stories, movies, and conversations you want
            to come back to.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-2 text-xs font-semibold text-muted">
            <Bookmark size={14} />

            {favorites.length}{" "}
            {favorites.length === 1
              ? "saved item"
              : "saved items"}
          </div>
        </div>
      </section>

      {/* No favorites */}
      {favorites.length === 0 && (
        <section className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
            <SearchX size={28} />
          </div>

          <h2 className="mt-5 text-lg font-bold">
            Nothing saved yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
            When you find something interesting, click the heart
            button on a content card to save it here.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark"
          >
            <ArrowLeft size={16} />
            Explore your feed
          </Link>
        </section>
      )}

      {/* Saved content */}
      {savedItems.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <Sparkles size={17} />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight">
                Your saved content
              </h2>

              <p className="mt-1 text-sm text-muted">
                Your favorite stories and recommendations.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {savedItems.map((item) => (
              <ContentCard
                key={`${item.type}-${item.id}`}
                item={item}
              />
            ))}
          </div>
        </section>
      )}

      {/* Legacy favorites */}
      {favorites.length > 0 &&
        savedItems.length === 0 && (
          <section className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 dark:bg-amber-950/40 dark:text-amber-400">
              <Heart size={25} />
            </div>

            <h2 className="mt-5 text-lg font-bold">
              Saved items need to be refreshed
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
              These favorites were saved by an earlier version
              of the app. Save them again from the dashboard to
              store the complete content.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
            >
              <ArrowLeft size={16} />
              Go to dashboard
            </Link>
          </section>
        )}
    </div>
  );
}