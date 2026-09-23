import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  moviesApi,
  type MoviesFeedResponse,
} from "./moviesApi";

import { store } from "@/store/store";

import type {
  MovieContentItem,
} from "@/types/content";

function createMovie(
  id: string,
): MovieContentItem {
  return {
    id,
    type: "movie",
    title: `Movie ${id}`,
    description:
      "Test movie",
    publishedAt:
      "2026-09-23",
    isFavorite: false,
    rating: 8.1,
    genres: [
      "Genre 878",
    ],
    releaseDate:
      "2026-09-23",
    voteCount: 100,
  };
}

describe("moviesApi", () => {
  afterEach(() => {
    vi.restoreAllMocks();

    store.dispatch(
      moviesApi.util.resetApiState(),
    );
  });

  it("requests movies using personalized categories", async () => {
    const response: MoviesFeedResponse = {
      items: [
        createMovie("1"),
        createMovie("2"),
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
        moviesApi.endpoints.getMovies.initiate({
          query: "",
          categories: [
            "technology",
            "science",
          ],
          page: 1,
        }),
      );

    const result =
      await promise.unwrap();

    expect(
      result.items,
    ).toHaveLength(2);

    const request = fetchMock.mock.calls[0]?.[0];

    const requestUrl =
      request instanceof Request
        ? request.url
        : String(request);

    expect(
      requestUrl,
    ).toContain(
      "/api/movies",
    );

    expect(
      requestUrl,
    ).toContain(
      "categories=technology%2Cscience",
    );

    expect(
      requestUrl,
    ).toContain(
      "page=1",
    );

    promise.unsubscribe();
  });

  it("preserves an explicit movie search query", async () => {
    const response: MoviesFeedResponse = {
      items: [
        createMovie("search-1"),
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
        moviesApi.endpoints.getMovies.initiate({
          query: "Dune",
          categories: [
            "technology",
          ],
          page: 2,
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
      "query=Dune",
    );

    expect(
      requestUrl,
    ).toContain(
      "categories=technology",
    );

    expect(
      requestUrl,
    ).toContain(
      "page=2",
    );

    promise.unsubscribe();
  });
});
