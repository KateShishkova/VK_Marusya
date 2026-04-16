import { memo, useState, type FC } from "react";
import { generatePath } from "react-router-dom";

import { MovieInfo } from "@components/Movie/MovieInfo";
import { CustomLink } from "@components/UI/CustomLink";
import { PATHS } from "@config/paths";
import type { MovieResponse } from "@schemas/movie.schema";

import styles from "./SearchCard.module.scss";

interface SearchCardProps {
  movie: MovieResponse;
  onSelectMovie?: () => void;
}

const SearchCardBase: FC<SearchCardProps> = ({ movie, onSelectMovie }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <CustomLink
      className={styles.card}
      to={generatePath(PATHS.MOVIES.BY_ID, { movieId: String(movie.id) })}
      onClick={onSelectMovie}
    >
      <div className={styles.card__poster}>
        {!imgError && movie.posterUrl && (
          <img
            className={styles.card__img}
            src={movie.posterUrl}
            alt={movie.title}
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className={styles.card__content}>
        <MovieInfo kind="search" movie={movie} />
      </div>
    </CustomLink>
  );
};

export const SearchCard = memo(SearchCardBase);
