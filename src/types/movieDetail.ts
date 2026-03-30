import type { TMovieResponse } from "@schemas/movie.schema";

export interface IMovieDetail {
  label: string;
  getValue: (movie: TMovieResponse) => string;
}
