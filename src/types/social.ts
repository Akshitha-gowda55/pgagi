import type { SocialContentItem } from "./content";

export interface SocialPost {
  id: string;
  username: string;
  handle: string;
  avatarUrl?: string;
  text: string;
  imageUrl?: string;
  hashtags: string[];
  publishedAt: string;
  likes: number;
  comments: number;
  shares: number;
}

export interface SocialQueryParams {
  query?: string;
  page?: number;
  pageSize?: number;
}

export interface NormalizedSocialPost extends SocialContentItem {
  type: "social";
}