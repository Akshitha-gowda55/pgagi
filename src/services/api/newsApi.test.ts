import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  newsApi,
  type NewsFeedResponse,
} from "./newsApi";

import { store } from "@/store/store";

import type {
  NewsContentItem,
} from "@/types/content";

function createNewsItem(
  id: string,
  category: NewsContentItem["category"],
): NewsContentItem {
  return {
    id,
    type: "news",
    title: `News ${id}`,
    description: "Test article",
    publishedAt:
      "2026-09-23T10:00:00.000Z",
    isFavorite: false,
    category,
    source: "Test Source",
    url: `https://example.com/${id}`,
  };
}

describe("newsApi", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    store.dispatch(
      newsApi.util.resetApiState(),
    );
  });

  it("requests multiple personalized categories", async () => {
    const response: NewsFeedResponse = {
      items: [
        createNewsItem(
          "1",
          "technology",
        ),
        createNewsItem(
          "2",
          "business",
        ),
      ],
      page: 1,
      hasMore: true,
      total: 2,
    };

    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        new Response(
          JSON.stringify(response),
          {
            status: 200,
            headers: {
              "Content-Type":
                "application/json",
            },
          },
        ),
      );

    const promise =
      store.dispatch(
        newsApi.endpoints.getNews.initiate({
          categories: [
            "technology",
            "business",
            "entertainment",
          ],
          page: 1,
          pageSize: 6,
        }),
      );

    const result =
      await promise.unwrap();

    expect(
      result.items,
    ).toHaveLength(2);

    expect(
      result.items[0]?.category,
    ).toBe("technology");

    expect(
      fetchMock,
    ).toHaveBeenCalledTimes(1);

    const request = fetchMock.mock.calls[0]?.[0];

    const requestUrl =
      request instanceof Request
        ? request.url
        : String(request);

    expect(
      requestUrl,
    ).toContain(
      "/api/news",
    );

    expect(
      requestUrl,
    ).toContain(
      "categories=technology%2Cbusiness%2Centertainment",
    );

    expect(
      requestUrl,
    ).toContain(
      "page=1",
    );

    expect(
      requestUrl,
    ).toContain(
      "pageSize=6",
    );

    promise.unsubscribe();
  });

  it("sends search queries to the news endpoint", async () => {
    const response: NewsFeedResponse = {
      items: [
        createNewsItem(
          "search-1",
          "technology",
        ),
      ],
      page: 1,
      hasMore: false,
      total: 1,
    };

    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        new Response(
          JSON.stringify(response),
          {
            status: 200,
            headers: {
              "Content-Type":
                "application/json",
            },
          },
        ),
      );

    const promise =
      store.dispatch(
        newsApi.endpoints.getNews.initiate({
          categories: [
            "technology",
            "science",
          ],
          query:
            "artificial intelligence",
          page: 2,
          pageSize: 6,
        }),
      );

    const result =
      await promise.unwrap();

    expect(
      result.items,
    ).toHaveLength(1);

    const request = fetchMock.mock.calls[0]?.[0];

    const requestUrl =
      request instanceof Request
        ? request.url
        : String(request);

    expect(
      requestUrl,
    ).toContain(
      "query=artificial+intelligence",
    );

    expect(
      requestUrl,
    ).toContain(
      "categories=technology%2Cscience",
    );

    expect(
      requestUrl,
    ).toContain(
      "page=2",
    );

    promise.unsubscribe();
  });
});
