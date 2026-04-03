import { useGetRandomMovieQuery, useGetTop10MoviesQuery } from "@api/movieApi";
import { MovieBanner } from "@components/Movie/MovieBanner";
import { MovieList } from "@components/Movie/MovieList";
import { Loader } from "@components/UI/Loader";
import mainPageStyles from "./MainPage.module.scss";
import randomMovieStyles from "./RandomMovie.module.scss";
import topMoviesStyles from "./TopMovies.module.scss";
import clsx from "clsx";
import { ErrorView } from "@components/UI/ErrorView";
import { getRtkErrorMessage } from "@utils/getRtkErrorMessage";

export const MainPage = () => {
  const {
    data: randomMovie,
    isLoading: isRandomLoading,
    isError: isRandomError,
    error: randomError,
    refetch: randomRefetch,
  } = useGetRandomMovieQuery();
  const {
    data: topMovies,
    isLoading: isTopMoviesLoading,
    isError: isTopMoviesError,
    error: topMoviesError,
  } = useGetTop10MoviesQuery();

  if (isRandomLoading || isTopMoviesLoading) {
    return (
      <section className={mainPageStyles.section}>
        <div className={clsx("container", mainPageStyles.section__container)}>
          <Loader />
        </div>
      </section>
    );
  }

  if (isRandomError && isTopMoviesError) {
    return (
      <section className={mainPageStyles.section}>
        <div className={clsx("container", mainPageStyles.section__container)}>
          <ErrorView
            message={`${getRtkErrorMessage(randomError)} ${getRtkErrorMessage(topMoviesError)}`}
          />
        </div>
      </section>
    );
  }

  return (
    <>
      {randomMovie && (
        <section className={randomMovieStyles.section}>
          <div className="container">
            <MovieBanner movie={randomMovie} onRefetchMovie={randomRefetch} />
          </div>
        </section>
      )}

      {topMovies && (
        <section className={topMoviesStyles.section}>
          <div className="container">
            <div className={topMoviesStyles.section__wrapper}>
              <h2 className={topMoviesStyles.section__title}>Топ 10 фильмов</h2>
              <MovieList list={topMovies} kind="rating" />
            </div>
          </div>
        </section>
      )}
    </>
  );
};
