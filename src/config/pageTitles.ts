import { PATHS } from "./paths";

export const BASE_TITLE = "ВК Маруся";

export interface PageTitleContext {
  movieTitle?: string;
  genreTitle?: string;
}

export type PageTitleResolver =
  | string
  | ((context: PageTitleContext) => string);

export const PAGE_TITLES: Record<string, PageTitleResolver> = {
  [PATHS.HOME]: `${BASE_TITLE} | Главная страница`,
  [PATHS.GENRES.ROOT]: `${BASE_TITLE} | Жанры`,

  [PATHS.GENRES.BY_GENRE]: ({ genreTitle }) =>
    genreTitle
      ? `${BASE_TITLE} | ${genreTitle}`
      : `${BASE_TITLE} | Список фильмов`,

  [PATHS.MOVIES.BY_ID]: ({ movieTitle }) =>
    movieTitle
      ? `${BASE_TITLE} | ${movieTitle}`
      : `${BASE_TITLE} | Информация о фильме`,

  [PATHS.PROFILE.ROOT]: `${BASE_TITLE} | Аккаунт`,
  [PATHS.PROFILE.FAVORITES]: `${BASE_TITLE} | Список избранных фильмов`,
  [PATHS.PROFILE.SETTINGS]: `${BASE_TITLE} | Настройки аккаунта`,
};
