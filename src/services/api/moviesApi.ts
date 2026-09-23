import { baseApi } from "./baseApi";

import type {
  MovieSearchParams,
} from "@/types/movie";

import type {
  UnifiedContentItem,
} from "@/types/content";

export interface MoviesFeedResponse {
  items: UnifiedContentItem[];
  page: number;
  hasMore: boolean;
  total: number;
}

export const moviesApi =
  baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getMovies: builder.query<
        MoviesFeedResponse,
        MovieSearchParams | void
      >({
        query: (params) => {
          const search =
            new URLSearchParams();

          if (params?.query) {
            search.set(
              "query",
              params.query,
            );
          }

          if (
            params?.categories &&
            params.categories.length > 0
          ) {
            search.set(
              "categories",
              params.categories.join(","),
            );
          }

          if (params?.page) {
            search.set(
              "page",
              String(params.page),
            );
          }

          const queryString =
            search.toString();

          return {
            url: queryString
              ? `/movies?${queryString}`
              : "/movies",
          };
        },

        providesTags: ["Movies"],
      }),
    }),
  });

export const {
  useGetMoviesQuery,
} = moviesApi;
