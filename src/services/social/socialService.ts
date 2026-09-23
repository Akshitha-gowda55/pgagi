import { mockSocialPosts } from "@/data/mockSocialPosts";
import type { SocialPost } from "@/types/social";

export interface SocialQuery {
  page?: number;
  pageSize?: number;
  query?: string;
}

export interface SocialPage {
  items: SocialPost[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export function getSocialPosts({
  page = 1,
  pageSize = 6,
  query = "",
}: SocialQuery = {}): SocialPage {
  const normalizedQuery = query.trim().toLowerCase();

  const filteredPosts = normalizedQuery
    ? mockSocialPosts.filter((post) => {
        const searchableText = [
          post.username,
          post.handle,
          post.text,
          ...post.hashtags,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedQuery);
      })
    : mockSocialPosts;

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const items = filteredPosts.slice(
    startIndex,
    endIndex,
  );

  return {
    items,
    page,
    pageSize,
    total: filteredPosts.length,
    hasMore: endIndex < filteredPosts.length,
  };
}
