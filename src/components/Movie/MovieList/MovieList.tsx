import type { FC } from "react";
import type { MovieId } from "@api/types";
import type { MovieResponse } from "@schemas/movie.schema";

import { MovieCard } from "../MovieCard";
import styles from "./MovieList.module.scss";
import clsx from "clsx";

interface MovieListProps {
  list: MovieResponse[];
  kind?: "default" | "favorite" | "rating";
  onRemoveFavorite?: (movieId: MovieId) => void;
  hasFavoriteError?: (movieId: MovieId) => boolean;
}

export const MovieList: FC<MovieListProps> = ({
  list,
  kind = "default",
  onRemoveFavorite,
  hasFavoriteError,
}) => {
  const cardKind = kind === "rating" ? "default" : kind;

  const finalClassName = clsx(
    styles.list,
    kind !== "default" && styles[`list--${kind}`],
  );

  return (
    <ul className={finalClassName}>
      {list.map((movie, index) => {
        return (
          <li className={styles.list__item} key={movie.id}>
            <MovieCard
              kind={cardKind}
              movie={movie}
              onRemoveFavorite={onRemoveFavorite}
              hasError={hasFavoriteError?.(String(movie.id))}
            />
            {kind === "rating" && (
              <span className={styles.list__index}>{index + 1}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
};
