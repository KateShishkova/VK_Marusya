import type { FC } from "react";
import type { MovieResponse } from "@schemas/movie.schema";

import { MovieCard } from "../MovieCard";
import styles from "./MovieList.module.scss";

interface MovieListProps {
  list: MovieResponse[];
  kind?: "default" | "favorite" | "rating";
}

export const MovieList: FC<MovieListProps> = ({ list, kind = "default" }) => {
  const handleRemoveFavorite = () => {
    console.log("remove favorite");
  };

  const cardKind = kind === "rating" ? "default" : kind;

  return (
    <ul className={styles.list}>
      {list.map((movie, index) => {
        return (
          <li className={styles.list__item} key={movie.id}>
            <MovieCard
              kind={cardKind}
              movie={movie}
              onRemoveFavorite={handleRemoveFavorite}
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
