import type { Genre } from "@schemas/genre.schema";
import { genresImages } from "./genresImages";

const genresBase = [
  { en: "drama", ru: "Драма" },
  { en: "comedy", ru: "Комедия" },
  { en: "crime", ru: "Детектив" },
  { en: "family", ru: "Семейное" },
  { en: "history", ru: "Историческое" },
  { en: "thriller", ru: "Триллер" },
  { en: "fantasy", ru: "Фантастика" },
  { en: "adventure", ru: "Приключения" },
  { en: "horror", ru: "Ужасы" },
  { en: "scifi", ru: "Научная фантастика" },
  { en: "stand-up", ru: "Стендап" },
  { en: "mystery", ru: "Мистика" },
  { en: "romance", ru: "Мелодрама" },
  { en: "music", ru: "Музыкальное" },
  { en: "tv-movie", ru: "Телефильм" },
  { en: "documentary", ru: "Документальное" },
  { en: "action", ru: "Боевик" },
  { en: "western", ru: "Вестерны" },
  { en: "animation", ru: "Мультфильм" },
  { en: "war", ru: "Военные" },
] as const;

export const GENRES: Genre[] = genresBase.map((genre) => ({
  ...genre,
  img: genresImages[genre.en],
}));
