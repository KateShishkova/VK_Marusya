import type { FC } from "react";
import { GenreCard } from "../GenreCard";
import styles from "./GenreList.module.scss";
import type { Genre } from "@schemas/genre.schema";

interface GenreListProps {
  list: Genre[];
}

export const GenreList: FC<GenreListProps> = ({list}) => {
  return (
    <ul className={styles.list}>
      {list.map((genre) => {
        return (
          <li className={styles.list__item} key={genre.en}>
            <GenreCard genre={genre} />
          </li>
        );
      })}
    </ul>
  );
};
