import clsx from "clsx";
import { Navigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";

import { useGetMovieByIdQuery } from "@api/movieApi";
import { MovieBanner } from "@components/Movie/MovieBanner";
import { MovieDetails } from "@components/Movie/MovieDetails";
import { PageView } from "@components/UI/PageView";
import { PATHS } from "@config/paths";
import { usePageRequestState } from "@hooks/usePageRequestState";

import bannerStyles from "./MovieBanner.module.scss";
import aboutStyles from "./MovieAbout.module.scss";

const MovieInfoPage = () => {
  const { movieId } = useParams();
  const hasMovieId = movieId !== undefined;

  const queryArg = movieId ?? skipToken;

  const {
    data: movie,
    isFetching: isMovieFetching,
    isError: isMovieError,
    refetch: movieRefetch,
  } = useGetMovieByIdQuery(queryArg);

  const pageState = usePageRequestState(
    [
      {
        hasData: movie !== undefined,
        isFetching: hasMovieId && isMovieFetching,
        isError: hasMovieId && isMovieError,
        refetch: hasMovieId ? movieRefetch : () => undefined,
      },
    ],
    {
      errorMessage: `Не удалось загрузить страницу с информацией о фильме.`,
    },
  );

  if (!hasMovieId) {
    return <Navigate to={PATHS.NOT_FOUND} replace />;
  }

  const pageContent = movie && (
    <>
      <section className={clsx("section", bannerStyles.section)}>
        <div className="container">
          <MovieBanner movie={movie} kind="page" />
        </div>
      </section>

      <section className={clsx("section", aboutStyles.section)}>
        <div className="container">
          <MovieDetails movie={movie} />
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

export default MovieInfoPage;
