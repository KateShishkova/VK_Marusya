import { useGetRandomMovieQuery, useGetTop10MoviesQuery } from "@api/movieApi";
import { MovieBanner } from "@components/Movie/MovieBanner";
import { MovieList } from "@components/Movie/MovieList";
import { getRtkErrorMessage } from "@utils/getRtkErrorMessage";
import { ListView } from "@components/UI/ListView";
import { PageView } from "@components/UI/PageView";
import { ErrorView } from "@components/UI/ErrorView";
import { usePageRequestState } from "@hooks/usePageRequestState";

import clsx from "clsx";
import randomMovieStyles from "./RandomMovie.module.scss";
import topMoviesStyles from "./TopMovies.module.scss";

export const MainPage = () => {
  const {
    data: randomMovie,
    isFetching: isRandomFetching,
    isError: isRandomError,
    error: randomError,
    refetch: randomRefetch,
  } = useGetRandomMovieQuery();
  const {
    data: topMovies,
    isFetching: isTopMoviesFetching,
    isError: isTopMoviesError,
    error: topMoviesError,
    refetch: topMoviesRefetch,
  } = useGetTop10MoviesQuery();

  const pageState = usePageRequestState(
    [
      {
        hasData: randomMovie !== undefined,
        isFetching: isRandomFetching,
        isError: isRandomError,
        refetch: randomRefetch,
      },
      {
        hasData: topMovies !== undefined,
        isFetching: isTopMoviesFetching,
        isError: isTopMoviesError,
        refetch: topMoviesRefetch,
      },
    ],
    {
      errorMessage: "Не удалось загрузить главную страницу.",
    },
  );

  const pageContent = (
    <>
      <section className={clsx("section", randomMovieStyles.section)}>
        <div className="container">
          {randomMovie ? (
            <MovieBanner
              movie={randomMovie}
              onRefetchMovie={randomRefetch}
              isFetching={isRandomFetching}
            />
          ) : (
            isRandomError && (
              <ErrorView
                kind="section"
                message={getRtkErrorMessage(randomError)}
                onRetry={randomRefetch}
              />
            )
          )}
        </div>
      </section>

      <section className={clsx("section", topMoviesStyles.section)}>
        <div className="container">
          <div className={topMoviesStyles.section__wrapper}>
            <h2 className={topMoviesStyles.section__title}>Топ 10 фильмов</h2>
            <ListView
              list={topMovies ?? []}
              isLoading={!topMovies && isTopMoviesFetching}
              error={
                isTopMoviesError
                  ? getRtkErrorMessage(topMoviesError)
                  : undefined
              }
              onRetry={topMoviesRefetch}
              renderList={(list) => <MovieList list={list} kind="rating" />}
            />
          </div>
        </div>
      </section>
    </>
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
