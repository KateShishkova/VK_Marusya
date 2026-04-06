import type { FC } from "react";
import styles from "./MovieDetails.module.scss";
import { MovieDetailsRow } from "../MovieDetailsRow";
import { MOVIE_DETAIL } from "@config/movieDetails";
import type { TMovieResponse } from "@schemas/movie.schema";

interface IMovieDetailsProps {
  movie: TMovieResponse;
}

export const MovieDetails: FC<IMovieDetailsProps> = ({ movie }) => {
  return (
    <div className={styles.details}>
      <h2 className={styles.details__title}>О фильме</h2>
      <ul className={styles.details__list}>
        {MOVIE_DETAIL.map((detail) => {
          return (
            <li  key={detail.label}>
              <MovieDetailsRow
                label={detail.label}
                value={detail.getValue(movie)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
