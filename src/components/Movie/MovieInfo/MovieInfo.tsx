import type { FC } from "react";
import clsx from "clsx";
import styles from "./MovieInfo.module.scss";
import { getRatingClass } from "@utils/getRatingClass";
import { Icon } from "@components/UI/Icon";
import { getFormatRuntime } from "@utils/getFormatRuntime";
import type { MovieResponse } from "@schemas/movie.schema";

interface MovieInfoProps {
  movie: MovieResponse;
  kind?: "banner" | "search";
}

export const MovieInfo: FC<MovieInfoProps> = ({ movie, kind = "banner" }) => {
  const finalClassName = clsx(
    styles.info,
    kind !== "banner" && styles[`info--${kind}`],
  );

  const ratingFinalClass = clsx(
    styles.info__rating,
    movie.tmdbRating &&
      styles[`info__rating--${getRatingClass(movie.tmdbRating)}`],
  );

  const topContent = (
    <div className={styles.info__top}>
      <span className={ratingFinalClass}>
        <Icon name="star" className={styles.info__icon} />
        {movie.tmdbRating ? movie.tmdbRating.toFixed(1).replace(".", ",") : "—"}
      </span>

      {movie.releaseYear && <span>{movie.releaseYear}</span>}

      {movie.genres && movie.genres.length > 0 && (
        <span>{movie.genres.join(", ")}</span>
      )}

      {movie.runtime && <span>{getFormatRuntime(movie.runtime)}</span>}
    </div>
  );

  return (
    <div className={finalClassName}>
      {topContent}

      {movie.title && <h3 className={styles.info__title}>{movie.title}</h3>}

      {kind === "banner" && movie.plot && (
        <p className={styles.info__desc}>{movie.plot}</p>
      )}
    </div>
  );
};
