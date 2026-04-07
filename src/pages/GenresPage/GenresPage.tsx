import clsx from "clsx";

import { GenreList } from "@components/Genre/GenreList";
import { ListView } from "@components/UI/ListView";
import { PageView } from "@components/UI/PageView";
import { useGenres } from "@hooks/useGenres";
import { usePageRequestState } from "@hooks/usePageRequestState";
import { getRtkErrorMessage } from "@utils/getRtkErrorMessage";

import genresStyles from "./Genres.module.scss";

export const GenresPage = () => {
  const {
    genres,
    isFetching: isGenresFetching,
    isError: isGenresError,
    error: genresError,
    refetch: genresRefetch,
  } = useGenres();

  const pageState = usePageRequestState(
    [
      {
        hasData: !isGenresError && !isGenresFetching,
        isFetching: isGenresFetching,
        isError: isGenresError,
        refetch: genresRefetch,
      },
    ],
    {
      errorMessage:
        "Не удалось загрузить страницу со списком доступных жанров.",
    },
  );

  const pageContent = (
    <section className={clsx("section", genresStyles.section)}>
      <div className="container">
        <div className={genresStyles.section__wrapper}>
          <h2 className={genresStyles.section__title}>Жанры фильмов</h2>
          <ListView
            list={genres}
            isLoading={isGenresFetching}
            error={isGenresError ? getRtkErrorMessage(genresError) : undefined}
            onRetry={genresRefetch}
            renderList={(list) => <GenreList list={list} />}
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
