import { useState, type FC } from "react";
import { MovieInfo } from "@components/Movie/MovieInfo";
import type { MovieResponse } from "@schemas/movie.schema";
import styles from "./SearchCard.module.scss";

interface SearchCardProps {
  movie: MovieResponse;
}

export const SearchCard: FC<SearchCardProps> = ({ movie }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      className={styles.card}
      href={`https://cinemaguide.skillbox.cc/movie/${movie.id}`}
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
    </a>
  );
};
