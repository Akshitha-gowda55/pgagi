import type { ContentCategory, NewsContentItem } from "./content";

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface NewsQueryParams {
  category?: ContentCategory;
  query?: string;
  page?: number;
  pageSize?: number;
}

export interface NormalizedNewsArticle extends NewsContentItem {
  type: "news";
}