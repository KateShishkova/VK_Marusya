import type { FC } from "react";
import type { MovieResponse } from "@schemas/movie.schema";

import { SearchCard } from "../SearchCard";
import styles from "./SearchList.module.scss";

interface SearchListProps {
  list: MovieResponse[];
}

export const SearchList: FC<SearchListProps> = ({ list }) => {
  return (
    <ul className={styles.list}>
      {list.map((movie) => {
        return (
          <li className={styles.list__item} key={movie.id}>
            <SearchCard movie={movie} />
          </li>
        );
      })}
    </ul>
  );
};
