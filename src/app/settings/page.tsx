"use client";

import {
  Check,
  ChevronLeft,
  Moon,
  Newspaper,
  Film,
  MessageCircle,
  RotateCcw,
  Sparkles,
  Sun,
} from "lucide-react";
import Link from "next/link";

import { CONTENT_CATEGORIES, CONTENT_TYPES } from "@/lib/constants";
import {
  resetPreferences,
  toggleCategory,
  toggleContentType,
  setDarkMode,
} from "@/features/preferences/preferencesSlice";
import {
  setTheme,
  type ThemeMode,
} from "@/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { ContentCategory, ContentType } from "@/types/content";

const contentIcons: Record<ContentType, typeof Newspaper> = {
  news: Newspaper,
  movie: Film,
  social: MessageCircle,
};

export default function SettingsPage() {
  const dispatch = useAppDispatch();

  const preferences = useAppSelector(
    (state) => state.preferences,
  );

  const theme = useAppSelector(
    (state) => state.theme.mode,
  );

  function handleCategoryToggle(category: ContentCategory) {
    dispatch(toggleCategory(category));
  }

  function handleContentTypeToggle(type: ContentType) {
    dispatch(toggleContentType(type));
  }

  function handleThemeChange(mode: ThemeMode) {
    dispatch(setTheme(mode));
    dispatch(setDarkMode(mode === "dark"));
  }

  function handleReset() {
    dispatch(resetPreferences());
    dispatch(setTheme("light"));
  }

  return (
    <div className="mx-auto max-w-5xl space-y-7 pb-8">
      {/* Header */}
      <section>
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-accent"
        >
          <ChevronLeft size={16} />
          Back to dashboard
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 dark:border-teal-900/60 dark:bg-teal-950/50 dark:text-teal-300">
              <Sparkles size={13} />
              Personalization
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Customize your feed
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              Choose the topics and content sources you want PulseFeed
              to prioritize.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-muted transition hover:border-accent hover:bg-accent-soft hover:text-accent"
          >
            <RotateCcw size={15} />
            Reset preferences
          </button>
        </div>
      </section>

      {/* Topics */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-bold">
            Your interests
          </h2>

          <p className="mt-1 text-sm text-muted">
            Select the topics you want to see in your feed.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CONTENT_CATEGORIES.map((category) => {
            const selected =
              preferences.categories.includes(category.value);

            return (
              <button
                key={category.value}
                type="button"
                onClick={() =>
                  handleCategoryToggle(category.value)
                }
                className={`group flex items-center justify-between rounded-xl border p-4 text-left transition ${
                  selected
                    ? "border-accent bg-accent-soft"
                    : "border-border bg-background hover:border-accent/50 hover:bg-accent-soft/40"
                }`}
              >
                <span
                  className={`text-sm font-semibold ${
                    selected
                      ? "text-accent-dark dark:text-accent"
                      : "text-foreground"
                  }`}
                >
                  {category.label}
                </span>

                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border transition ${
                    selected
                      ? "border-accent bg-accent text-white"
                      : "border-border bg-card text-transparent"
                  }`}
                >
                  <Check size={14} strokeWidth={3} />
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-5 text-xs text-muted">
          {preferences.categories.length} topic
          {preferences.categories.length === 1 ? "" : "s"} selected
        </p>
      </section>

      {/* Content Sources */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-bold">
            Content sources
          </h2>

          <p className="mt-1 text-sm text-muted">
            Choose the types of content that should appear in your feed.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {CONTENT_TYPES.map((type) => {
            const selected =
              preferences.contentTypes.includes(type.value);

            const Icon = contentIcons[type.value];

            return (
              <button
                key={type.value}
                type="button"
                onClick={() =>
                  handleContentTypeToggle(type.value)
                }
                className={`rounded-2xl border p-5 text-left transition ${
                  selected
                    ? "border-accent bg-accent-soft"
                    : "border-border bg-background hover:border-accent/50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      selected
                        ? "bg-accent text-white"
                        : "bg-card text-muted"
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                      selected
                        ? "border-accent bg-accent text-white"
                        : "border-border"
                    }`}
                  >
                    {selected && (
                      <Check size={14} strokeWidth={3} />
                    )}
                  </div>
                </div>

                <h3 className="mt-5 font-bold">
                  {type.label}
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-muted">
                  {type.value === "news" &&
                    "Latest headlines and stories from your interests."}

                  {type.value === "movie" &&
                    "Movie recommendations and popular titles."}

                  {type.value === "social" &&
                    "Conversations and posts from the community."}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Appearance */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-bold">
            Appearance
          </h2>

          <p className="mt-1 text-sm text-muted">
            Choose how PulseFeed looks.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => handleThemeChange("light")}
            className={`flex items-center gap-4 rounded-xl border p-4 text-left transition ${
              theme === "light"
                ? "border-accent bg-accent-soft"
                : "border-border hover:border-accent/50"
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-amber-500 shadow-sm">
              <Sun size={19} />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold">
                Light mode
              </p>
              <p className="mt-0.5 text-xs text-muted">
                Bright and clean interface
              </p>
            </div>

            {theme === "light" && (
              <Check className="text-accent" size={18} />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleThemeChange("dark")}
            className={`flex items-center gap-4 rounded-xl border p-4 text-left transition ${
              theme === "dark"
                ? "border-accent bg-accent-soft"
                : "border-border hover:border-accent/50"
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-indigo-300 shadow-sm">
              <Moon size={19} />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold">
                Dark mode
              </p>
              <p className="mt-0.5 text-xs text-muted">
                Easier on the eyes at night
              </p>
            </div>

            {theme === "dark" && (
              <Check className="text-accent" size={18} />
            )}
          </button>
        </div>
      </section>

      {/* Summary */}
      <section className="rounded-2xl border border-accent/20 bg-accent-soft p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-white">
            <Sparkles size={17} />
          </div>

          <div>
            <h3 className="text-sm font-bold">
              Your personalization is active
            </h3>

            <p className="mt-1 text-xs leading-5 text-muted">
              PulseFeed will use your selected interests and content
              sources when building your dashboard feed. Your preferences
              are saved locally in your browser.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}