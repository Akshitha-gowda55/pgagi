"use client";

import Link from "next/link";
import {
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setQuery } from "@/features/search/searchSlice";
import { toggleTheme } from "@/features/theme/themeSlice";

export function Header() {
  const dispatch = useAppDispatch();

  const query = useAppSelector(
    (state) => state.search.query,
  );

  const theme = useAppSelector(
    (state) => state.theme.mode,
  );

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  function clearSearch() {
    dispatch(setQuery(""));
  }

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="flex h-[72px] items-center gap-3 px-4 sm:px-6 lg:px-8">

          {/* Mobile menu */}
          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen((value) => !value)
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted transition hover:text-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu size={19} />
          </button>

          {/* Search */}
          <div className="relative max-w-xl flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              value={query}
              onChange={(event) =>
                dispatch(setQuery(event.target.value))
              }
              placeholder="Search news, movies, people..."
              className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-10 text-sm text-foreground shadow-sm outline-none placeholder:text-muted focus:border-accent focus:ring-4 focus:ring-teal-500/10"
              aria-label="Search content"
            />

            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-muted hover:text-foreground"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2">

            {/* Theme */}
            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted transition hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          />

          <div className="absolute left-0 top-0 h-full w-[280px] border-r border-border bg-card p-5 shadow-2xl">

            <div className="mb-8 flex items-center justify-between">
              <div className="text-lg font-bold">
                PulseFeed
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="space-y-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl bg-accent-soft px-4 py-3 text-sm font-semibold text-accent-dark dark:text-accent"
              >
                Dashboard
              </Link>

              <Link
                href="/trending"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-muted hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Trending
              </Link>

              <Link
                href="/favourites"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-muted hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Favorites
              </Link>

              <Link
                href="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-muted hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Settings
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
