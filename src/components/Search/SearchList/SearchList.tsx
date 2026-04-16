import type { FC } from "react";
import type { MovieResponse } from "@schemas/movie.schema";

import { SearchCard } from "../SearchCard";
import styles from "./SearchList.module.scss";

interface SearchListProps {
  list: MovieResponse[];
  onSelectMovie?: () => void;
}

export const SearchList: FC<SearchListProps> = ({ list, onSelectMovie }) => {
  return (
    <ul className={styles.list}>
      {list.map((movie) => {
        return (
          <li className={styles.list__item} key={movie.id}>
            <SearchCard movie={movie} onSelectMovie={onSelectMovie} />
          </li>
        );
      })}
    </ul>
  );
};
