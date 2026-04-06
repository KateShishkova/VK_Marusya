import { useMemo } from "react";
import { useGetMovieGenresQuery } from "@api/movieApi";
import { GENRES } from "@config/genres";
import type { Genre } from "@schemas/genre.schema";

export const useGenres = () => {
  const { data, isLoading, error, isError } = useGetMovieGenresQuery();

  const genres: Genre[] = useMemo(() => {
    if (!data) return [];

    return data
      .map((genreEn) => GENRES.find((genre) => genre.en === genreEn))
      .filter(Boolean) as Genre[];
  }, [data]);

  return { genres, isLoading, error, isError };
};
