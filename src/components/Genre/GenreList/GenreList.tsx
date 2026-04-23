import type { FC } from "react";
import type { Genre } from "@schemas/genre.schema";

import { GenreCard } from "../GenreCard";
import styles from "./GenreList.module.scss";

interface GenreListProps {
  list: Genre[];
}

export const GenreList: FC<GenreListProps> = ({ list }) => {
  return (
    <ul className={styles.list}>
      {list.map((genre) => {
        return (
          <li key={genre.en}>
            <GenreCard genre={genre} />
          </li>
        );
      })}
    </ul>
  );
};
