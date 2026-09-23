import { baseApi } from "./baseApi";
import type { SocialQueryParams } from "@/types/social";
import type { UnifiedContentItem } from "@/types/content";

export interface SocialFeedResponse {
  items: UnifiedContentItem[];
  page: number;
  hasMore: boolean;
  total: number;
}

export const socialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSocial: builder.query<
      SocialFeedResponse,
      SocialQueryParams | void
    >({
      query: (params) => {
        const search = new URLSearchParams();

        if (params?.query) {
          search.set("query", params.query);
        }

        if (params?.page) {
          search.set("page", String(params.page));
        }

        if (params?.pageSize) {
          search.set("pageSize", String(params.pageSize));
        }

        const queryString = search.toString();

        return {
          url: queryString
            ? `/social?${queryString}`
            : "/social",
        };
      },

      providesTags: ["Social"],
    }),
  }),
});

export const {
  useGetSocialQuery,
} = socialApi;
