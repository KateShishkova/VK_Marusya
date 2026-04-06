import { Button } from "@components/UI/Button";
import { Icon } from "@components/UI/Icon";
import { useState, type FC } from "react";
import { MovieInfo } from "../MovieInfo";
import styles from "./MovieBanner.module.scss";
import type { MovieResponse } from "@schemas/movie.schema";
import clsx from "clsx";
import { CustomLink } from "@components/UI/CustomLink";
import { useModal } from "@hooks/useModal";
import { YoutubePlayer } from "../YoutubePlayer";
import { useFavoriteMovie } from "@hooks/useFavoriteMovie";
import { useAuthModal } from "@hooks/useAuthModal";

interface MovieBannerProps {
  movie: MovieResponse;
  kind?: "banner" | "page";
  isFetching?: boolean;
  fetchingError?: string;
  onRefetchMovie?: () => void;
}

export const MovieBanner: FC<MovieBannerProps> = ({
  movie,
  kind = "banner",
  isFetching = false,
  fetchingError,
  onRefetchMovie,
}) => {
  const { openModal: openTrailer, Modal: TrailerModal } = useModal(
    <YoutubePlayer movie={movie} />,
    "video",
  );

  const { openAuthModal, AuthModal } = useAuthModal();

  const {
    isFavorite,
    handleToggleFavorite,
    error: favoriteError,
  } = useFavoriteMovie(String(movie.id), openAuthModal);

  const [imgError, setImgError] = useState(false);

  // Actions
  const trailerAction = (
    <>
      <Button background="accent" onClick={openTrailer}>
        Трейлер
      </Button>
      {TrailerModal}
    </>
  );

  const aboutAction = (
    <CustomLink href="#" kind="btn">
      О&nbsp;фильме
    </CustomLink>
  );

  const favoriteAction = (
    <>
      <Button
        shape="rectangle-small"
        onClick={handleToggleFavorite}
        aria-label="Добавить в избранные"
      >
        <Icon
          name={isFavorite ? "heart-filled" : "heart"}
          className={clsx(
            styles["banner__favorite-icon"],
            isFavorite && styles["banner__favorite-icon--active"],
          )}
        />
      </Button>
      {AuthModal}
    </>
  );

  const refetchAction = (
    <Button
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
  );

  let actionsContent;
  switch (kind) {
    case "banner":
      actionsContent = (
        <div className={styles["banner__actions-content"]}>
          {trailerAction}
          {aboutAction}
          {favoriteAction}
          {refetchAction}
        </div>
      );
      break;

    case "page":
      actionsContent = (
        <div className={styles["banner__actions-content"]}>
          {trailerAction}
          {favoriteAction}
        </div>
      );
      break;
  }
  const errorMessage = favoriteError || fetchingError;

  return (
    <div className={styles.banner}>
      <div className={styles.banner__left}>
        <MovieInfo movie={movie} />
        <div className={styles["banner__actions-wrapper"]}>
          {actionsContent}
          {errorMessage && <span className={styles["banner__error"]}>{errorMessage}</span>}
        </div>
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
