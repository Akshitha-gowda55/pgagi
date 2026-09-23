"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface FeedErrorProps {
  message?: string;
  onRetry: () => void;
}

export function FeedError({
  message = "We couldn't load this content right now.",
  onRetry,
}: FeedErrorProps) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-rose-200 bg-card p-8 text-center dark:border-rose-900/50">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 dark:bg-rose-950/40 dark:text-rose-400">
        <AlertTriangle size={25} />
      </div>

      <h3 className="mt-4 text-base font-semibold">
        Something went wrong
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
      >
        <RefreshCw size={15} />
        Try again
      </button>
    </div>
  );
}