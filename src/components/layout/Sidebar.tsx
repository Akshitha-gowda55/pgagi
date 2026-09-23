"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  Film,
  Home,
  MessageCircle,
  Newspaper,
  Settings,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { APP_NAME } from "@/lib/constants";

const workspaceItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    label: "Trending",
    href: "/trending",
    icon: TrendingUp,
  },
  {
    label: "Favorites",
    href: "/favourites",
    icon: Bookmark,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const sourceItems = [
  {
    label: "News",
    href: "/?source=news",
    icon: Newspaper,
  },
  {
    label: "Movies",
    href: "/?source=movies",
    icon: Film,
  },
  {
    label: "Social",
    href: "/?source=social",
    icon: MessageCircle,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] flex-col border-r border-border bg-sidebar lg:flex">
      <div className="flex h-full flex-col px-4 py-5">

        {/* Brand */}
        <Link
          href="/"
          className="group mb-8 flex items-center gap-3 px-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white shadow-lg shadow-teal-500/20 transition-transform group-hover:scale-105">
            <Sparkles size={21} strokeWidth={2.4} />
          </div>

          <div>
            <div className="text-[17px] font-bold tracking-tight">
              {APP_NAME}
            </div>

            <div className="text-[11px] font-medium text-muted">
              Personalized content
            </div>
          </div>
        </Link>

        {/* Workspace */}
        <div>
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
            Workspace
          </p>

          <nav className="space-y-1">
            {workspaceItems.map((item) => {
              const Icon = item.icon;

              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? "bg-accent-soft text-accent-dark dark:text-accent"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`}
                >
                  <Icon
                    size={18}
                    strokeWidth={active ? 2.3 : 1.9}
                  />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sources */}
        <div className="mt-8">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
            Sources
          </p>

          <nav className="space-y-1">
            {sourceItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  <Icon
                    size={18}
                    strokeWidth={1.9}
                  />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Personalization */}
        <div className="mt-auto">
          <div className="overflow-hidden rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-4 dark:border-teal-900/50 dark:from-teal-950/50 dark:to-slate-900">

            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-accent shadow-sm dark:bg-slate-800">
              <Sparkles size={17} />
            </div>

            <h3 className="text-sm font-semibold">
              Your feed adapts to you
            </h3>

            <p className="mt-1.5 text-xs leading-5 text-muted">
              Customize your interests to get more relevant content.
            </p>

            <Link
              href="/settings"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent-dark hover:underline dark:text-accent"
            >
              Customize
            </Link>
          </div>

          {/* User information */}
          <div className="mt-4 flex items-center gap-3 rounded-xl px-2 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white dark:bg-white dark:text-slate-900">
              A
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                Akshitha
              </p>

              <p className="truncate text-xs text-muted">
                Personal workspace
              </p>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}
