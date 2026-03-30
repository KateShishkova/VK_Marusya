import { MovieInfo } from "@components/Movie/MovieInfo";
import { useState, type FC } from "react";
import styles from "./SearchCard.module.scss";
import type { TMovieResponse } from "@schemas/movie.schema";

interface ISearchCardProps {
  movie: TMovieResponse;
}

export const SearchCard: FC<ISearchCardProps> = ({ movie }) => {
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
