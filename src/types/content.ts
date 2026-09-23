export type ContentType = "news" | "movie" | "social";

export type ContentCategory =
  | "technology"
  | "business"
  | "sports"
  | "entertainment"
  | "science"
  | "health"
  | "finance"
  | "travel";

export interface BaseContentItem {
  id: string;
  type: ContentType;
  title: string;
  description?: string;
  imageUrl?: string;
  category?: ContentCategory;
  publishedAt: string;
  isFavorite: boolean;
}

export interface NewsContentItem extends BaseContentItem {
  type: "news";
  source: string;
  author?: string;
  url: string;
}

export interface MovieContentItem extends BaseContentItem {
  type: "movie";
  rating: number;
  genres: string[];
  releaseDate?: string;
  voteCount?: number;
}

export interface SocialContentItem extends BaseContentItem {
  type: "social";
  username: string;
  handle: string;
  avatarUrl?: string;
  hashtags: string[];
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export type UnifiedContentItem =
  | NewsContentItem
  | MovieContentItem
  | SocialContentItem;