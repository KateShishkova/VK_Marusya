import { useState, type FC } from "react";
import { MovieInfo } from "@components/Movie/MovieInfo";
import type { MovieResponse } from "@schemas/movie.schema";
import styles from "./SearchCard.module.scss";
import { CustomLink } from "@components/UI/CustomLink";
import { generatePath } from "react-router-dom";
import { PATHS } from "@config/paths";

interface SearchCardProps {
  movie: MovieResponse;
}

export const SearchCard: FC<SearchCardProps> = ({ movie }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <CustomLink
      className={styles.card}
      to={generatePath(PATHS.MOVIES.BY_ID, { movieId: String(movie.id) })}
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
