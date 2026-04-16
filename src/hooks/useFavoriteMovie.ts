import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import {
  useDeleteFavoriteMovieMutation,
  usePostFavoriteMovieMutation,
} from "@api/favoritesApi";
import type { MovieId } from "@api/types";
import type { RootState } from "@store/store";
import { getRtkErrorMessage } from "@utils/getRtkErrorMessage";

type FavoriteErrors = Partial<Record<MovieId, string>>;

export const useFavoriteMovie = (onAuthRequired?: () => void) => {
  const { isAuth, authStatus } = useSelector((state: RootState) => state.user);
  const favorites =
    useSelector((state: RootState) => state.user.user?.favorites) || [];

  const [postFavoriteMovie] = usePostFavoriteMovieMutation();
  const [deleteFavoriteMovie] = useDeleteFavoriteMovieMutation();

  const [errors, setErrors] = useState<FavoriteErrors>({});

  const isAuthPending = authStatus === "loading";

  // Internal methods
  const clearError = useCallback((movieId: MovieId) => {
    setErrors((prev) => {
      if (!prev[movieId]) {
        return prev;
      }

      const next = { ...prev };
      delete next[movieId];
      return next;
    });
  }, []);

  const setFavoriteError = useCallback(
    (movieId: MovieId, error: unknown, message: string) => {
      setErrors((prev) => ({
        ...prev,
        [movieId]: getRtkErrorMessage(error, message),
      }));
    },
    [],
  );

  const checkAuth = useCallback(() => {
    if (isAuthPending) {
      return false;
    }

    if (!isAuth) {
      onAuthRequired?.();
      return false;
    }

    return true;
  }, [isAuthPending, isAuth, onAuthRequired]);

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

  const handleAddFavorite = useCallback(
    async (movieId: MovieId) => {
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
    },
    [clearError, checkAuth, postFavoriteMovie, setFavoriteError],
  );

  const handleDeleteFavorite = useCallback(
    async (movieId: MovieId) => {
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
    },
    [clearError, checkAuth, deleteFavoriteMovie, setFavoriteError],
  );

  const handleToggleFavorite = async (movieId: MovieId) => {
    if (isFavorite(movieId)) {
      await handleDeleteFavorite(movieId);
    } else {
      await handleAddFavorite(movieId);
    }
  };

  return {
    isAuthPending,
    isFavorite,
    hasFavoriteError,
    hasAnyFavoriteErrors,
    getFavoriteError,
    handleAddFavorite,
    handleDeleteFavorite,
    handleToggleFavorite,
  };
};
