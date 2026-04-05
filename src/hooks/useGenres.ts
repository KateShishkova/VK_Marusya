import { useGetMovieGenresQuery } from "@api/movieApi";
import { GENRES } from "@config/genres";
import type { TGenre } from "@schemas/genre.schema";
import { useMemo } from "react";

export const useGenres = () => {
  const { data, isLoading, error, isError } = useGetMovieGenresQuery();

  const genres: TGenre[] = useMemo(() => {
    if (!data) return [];

    return data
      .map((genreEn) => GENRES.find((genre) => genre.en === genreEn))
      .filter(Boolean) as TGenre[];
  }, [data]);

  return { genres, isLoading, error, isError };
};
