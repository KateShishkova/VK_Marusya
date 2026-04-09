import { useState } from "react";
import { useSelector } from "react-redux";

import {
  useDeleteFavoriteMovieMutation,
  usePostFavoriteMovieMutation,
} from "@api/favoritesApi";
import type { MovieId } from "@api/types";
import type { RootState } from "@store/store";
import { getRtkErrorMessage } from "@utils/getRtkErrorMessage";

type FavoriteErrors = Partial<Record<MovieId, string>>;

export const useFavoriteMovie = (onAuthRequired: () => void) => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const favorites =
    useSelector((state: RootState) => state.user.user?.favorites) || [];

  const [postFavoriteMovie] = usePostFavoriteMovieMutation();
  const [deleteFavoriteMovie] = useDeleteFavoriteMovieMutation();

  const [errors, setErrors] = useState<FavoriteErrors>({});

  // Internal methods
  const clearError = (movieId: MovieId) => {
    setErrors((prev) => {
      if (!prev[movieId]) {
        return prev;
      }

      const next = { ...prev };
      delete next[movieId];
      return next;
    });
  };

  const setFavoriteError = (
    movieId: MovieId,
    error: unknown,
    message: string,
  ) => {
    setErrors((prev) => ({
      ...prev,
      [movieId]: getRtkErrorMessage(error, message),
    }));
  };

  const checkAuth = () => {
    if (!isAuth) {
      onAuthRequired?.();
      return false;
    }

    return true;
  };

  // External methods
  const isFavorite = (movieId: MovieId) => {
    return favorites.includes(movieId);
  };

  const hasFavoriteError = (movieId: MovieId) => {
    return Boolean(errors[movieId]);
  };

  const hasAnyFavoriteErrors = () => {
    return Object.keys(errors).length > 0;
  };

  const getFavoriteError = (movieId: MovieId) => {
    return errors[movieId];
  };

  const handleAddFavorite = async (movieId: MovieId) => {
    clearError(movieId);

    if (!checkAuth()) return;

    try {
      await postFavoriteMovie({ id: movieId }).unwrap();
    } catch (error) {
      setFavoriteError(
        movieId,
        error,
        "Ошибка при добавлении фильма в избранное.",
      );
    }
  };

  const handleDeleteFavorite = async (movieId: MovieId) => {
    clearError(movieId);

    if (!checkAuth()) return;

    try {
      await deleteFavoriteMovie(movieId).unwrap();
    } catch (error) {
      setFavoriteError(
        movieId,
        error,
        "Ошибка при удалении фильма из избранного.",
      );
    }
  };

  const handleToggleFavorite = async (movieId: MovieId) => {
    isFavorite(movieId)
      ? await handleDeleteFavorite(movieId)
      : await handleAddFavorite(movieId);
  };

  return {
    isFavorite,
    hasFavoriteError,
    hasAnyFavoriteErrors,
    getFavoriteError,
    handleAddFavorite,
    handleDeleteFavorite,
    handleToggleFavorite,
  };
};
