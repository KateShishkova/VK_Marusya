import clsx from "clsx";
import { useParams } from "react-router-dom";

import { useGetMovieByIdQuery } from "@api/movieApi";
import { MovieBanner } from "@components/Movie/MovieBanner";
import { MovieDetails } from "@components/Movie/MovieDetails";
import { PageView } from "@components/UI/PageView";
import { usePageRequestState } from "@hooks/usePageRequestState";

import bannerStyles from "./MovieBanner.module.scss";
import aboutStyles from "./MovieAbout.module.scss";

export const MovieInfoPage = () => {
  const { movieId } = useParams();

  if (!movieId) return null;

  const {
    data: movie,
    isFetching: isMovieFetching,
    isError: isMovieError,
    refetch: movieRefetch,
  } = useGetMovieByIdQuery(movieId);

  const pageState = usePageRequestState(
    [
      {
        hasData: movie !== undefined,
        isFetching: isMovieFetching,
        isError: isMovieError,
        refetch: movieRefetch,
      },
    ],
    {
      errorMessage: `Не удалось загрузить страницу с информацией о фильме.`,
    },
  );

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
