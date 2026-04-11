import clsx from "clsx";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { useGetMoviesQuery } from "@api/movieApi";
import { MovieList } from "@components/Movie/MovieList";
import { Button } from "@components/UI/Button";
import { Icon } from "@components/UI/Icon";
import { ListView } from "@components/UI/ListView";
import { PageView } from "@components/UI/PageView";
import { GENRES } from "@config/genres";
import { PATHS } from "@config/paths";
import { usePageRequestState } from "@hooks/usePageRequestState";
import { getRtkErrorMessage } from "@utils/getRtkErrorMessage";

import moviesStyles from "./GenreMovies.module.scss";

export const GenreMoviesPage = () => {
  const { genreEn } = useParams();
  const navigate = useNavigate();

  const genreObj = GENRES.find((genre) => genre.en === genreEn);

  if (!genreObj) {
    return <Navigate to={PATHS.NOT_FOUND} replace />;
  }

  const title = genreObj.ru;

  const {
    data: movies,
    isFetching: isMoviesFetching,
    isError: isMoviesError,
    error: moviesError,
    refetch: moviesRefetch,
  } = useGetMoviesQuery({ genre: genreEn });

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
      errorMessage: `Не удалось загрузить страницу со списком фильмов выбранного жанра (${title}).`,
    },
  );

  const pageContent = (
    <section className={clsx("section", moviesStyles.section)}>
      <div className="container">
        <div className={moviesStyles.section__wrapper}>
          <div className={moviesStyles.section__top}>
            <Button
              className={moviesStyles.section__back}
              kind="plain"
              aria-label="Вернуться назад"
              onClick={() => navigate(-1)}
            >
              <Icon name="arrow-back" />
            </Button>
            <h2 className={moviesStyles.section__title}>{title}</h2>
          </div>
          <ListView
            list={movies ?? []}
            isLoading={!movies && isMoviesFetching}
            error={isMoviesError ? getRtkErrorMessage(moviesError) : undefined}
            onRetry={moviesRefetch}
            renderList={(list) => <MovieList list={list} />}
          />
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
