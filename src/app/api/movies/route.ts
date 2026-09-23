import {
  NextRequest,
  NextResponse,
} from "next/server";

import type {
  ContentCategory,
  MovieContentItem,
} from "@/types/content";

import type {
  TMDBMovie,
  TMDBResponse,
} from "@/types/movie";

import {
  getMovieGenreIds,
} from "@/lib/personalization";

const TMDB_IMAGE_BASE =
  "https://image.tmdb.org/t/p/w500";

const VALID_CATEGORIES: ContentCategory[] = [
  "technology",
  "business",
  "sports",
  "entertainment",
  "science",
  "health",
  "finance",
  "travel",
];

function normalizeMovie(
  movie: TMDBMovie,
): MovieContentItem {
  return {
    id: `movie-${movie.id}`,
    type: "movie",
    title: movie.title,
    description:
      movie.overview || undefined,
    imageUrl: movie.poster_path
      ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
      : undefined,
    publishedAt:
      movie.release_date ||
      new Date().toISOString(),
    isFavorite: false,
    rating: movie.vote_average,
    genres: movie.genre_ids.map(
      (id) => `Genre ${id}`,
    ),
    releaseDate:
      movie.release_date ||
      undefined,
    voteCount:
      movie.vote_count,
  };
}

function parseCategories(
  value: string | null,
): ContentCategory[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((category) =>
      category.trim(),
    )
    .filter(
      (category): category is ContentCategory =>
        VALID_CATEGORIES.includes(
          category as ContentCategory,
        ),
    );
}

export async function GET(
  request: NextRequest,
) {
  try {
    const params =
      request.nextUrl.searchParams;

    const query =
      params.get("query")?.trim() ??
      "";

    const categories =
      parseCategories(
        params.get("categories"),
      );

    const page = Math.max(
      1,
      Number(
        params.get("page") ?? "1",
      ),
    );

    const apiKey =
      process.env.TMDB_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        items: [],
        page,
        hasMore: false,
        total: 0,
        message:
          "TMDB_API_KEY is not configured. Add it to .env.local.",
      });
    }

    /*
     * Search mode:
     *
     * Search terms take priority because the
     * user explicitly asked for that content.
     */
    const endpoint = query
      ? "https://api.themoviedb.org/3/search/movie"
      : "https://api.themoviedb.org/3/discover/movie";

    const url = new URL(endpoint);

    url.searchParams.set(
      "api_key",
      apiKey,
    );

    url.searchParams.set(
      "page",
      String(page),
    );

    url.searchParams.set(
      "language",
      "en-US",
    );

    if (query) {
      url.searchParams.set(
        "query",
        query,
      );
    } else {
      const genreIds =
        getMovieGenreIds(
          categories,
        );

      url.searchParams.set(
        "with_genres",
        genreIds.join("|"),
      );

      url.searchParams.set(
        "sort_by",
        "popularity.desc",
      );

      url.searchParams.set(
        "include_adult",
        "false",
      );

      url.searchParams.set(
        "vote_count.gte",
        "20",
      );
    }

    const response =
      await fetch(
        url.toString(),
        {
          next: {
            revalidate: 600,
          },
        },
      );

    if (!response.ok) {
      throw new Error(
        `TMDB returned ${response.status}`,
      );
    }

    const data =
      (await response.json()) as TMDBResponse;

    const items =
      data.results.map(
        normalizeMovie,
      );

    return NextResponse.json({
      items,
      page: data.page,
      hasMore:
        data.page <
        data.total_pages,
      total:
        data.total_results,
    });
  } catch (error) {
    console.error(
      "Movies API error:",
      error,
    );

    return NextResponse.json(
      {
        message:
          "Failed to load movies",
        items: [],
        page: 1,
        hasMore: false,
        total: 0,
      },
      {
        status: 500,
      },
    );
  }
}
