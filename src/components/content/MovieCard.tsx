"use client";

import Image from "next/image";
import {
  CalendarDays,
  Film,
  Star,
} from "lucide-react";

import type { MovieContentItem } from "@/types/content";
import { FavoriteButton } from "./FavoriteButton";

interface MovieCardProps {
  item: MovieContentItem;
}

export function MovieCard({ item }: MovieCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card card-shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Poster */}
      <div className="relative h-[340px] overflow-hidden bg-slate-100 dark:bg-slate-800">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">
            <Film size={42} strokeWidth={1.5} />
          </div>
        )}

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <span className="rounded-full border border-white/20 bg-slate-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
            Movie
          </span>

          <FavoriteButton
            contentId={item.id}
            contentType={item.type}
            item={item}
          />
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-slate-950/80 px-2.5 py-1.5 text-xs font-bold text-white backdrop-blur">
          <Star
            size={13}
            fill="currentColor"
            className="text-yellow-400"
          />

          {item.rating.toFixed(1)}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="line-clamp-2 text-lg font-bold leading-6 tracking-tight">
          {item.title}
        </h2>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.genres.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="rounded-full bg-accent-soft px-2.5 py-1 text-[10px] font-semibold text-accent-dark dark:text-accent"
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          {item.releaseDate ? (
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <CalendarDays size={14} />

              <span>
                {new Date(
                  item.releaseDate,
                ).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          ) : (
            <span className="text-xs text-muted">
              Release date unavailable
            </span>
          )}

          {item.voteCount !== undefined && (
            <span className="text-xs text-muted">
              {item.voteCount.toLocaleString()} votes
            </span>
          )}
        </div>
      </div>
    </article>
  );
}