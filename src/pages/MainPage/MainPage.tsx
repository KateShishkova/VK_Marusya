import { useGetRandomMovieQuery, useGetTop10MoviesQuery } from "@api/movieApi";
import { MovieBanner } from "@components/Movie/MovieBanner";
import { MovieList } from "@components/Movie/MovieList";
import { getRtkErrorMessage } from "@utils/getRtkErrorMessage";
import { ListView } from "@components/UI/ListView";
import { PageView } from "@components/UI/PageView";

import randomMovieStyles from "./RandomMovie.module.scss";
import topMoviesStyles from "./TopMovies.module.scss";
import clsx from "clsx";

export const MainPage = () => {
  const {
    data: randomMovie,
    isLoading: isRandomLoading,
    isError: isRandomError,
    error: randomError,
    isFetching: isRandomFetching,
    refetch: randomRefetch,
  } = useGetRandomMovieQuery();
  const {
    data: topMovies,
    isLoading: isTopMoviesLoading,
    isError: isTopMoviesError,
    error: topMoviesError,
  } = useGetTop10MoviesQuery();

  const pageContent = (
    <>
      {randomMovie && (
        <section className={clsx("section", randomMovieStyles.section)}>
          <div className="container">
            <MovieBanner
              movie={randomMovie}
              onRefetchMovie={randomRefetch}
              isFetching={isRandomFetching}
              fetchingError={
                isRandomError ? getRtkErrorMessage(randomError) : undefined
              }
            />
          </div>
        </section>
      )}

      {topMovies && (
        <section className={clsx("section", topMoviesStyles.section)}>
          <div className="container">
            <div className={topMoviesStyles.section__wrapper}>
              <h2 className={topMoviesStyles.section__title}>Топ 10 фильмов</h2>
              <ListView
                list={topMovies}
                renderList={(list) => <MovieList list={list} kind="rating" />}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );

  return (
    <PageView
      isLoading={isRandomLoading || isTopMoviesLoading}
      isError={isRandomError && isTopMoviesError}
      error={`${getRtkErrorMessage(randomError)} ${getRtkErrorMessage(topMoviesError)}`}
    >
      {pageContent}
    </PageView>
  );
};
