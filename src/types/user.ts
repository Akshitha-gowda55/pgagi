import type {
  ContentCategory,
  ContentType,
  UnifiedContentItem,
} from "./content";

export interface UserPreferences {
  categories: ContentCategory[];
  contentTypes: ContentType[];
  darkMode: boolean;
}

export interface FavoriteItem {
  contentId: string;
  contentType: ContentType;
  addedAt: string;
  item?: UnifiedContentItem;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
}