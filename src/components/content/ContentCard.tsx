import type { UnifiedContentItem } from "@/types/content";
import { NewsCard } from "./NewsCard";
import { MovieCard } from "./MovieCard";
import { SocialCard } from "./SocialCard";

interface ContentCardProps {
  item: UnifiedContentItem;
}

export function ContentCard({
  item,
}: ContentCardProps) {
  switch (item.type) {
    case "news":
      return <NewsCard item={item} />;

    case "movie":
      return <MovieCard item={item} />;

    case "social":
      return <SocialCard item={item} />;

    default:
      return null;
  }
}
