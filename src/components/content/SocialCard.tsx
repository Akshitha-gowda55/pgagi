"use client";

import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share2,
  UserRound,
} from "lucide-react";

import type { SocialContentItem } from "@/types/content";
import {
  formatRelativeTime,
  truncateText,
} from "@/lib/utils";
import { FavoriteButton } from "./FavoriteButton";

interface SocialCardProps {
  item: SocialContentItem;
}

export function SocialCard({ item }: SocialCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card card-shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-soft text-accent">
              {item.avatarUrl ? (
                <Image
                  src={item.avatarUrl}
                  alt={item.username}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              ) : (
                <UserRound size={19} />
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold">
                {item.username}
              </p>

              <p className="truncate text-xs text-muted">
                {item.handle}
              </p>
            </div>
          </div>

          <FavoriteButton
            contentId={item.id}
            contentType={item.type}
            item={item}
          />
        </div>

        {/* Post */}
        <div className="mt-5">
          <p className="text-sm leading-7">
            {truncateText(item.description ?? "", 260)}
          </p>

          {item.hashtags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {item.hashtags.map((hashtag) => (
                <span
                  key={hashtag}
                  className="text-xs font-semibold text-accent"
                >
                  #{hashtag.replace(/^#/, "")}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Image */}
        {item.imageUrl && (
          <div className="relative mt-5 h-48 overflow-hidden rounded-xl">
            <Image
              src={item.imageUrl}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}

        {/* Time */}
        <p className="mt-4 text-xs text-muted">
          {formatRelativeTime(item.publishedAt)}
        </p>

        {/* Engagement */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-5 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Heart size={14} />
              {item.engagement.likes.toLocaleString()}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <MessageCircle size={14} />
              {item.engagement.comments.toLocaleString()}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Repeat2 size={14} />
              {item.engagement.shares.toLocaleString()}
            </span>
          </div>

          <button
            type="button"
            aria-label="Share post"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-accent-soft hover:text-accent"
          >
            <Share2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
