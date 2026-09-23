import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ContentCard } from "./ContentCard";
import { renderWithRedux } from "@/test/test-utils";

import type {
  MovieContentItem,
  NewsContentItem,
  SocialContentItem,
} from "@/types/content";

const newsItem: NewsContentItem = {
  id: "news-1",
  type: "news",
  title: "New Technology Trends in 2026",
  description:
    "The latest technology developments and innovations.",
  imageUrl:
    "https://images.unsplash.com/photo-1518770660439-4636190af475",
  category: "technology",
  publishedAt: "2026-09-23T10:00:00.000Z",
  isFavorite: false,
  source: "Tech News",
  author: "Test Author",
  url: "https://example.com/news",
};

const movieItem: MovieContentItem = {
  id: "movie-1",
  type: "movie",
  title: "The Technology Journey",
  description:
    "A fictional movie for component testing.",
  imageUrl:
    "https://image.tmdb.org/t/p/w500/test.jpg",
  category: "entertainment",
  publishedAt: "2026-09-23T10:00:00.000Z",
  isFavorite: false,
  rating: 8.2,
  genres: ["Drama", "Science Fiction"],
  releaseDate: "2026-09-20",
  voteCount: 1200,
};

const socialItem: SocialContentItem = {
  id: "social-1",
  type: "social",
  title: "Farmers technology post",
  description:
    "Technology is changing modern agriculture.",
  imageUrl:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
  category: "technology",
  publishedAt: "2026-09-23T10:00:00.000Z",
  isFavorite: false,
  username: "Test User",
  handle: "@testuser",
  hashtags: ["technology", "farming"],
  engagement: {
    likes: 120,
    comments: 25,
    shares: 10,
  },
};

describe("ContentCard", () => {
  it("renders a news card", () => {
    renderWithRedux(
      <ContentCard item={newsItem} />,
    );

    expect(
      screen.getByText("New Technology Trends in 2026"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Tech News"),
    ).toBeInTheDocument();
  });

  it("renders a movie card", () => {
    renderWithRedux(
      <ContentCard item={movieItem} />,
    );

    expect(
      screen.getByText("The Technology Journey"),
    ).toBeInTheDocument();
  });

  it("renders a social card", () => {
    renderWithRedux(
      <ContentCard item={socialItem} />,
    );

    expect(
      screen.getByText(
        "Technology is changing modern agriculture.",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText("@testuser"),
    ).toBeInTheDocument();
  });
});