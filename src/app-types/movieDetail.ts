import type { MovieResponse } from "@schemas/movie.schema";

export interface MovieDetail {
  label: string;
  getValue: (movie: MovieResponse) => string;
}
