import { useState } from "react";
import { useSelector } from "react-redux";

import {
  useDeleteFavoriteMovieMutation,
  usePostFavoriteMovieMutation,
} from "@api/favoritesApi";
import type { MovieId } from "@api/types";
import type { RootState } from "@store/store";
import { getRtkErrorMessage } from "@utils/getRtkErrorMessage";

export const useFavoriteMovie = (
  movieId: MovieId,
  onAuthRequired: () => void,
) => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const favorites =
    useSelector((state: RootState) => state.user.user?.favorites) || [];

  const [postFavoriteMovie] = usePostFavoriteMovieMutation();
  const [deleteFavoriteMovie] = useDeleteFavoriteMovieMutation();

  const [errorMovieId, setErrorMovieId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const isFavorite = favorites.includes(String(movieId));
  const error = errorMovieId === String(movieId) ? errorMessage : undefined;

  const handleToggleFavorite = async () => {
    setErrorMovieId(null);
    setErrorMessage(undefined);

    if (!isAuth) {
      onAuthRequired();
      return;
    }

    try {
      if (isFavorite) {
        await deleteFavoriteMovie(String(movieId)).unwrap();
      } else {
        await postFavoriteMovie({ id: String(movieId) }).unwrap();
      }
    } catch (error) {
      setErrorMovieId(String(movieId));
      setErrorMessage(
        getRtkErrorMessage(
          error,
          "Ошибка при изменении списка избранных фильмов",
        ),
      );
    }
  };

  return { isFavorite, handleToggleFavorite, error };
};
