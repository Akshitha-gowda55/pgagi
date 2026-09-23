import type {
  ContentCategory,
  MovieContentItem,
} from "./content";

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
}

export interface TMDBResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

export interface MovieSearchParams {
  query: string;
  page?: number;
  categories?: ContentCategory[];
}

export interface NormalizedMovie
  extends MovieContentItem {
  type: "movie";
}
