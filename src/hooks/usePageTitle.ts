import { useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { movieApi } from "@api/movieApi";
import { GENRES } from "@config/genres";
import { PATHS } from "@config/paths";
import type { RootState } from "@store/store";
import { getPageTitle } from "@utils/getPageTitle";

export const usePageTitle = () => {
  const { pathname } = useLocation();

  // Movie matched
  const movieMatch = matchPath(
    { path: PATHS.MOVIES.BY_ID, end: true },
    pathname,
  );
  const movieId = movieMatch?.params.movieId;
  const movieTitle = useSelector((state: RootState) =>
    movieId
      ? movieApi.endpoints.getMovieById.select(movieId)(state).data?.title
      : undefined,
  );

  // Genre matched
  const genreMatch = matchPath(
    { path: PATHS.GENRES.BY_GENRE, end: true },
    pathname,
  );
  const genreEn = genreMatch?.params.genreEn;
  const genreTitle =
    GENRES.find((genre) => genre.en === genreEn)?.ru ?? undefined;

  // Page title
  const pageTitle = getPageTitle(pathname, {
    movieTitle: movieTitle,
    genreTitle: genreTitle,
  });

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return pageTitle;
};
