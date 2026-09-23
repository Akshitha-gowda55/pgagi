import { baseApi } from "./baseApi";
import type {
  ContentCategory,
  UnifiedContentItem,
} from "@/types/content";

export interface NewsQueryParams {
  categories?: ContentCategory[];
  category?: ContentCategory;
  query?: string;
  page?: number;
  pageSize?: number;
}

export interface NewsFeedResponse {
  items: UnifiedContentItem[];
  page: number;
  hasMore: boolean;
  total: number;
}

export const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query<
      NewsFeedResponse,
      NewsQueryParams | void
    >({
      query: (params) => {
        const search = new URLSearchParams();

        const categories =
          params?.categories ??
          (params?.category
            ? [params.category]
            : undefined);

        if (categories?.length) {
          search.set(
            "categories",
            categories.join(","),
          );
        }

        if (params?.query) {
          search.set("query", params.query);
        }

        if (params?.page) {
          search.set(
            "page",
            String(params.page),
          );
        }

        if (params?.pageSize) {
          search.set(
            "pageSize",
            String(params.pageSize),
          );
        }

        const queryString =
          search.toString();

        return {
          url: queryString
            ? `/news?${queryString}`
            : "/news",
        };
      },

      providesTags: ["News"],
    }),
  }),
});

export const {
  useGetNewsQuery,
} = newsApi;
