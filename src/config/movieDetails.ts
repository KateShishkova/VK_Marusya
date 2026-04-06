import { getFormatCurrency } from "@utils/getFormatCurrency";
import type { MovieDetail } from "@app-types/movieDetail";

const missingData = "Данные отсутствуют";

export const MOVIE_DETAIL: MovieDetail[] = [
  {
    label: "Язык оригинала",
    getValue: (movie) => movie.language ?? missingData,
  },
  {
    label: "Бюджет",
    getValue: (movie) =>
      movie.budget ? getFormatCurrency(movie.budget) : missingData,
  },
  {
    label: "Выручка",
    getValue: (movie) =>
      movie.revenue ? getFormatCurrency(movie.revenue) : missingData,
  },
  {
    label: "Режиссёр",
    getValue: (movie) => movie.director ?? missingData,
  },
  {
    label: "Продакшен",
    getValue: (movie) => movie.production ?? missingData,
  },
  {
    label: "Награды",
    getValue: (movie) => movie.awardsSummary ?? missingData,
  },
];
