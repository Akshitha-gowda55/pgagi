import type { ContentCategory } from "@/types/content";

/*
 * TMDB genre IDs:
 *
 * 18  = Drama
 * 35  = Comedy
 * 53  = Thriller
 * 99  = Documentary
 * 878 = Science Fiction
 * 12  = Adventure
 * 14  = Fantasy
 * 10751 = Family
 * 9648 = Mystery
 * 28  = Action
 *
 * These mappings are product choices used by PulseFeed
 * to translate broad user interests into movie genres.
 */

export const CATEGORY_TO_TMDB_GENRES: Record<
  ContentCategory,
  number[]
> = {
  technology: [878, 99],
  business: [18, 99],
  sports: [18, 99],
  entertainment: [35, 14, 12],
  science: [878, 99],
  health: [18, 99],
  finance: [18, 99],
  travel: [12, 99],
};

export function getMovieGenreIds(
  categories: ContentCategory[],
): number[] {
  const genreIds = new Set<number>();

  for (const category of categories) {
    const mappedGenres =
      CATEGORY_TO_TMDB_GENRES[category] ?? [];

    for (const genreId of mappedGenres) {
      genreIds.add(genreId);
    }
  }

  /*
   * Keep the request useful even if the user
   * hasn't selected any interests.
   */
  if (genreIds.size === 0) {
    return [
      12,
      14,
      18,
      35,
      878,
      99,
    ];
  }

  return Array.from(genreIds);
}
