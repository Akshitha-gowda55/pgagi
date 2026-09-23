import {
  NextRequest,
  NextResponse,
} from "next/server";

import type {
  ContentCategory,
  NewsContentItem,
} from "@/types/content";

import type {
  NewsApiResponse,
} from "@/types/news";

const PAGE_SIZE = 10;

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

function normalizeNewsArticle(
  article: NewsApiResponse["articles"][number],
  category: ContentCategory,
  index: number,
): NewsContentItem {
  return {
    id: `news-${article.url}-${index}`,
    type: "news",
    title: article.title,
    description:
      article.description ??
      undefined,
    imageUrl:
      article.urlToImage ??
      undefined,
    category,
    publishedAt:
      article.publishedAt,
    isFavorite: false,
    source:
      article.source.name,
    author:
      article.author ??
      undefined,
    url: article.url,
  };
}

function parseCategories(
  value: string | null,
): ContentCategory[] {
  if (!value) {
    return ["technology"];
  }

  const categories = value
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

  return categories.length > 0
    ? categories
    : ["technology"];
}

export async function GET(
  request: NextRequest,
) {
  try {
    const params =
      request.nextUrl.searchParams;

    const categories =
      parseCategories(
        params.get("categories") ??
          params.get("category"),
      );

    const query =
      params.get("query")?.trim() ??
      "";

    const page = Math.max(
      1,
      Number(
        params.get("page") ?? "1",
      ),
    );

    const pageSize = Math.max(
      1,
      Math.min(
        20,
        Number(
          params.get("pageSize") ??
            PAGE_SIZE,
        ),
      ),
    );

    const apiKey =
      process.env.NEWS_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        items: [],
        page,
        hasMore: false,
        total: 0,
        message:
          "NEWS_API_KEY is not configured. Add it to .env.local.",
      });
    }

    /*
     * Search is handled through NewsAPI's
     * everything endpoint because a search term
     * should not be restricted to one category.
     */
    if (query) {
      const url = new URL(
        "https://newsapi.org/v2/everything",
      );

      url.searchParams.set(
        "apiKey",
        apiKey,
      );

      url.searchParams.set(
        "q",
        query,
      );

      url.searchParams.set(
        "page",
        String(page),
      );

      url.searchParams.set(
        "pageSize",
        String(pageSize),
      );

      url.searchParams.set(
        "language",
        "en",
      );

      url.searchParams.set(
        "sortBy",
        "publishedAt",
      );

      const response =
        await fetch(
          url.toString(),
          {
            next: {
              revalidate: 300,
            },
          },
        );

      if (!response.ok) {
        throw new Error(
          `NewsAPI returned ${response.status}`,
        );
      }

      const data =
        (await response.json()) as NewsApiResponse;

      const items =
        data.articles.map(
          (article, index) =>
            normalizeNewsArticle(
              article,
              categories[0],
              index,
            ),
        );

      return NextResponse.json({
        items,
        page,
        hasMore:
          page * pageSize <
          data.totalResults,
        total:
          data.totalResults,
      });
    }

    /*
     * For personalized browsing,
     * request each selected interest.
     */
    const categoryResults =
      await Promise.all(
        categories.map(
          async (category) => {
            const url = new URL(
              "https://newsapi.org/v2/top-headlines",
            );

            url.searchParams.set(
              "apiKey",
              apiKey,
            );

            url.searchParams.set(
              "country",
              "us",
            );

            url.searchParams.set(
              "category",
              category,
            );

            url.searchParams.set(
              "page",
              String(page),
            );

            /*
             * Request fewer articles per
             * category and merge them below.
             */
            const categoryPageSize =
              Math.max(
                1,
                Math.ceil(
                  pageSize /
                    categories.length,
                ) + 2,
              );

            url.searchParams.set(
              "pageSize",
              String(
                categoryPageSize,
              ),
            );

            const response =
              await fetch(
                url.toString(),
                {
                  next: {
                    revalidate: 300,
                  },
                },
              );

            if (!response.ok) {
              throw new Error(
                `NewsAPI returned ${response.status} for ${category}`,
              );
            }

            const data =
              (await response.json()) as NewsApiResponse;

            return {
              category,
              data,
            };
          },
        ),
      );

    /*
     * Deduplicate using article URL.
     */
    const seenUrls =
      new Set<string>();

    const mergedItems: NewsContentItem[] =
      [];

    for (const result of categoryResults) {
      for (
        const [
          index,
          article,
        ] of result.data.articles.entries()
      ) {
        if (
          !article.url ||
          seenUrls.has(article.url)
        ) {
          continue;
        }

        seenUrls.add(
          article.url,
        );

        mergedItems.push(
          normalizeNewsArticle(
            article,
            result.category,
            index,
          ),
        );
      }
    }

    /*
     * Newest articles first.
     */
    mergedItems.sort(
      (a, b) =>
        new Date(
          b.publishedAt,
        ).getTime() -
        new Date(
          a.publishedAt,
        ).getTime(),
    );

    const items =
      mergedItems.slice(
        0,
        pageSize,
      );

    const total =
      categoryResults.reduce(
        (sum, result) =>
          sum +
          result.data.totalResults,
        0,
      );

    const hasMore =
      categoryResults.some(
        (result) =>
          result.data.articles.length >
          0,
      );

    return NextResponse.json({
      items,
      page,
      hasMore,
      total,
    });
  } catch (error) {
    console.error(
      "News API error:",
      error,
    );

    return NextResponse.json(
      {
        message:
          "Failed to load news",
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
