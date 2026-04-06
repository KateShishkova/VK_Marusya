import type { FC } from "react";
import { MOVIE_DETAILS } from "@config/movieDetails";
import type { MovieResponse } from "@schemas/movie.schema";

import { MovieDetailsRow } from "../MovieDetailsRow";
import styles from "./MovieDetails.module.scss";

interface MovieDetailsProps {
  movie: MovieResponse;
}

export const MovieDetails: FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <div className={styles.details}>
      <h2 className={styles.details__title}>О фильме</h2>
      <ul className={styles.details__list}>
        {MOVIE_DETAILS.map((detail) => {
          return (
            <li key={detail.label}>
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
