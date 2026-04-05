import type { MovieId } from "@api/types";
import { useSelector } from "react-redux";
import type { RootState } from "@store/store";
import {
  useDeleteFavoriteMovieMutation,
  usePostFavoriteMovieMutation,
} from "@api/favoritesApi";
import { useEffect, useState } from "react";
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

  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setError(undefined);
  }, [movieId]);

  const isFavorite = favorites.includes(String(movieId));

  const handleToggleFavorite = async () => {
    setError(undefined);

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
      setError(
        getRtkErrorMessage(
          error,
          "Ошибка при изменении списка избранных фильмов",
        ),
      );
    }
  };

  return { isFavorite, handleToggleFavorite, error };
};
