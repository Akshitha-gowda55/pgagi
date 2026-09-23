"use client";

import { Loader2, Plus } from "lucide-react";

interface LoadMoreButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  hasMore?: boolean;
}

export function LoadMoreButton({
  onClick,
  loading = false,
  disabled = false,
  hasMore = true,
}: LoadMoreButtonProps) {
  if (!hasMore) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-muted">
          You&apos;ve reached the end of your feed
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-8">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled || loading}
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2
              size={16}
              className="animate-spin"
            />
            Loading more...
          </>
        ) : (
          <>
            <Plus size={16} />
            Load more
          </>
        )}
      </button>
    </div>
  );
}