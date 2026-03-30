import type { FC } from "react";
import styles from "./SearchList.module.scss";
import { SearchCard } from "../SearchCard";
import type { TMovieResponse } from "@schemas/movie.schema";

interface ISearchListProps {
  list: TMovieResponse[];
}

export const SearchList: FC<ISearchListProps> = ({ list }) => {
  return (
    <ul className={styles.list}>
      {list.map((movie) => {
        return (
          <li className={styles.list__item}>
            <SearchCard movie={movie} />
          </li>
        );
      })}
    </ul>
  );
};
