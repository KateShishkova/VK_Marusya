import { Button } from "@components/UI/Button";
import { Icon } from "@components/UI/Icon";
import { useState, type FC } from "react";
import { MovieInfo } from "../MovieInfo";
import styles from "./MovieBanner.module.scss";
import type { TMovieResponse } from "@schemas/movie.schema";
import clsx from "clsx";

interface IMovieBannerProps {
  movie: TMovieResponse;
  kind?: "banner" | "page";
  isFetching?: boolean;
  onRefetchMovie?: () => void;
  onOpenTrailer?: () => void;
  onOpenMoviePage?: () => void;
  onToggleFavorite?: () => void;
}

export const MovieBanner: FC<IMovieBannerProps> = ({
  movie,
  kind = "banner",
  isFetching = false,
  onRefetchMovie,
  onOpenTrailer,
  onOpenMoviePage,
  onToggleFavorite,
}) => {
  const [imgError, setImgError] = useState(false);

  let actionContent;
  switch (kind) {
    case "banner":
      actionContent = (
        <div className={styles["banner__action-wrapper"]}>
          <Button
            className={styles.banner__btn}
            background="accent"
            onClick={onOpenTrailer}
          >
            Трейлер
          </Button>
          <Button className={styles.banner__btn} onClick={onOpenMoviePage}>
            О&nbsp;фильме
          </Button>
          <Button
            className={styles.banner__btn}
            shape="rectangle-small"
            onClick={onToggleFavorite}
            aria-label="Добавить в избранные"
          >
            <Icon name="heart" />
          </Button>
          <Button
            className={styles.banner__btn}
            shape="rectangle-small"
            onClick={onRefetchMovie}
            aria-label="Обновить"
          >
            <Icon
              name="refresh"
              className={clsx(
                styles["banner__refetch-icon"],
                isFetching && styles["banner__refetch-icon--active"],
              )}
            />
          </Button>
        </div>
      );
      break;

    case "page":
      actionContent = (
        <div className={styles["banner__action-wrapper"]}>
          <Button
            className={styles.banner__btn}
            background="accent"
            onClick={onOpenTrailer}
          >
            Трейлер
          </Button>
          <Button
            className={styles.banner__btn}
            shape="rectangle-small"
            onClick={onToggleFavorite}
            aria-label="Добавить в избранные"
          >
            <Icon name="heart" />
          </Button>
        </div>
      );
      break;
  }

  return (
    <div className={styles.banner}>
      <div className={styles.banner__left}>
        <MovieInfo movie={movie} />
        {actionContent}
      </div>
      <div className={styles.banner__right}>
        {!imgError && movie.backdropUrl ? (
          <img
            className={styles.banner__img}
            src={movie.backdropUrl}
            alt={movie.title}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className={styles["banner__img-error"]}>
            Постер отсутствует
          </span>
        )}
      </div>
    </div>
  );
};
