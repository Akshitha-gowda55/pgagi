import type { UnifiedContentItem } from "./content";

export type RequestStatus =
  | "idle"
  | "loading"
  | "succeeded"
  | "failed";

export interface FeedState {
  items: UnifiedContentItem[];
  orderedIds: string[];

  page: number;
  hasMore: boolean;

  status: RequestStatus;
  error: string | null;
  lastUpdated: string | null;
}

export interface SearchState {
  query: string;
  results: UnifiedContentItem[];
  status: RequestStatus;
  error: string | null;
}