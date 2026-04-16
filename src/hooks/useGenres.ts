import { useGetMovieGenresQuery } from "@api/movieApi";
import { GENRES } from "@config/genres";
import type { Genre } from "@schemas/genre.schema";

export const useGenres = () => {
  const { data, isLoading, isFetching, error, isError, refetch } =
    useGetMovieGenresQuery();

  const genres: Genre[] = !data
    ? []
    : (data
        .map((genreEn) => GENRES.find((genre) => genre.en === genreEn))
        .filter(Boolean) as Genre[]);

  return { genres, isLoading, isFetching, error, isError, refetch };
};
