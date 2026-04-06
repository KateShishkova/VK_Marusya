import { useState, type FC } from "react";
import { Button } from "@components/UI/Button";
import { Icon } from "@components/UI/Icon";
import type { MovieResponse } from "@schemas/movie.schema";
import styles from "./MovieCard.module.scss";

interface MovieCardProps {
  movie: MovieResponse;
  kind?: "default" | "favorite";
  onRemoveFavorite?: () => void;
}

export const MovieCard: FC<MovieCardProps> = ({
  movie,
  kind = "default",
  onRemoveFavorite,
}) => {
  const [imgError, setImgError] = useState(false);

  const baseContent = (
    <div className={styles.card__wrapper}>
      {!imgError && movie.posterUrl ? (
        <img
          className={styles.card__img}
          src={movie.posterUrl}
          alt={movie.title}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={styles.card__error}>{movie.title}</span>
      )}
    </div>
  );

  let cardContent;
  switch (kind) {
    case "default":
      cardContent = <>{baseContent}</>;
      break;

    case "favorite":
      cardContent = (
        <>
          {baseContent}

          <Button
            shape="circle-small"
            background="white"
            className={styles.card__close}
            onClick={onRemoveFavorite}
            aria-label="Удалить"
          >
            <Icon name="close" />
          </Button>
        </>
      );
      break;
  }

  return (
    <a
      className={styles.card}
      href={`https://cinemaguide.skillbox.cc/movie/${movie.id}`}
    >
      {cardContent}
    </a>
  );
};
