import clsx from "clsx";
import { useState, type FC } from "react";
import { generatePath } from "react-router-dom";

import { Button } from "@components/UI/Button";
import { CustomLink } from "@components/UI/CustomLink";
import { Icon } from "@components/UI/Icon";
import { Loader } from "@components/UI/Loader";
import { PATHS } from "@config/paths";
import { useAuthModal } from "@hooks/useAuthModal";
import { useFavoriteMovie } from "@hooks/useFavoriteMovie";
import { useModal } from "@hooks/useModal";
import type { MovieResponse } from "@schemas/movie.schema";

import { MovieInfo } from "../MovieInfo";
import { YoutubePlayer } from "../YoutubePlayer";
import styles from "./MovieBanner.module.scss";

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

  const { isAuthPending, isFavorite, handleToggleFavorite, getFavoriteError } =
    useFavoriteMovie(openAuthModal);

  const [imgError, setImgError] = useState(false);

  const movieId = String(movie.id);
  const favorite = isFavorite(movieId);

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
    <CustomLink to={generatePath(PATHS.MOVIES.BY_ID, { movieId })} kind="btn">
      О&nbsp;фильме
    </CustomLink>
  );

  const favoriteAction = (
    <>
      <Button
        shape="rectangle-small"
        onClick={() => handleToggleFavorite(movieId)}
        aria-label={favorite ? "Удалить из избранных" : "Добавить в избранные"}
        disabled={isAuthPending}
      >
        {isAuthPending ? (
          <Loader size="small" />
        ) : (
          <Icon
            name={favorite ? "heart-filled" : "heart"}
            className={clsx(
              styles["banner__favorite-icon"],
              favorite && styles["banner__favorite-icon--active"],
            )}
          />
        )}
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
  const errorMessage = getFavoriteError(movieId) || fetchingError;

  return (
    <div className={styles.banner}>
      <div className={styles.banner__left}>
        <MovieInfo movie={movie} />
        <div className={styles["banner__actions-wrapper"]}>
          {actionsContent}
          {errorMessage && (
            <span className={styles["banner__error"]}>{errorMessage}</span>
          )}
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
