import clsx from "clsx";
import { useState, type FC, type MouseEvent } from "react";

import { Button } from "@components/UI/Button";
import { Icon } from "@components/UI/Icon";
import type { MovieResponse } from "@schemas/movie.schema";

import styles from "./MovieCard.module.scss";
import { CustomLink } from "@components/UI/CustomLink";
import { generatePath } from "react-router-dom";
import { PATHS } from "@config/paths";

interface MovieCardProps {
  movie: MovieResponse;
  kind?: "default" | "favorite";
  onRemoveFavorite?: () => void;
  hasError?: boolean;
}

export const MovieCard: FC<MovieCardProps> = ({
  movie,
  kind = "default",
  onRemoveFavorite,
  hasError = false,
}) => {
  const [imgError, setImgError] = useState(false);

  const handleRemoveFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (onRemoveFavorite) onRemoveFavorite();
  };

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

          {onRemoveFavorite && (
            <Button
              shape="circle-small"
              background="white"
              className={styles.card__close}
              onClick={handleRemoveFavorite}
              aria-label="Удалить"
            >
              <Icon name="close" />
            </Button>
          )}
        </>
      );
      break;
  }

  return (
    <CustomLink
      className={clsx(styles.card, hasError && styles["card--error"])}
      to={generatePath(PATHS.MOVIES.BY_ID, { movieId: String(movie.id) })}
    >
      {cardContent}
    </CustomLink>
  );
};
