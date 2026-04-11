import clsx from "clsx";

import { useGetFavoritesQuery } from "@api/favoritesApi";
import { MovieList } from "@components/Movie/MovieList";
import { ListView } from "@components/UI/ListView";
import { PageView } from "@components/UI/PageView";
import { useAuthModal } from "@hooks/useAuthModal";
import { useFavoriteMovie } from "@hooks/useFavoriteMovie";
import { usePageRequestState } from "@hooks/usePageRequestState";
import { getRtkErrorMessage } from "@utils/getRtkErrorMessage";

import moviesStyles from "./FavoriteMovies.module.scss";

export const ProfileFavoritesPage = () => {
  const {
    data: movies,
    isFetching: isMoviesFetching,
    isError: isMoviesError,
    error: moviesError,
    refetch: moviesRefetch,
  } = useGetFavoritesQuery();

  const { openAuthModal, AuthModal } = useAuthModal();
  const { handleDeleteFavorite, hasFavoriteError, hasAnyFavoriteErrors } =
    useFavoriteMovie(openAuthModal);

  const pageState = usePageRequestState(
    [
      {
        hasData: movies !== undefined,
        isFetching: isMoviesFetching,
        isError: isMoviesError,
        refetch: moviesRefetch,
      },
    ],
    {
      errorMessage:
        "Не удалось загрузить страницу со списком избранных фильмов.",
    },
  );

  const pageContent = (
    <section className={clsx("section", moviesStyles.section)}>
      <div className="container">
        <div className={moviesStyles.section__wrapper}>
          {hasAnyFavoriteErrors() && (
            <div className={moviesStyles.section__error}>
              Не удалось удалить один или несколько фильмов из избранного.
            </div>
          )}

          <ListView
            list={movies ?? []}
            isLoading={!movies && isMoviesFetching}
            error={isMoviesError ? getRtkErrorMessage(moviesError) : undefined}
            onRetry={moviesRefetch}
            renderList={(list) => (
              <MovieList
                list={list}
                kind="favorite"
                onRemoveFavorite={handleDeleteFavorite}
                hasFavoriteError={hasFavoriteError}
              />
            )}
          />

          {AuthModal}
        </div>
      </div>
    </section>
  );

  return (
    <PageView
      isLoading={pageState.isPageLoading}
      error={pageState.pageError}
      onRetry={pageState.retryAll}
    >
      {pageContent}
    </PageView>
  );
};
