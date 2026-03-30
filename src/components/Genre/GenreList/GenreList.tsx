import type { FC } from "react";
import { GenreCard } from "../GenreCard";
import styles from "./GenreList.module.scss";
import { GENRES } from "@config/genres";

export const GenreList: FC = () => {
  return (
    <ul className={styles.list}>
      {GENRES.map((genre, index) => {
        return (
          <li className={styles.list__item} key={index}>
            <GenreCard genre={genre} />
          </li>
        );
      })}
    </ul>
  );
};
