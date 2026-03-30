import type { FC } from "react";
import { MovieCard } from "../MovieCard";
import styles from "./MovieList.module.scss";
import type { TMovieResponse } from "@schemas/movie.schema";

interface IMovieListProps {
  list: TMovieResponse[];
  kind?: "default" | "favorite" | "rating";
}

export const MovieList: FC<IMovieListProps> = ({ list, kind = "default" }) => {
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
