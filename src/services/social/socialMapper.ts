import type {
  UnifiedContentItem,
  SocialContentItem,
} from "@/types/content";
import type { SocialPost } from "@/types/social";

export function mapSocialPost(
  post: SocialPost,
): SocialContentItem {
  return {
    id: post.id,
    type: "social",
    title: `${post.username} ${post.handle}`,
    description: post.text,
    imageUrl: post.imageUrl,
    publishedAt: post.publishedAt,
    isFavorite: false,
    username: post.username,
    handle: post.handle,
    avatarUrl: post.avatarUrl,
    hashtags: post.hashtags,
    engagement: {
      likes: post.likes,
      comments: post.comments,
      shares: post.shares,
    },
  };
}

export function mapSocialPosts(
  posts: SocialPost[],
): UnifiedContentItem[] {
  return posts.map(mapSocialPost);
}
