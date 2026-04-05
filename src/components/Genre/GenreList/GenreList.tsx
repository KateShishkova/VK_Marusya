import type { FC } from "react";
import { GenreCard } from "../GenreCard";
import styles from "./GenreList.module.scss";
import type { TGenre } from "@schemas/genre.schema";

interface IGenreListProps {
  list: TGenre[];
}

export const GenreList: FC<IGenreListProps> = ({list}) => {
  return (
    <ul className={styles.list}>
      {list.map((genre, index) => {
        return (
          <li className={styles.list__item} key={index}>
            <GenreCard genre={genre} />
          </li>
        );
      })}
    </ul>
  );
};
