import type {
  ContentCategory,
  ContentType,
} from "@/types/content";

export const APP_NAME = "PulseFeed";

export const CONTENT_CATEGORIES: {
  value: ContentCategory;
  label: string;
}[] = [
  {
    value: "technology",
    label: "Technology",
  },
  {
    value: "business",
    label: "Business",
  },
  {
    value: "sports",
    label: "Sports",
  },
  {
    value: "entertainment",
    label: "Entertainment",
  },
  {
    value: "science",
    label: "Science",
  },
  {
    value: "health",
    label: "Health",
  },
  {
    value: "finance",
    label: "Finance",
  },
  {
    value: "travel",
    label: "Travel",
  },
];

export const CONTENT_TYPES: {
  value: ContentType;
  label: string;
}[] = [
  {
    value: "news",
    label: "News",
  },
  {
    value: "movie",
    label: "Movies",
  },
  {
    value: "social",
    label: "Social",
  },
];

export const DEFAULT_PREFERENCES = {
  categories: [
    "technology",
    "business",
    "entertainment",
  ] as ContentCategory[],

  contentTypes: [
    "news",
    "movie",
    "social",
  ] as ContentType[],

  darkMode: false,
};

export const PAGINATION = {
  PAGE_SIZE: 10,
  SEARCH_DEBOUNCE_MS: 400,
};

export const STORAGE_KEYS = {
  PREFERENCES: "pulsefeed-preferences",
  FAVORITES: "pulsefeed-favorites",
  FEED_ORDER: "pulsefeed-feed-order",
};