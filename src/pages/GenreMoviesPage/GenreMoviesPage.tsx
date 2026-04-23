import clsx from "clsx";
import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";

import { useGetMoviesInfiniteQuery } from "@api/movieApi";
import { MovieList } from "@components/Movie/MovieList";
import { Button } from "@components/UI/Button";
import { Icon } from "@components/UI/Icon";
import { ListView } from "@components/UI/ListView";
import { PageView } from "@components/UI/PageView";
import { GENRES } from "@config/genres";
import { PATHS } from "@config/paths";
import { usePageRequestState } from "@hooks/usePageRequestState";
import { usePageSearchParam } from "@hooks/usePageSearchParam";
import { getRtkErrorMessage } from "@utils/getRtkErrorMessage";

import moviesStyles from "./GenreMovies.module.scss";

const GenreMoviesPage = () => {
  const { genreEn } = useParams();
  const navigate = useNavigate();
  const { page: targetPage, setPage } = usePageSearchParam();

  const genreObj = GENRES.find((genre) => genre.en === genreEn);
  const hasGenreObj = genreObj !== undefined;
  const title = genreObj?.ru ?? genreEn;
  const queryArg = genreObj ? { genre: genreObj.en } : skipToken;

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMoviesInfiniteQuery(queryArg);

  const loadedPagesCount = data?.pages.length ?? 0;
  const shownPagesCount = targetPage || 1;
  const allMovies = data?.pages.slice(0, shownPagesCount).flat() ?? [];
  const hasMovies = allMovies.length > 0 || (!isLoading && !isError);

  useEffect(() => {
    if (
      !hasGenreObj ||
      loadedPagesCount >= shownPagesCount ||
      !hasNextPage ||
      isFetching ||
      isFetchingNextPage
    ) {
      return;
    }

    fetchNextPage();
  }, [
    hasGenreObj,
    loadedPagesCount,
    shownPagesCount,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  const handleShowMoreMovies = async () => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }
    await fetchNextPage();
    setPage(shownPagesCount + 1, false);
  };

  const pageState = usePageRequestState(
    [
      {
        hasData: hasMovies,
        isFetching: hasGenreObj && isLoading,
        isError: hasGenreObj && isError,
        refetch: hasGenreObj ? refetch : () => undefined,
      },
    ],
    {
      errorMessage: `Не удалось загрузить страницу со списком фильмов выбранного жанра (${title}).`,
    },
  );

  if (!genreObj) {
    return <Navigate to={PATHS.NOT_FOUND} replace />;
  }

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
            list={allMovies}
            isLoading={!hasMovies && isFetching}
            error={isError ? getRtkErrorMessage(error) : undefined}
            onRetry={refetch}
            renderList={(list) => <MovieList list={list} />}
          />
          {hasNextPage && !isError && (
            <Button
              className={moviesStyles["section__more-btn"]}
              background="accent"
              disabled={isFetchingNextPage}
              onClick={handleShowMoreMovies}
            >
              {isFetchingNextPage ? "Загружаю..." : "Показать ещё"}
            </Button>
          )}
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

export default GenreMoviesPage;
