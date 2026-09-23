"use client";

import Image from "next/image";
import { ExternalLink, Newspaper } from "lucide-react";

import type { NewsContentItem } from "@/types/content";
import { FavoriteButton } from "./FavoriteButton";

interface NewsCardProps {
  item: NewsContentItem;
}

export function NewsCard({ item }: NewsCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Newspaper className="h-12 w-12 text-slate-300 dark:text-slate-600" />
          </div>
        )}

        <div className="absolute right-3 top-3">
          <FavoriteButton
            contentId={item.id}
            contentType={item.type}
            item={item}
          />
        </div>

        <div className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {item.source}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>
            {new Date(item.publishedAt).toLocaleDateString()}
          </span>

          {item.author && (
            <>
              <span>•</span>
              <span>{item.author}</span>
            </>
          )}
        </div>

        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-slate-900 dark:text-white">
          {item.title}
        </h3>

        {item.description && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {item.description}
          </p>
        )}

        <div className="mt-5">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Read article
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
