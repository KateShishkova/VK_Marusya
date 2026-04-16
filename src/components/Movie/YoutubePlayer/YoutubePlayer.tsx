import clsx from "clsx";
import { useEffect, useState, type FC } from "react";
import { Loader } from "@components/UI/Loader";
import { API_CONFIG } from "@config/api";
import type { MovieResponse } from "@schemas/movie.schema";
import styles from "./YoutubePlayer.module.scss";

interface YoutubePlayerProps {
  movie: MovieResponse;
}

export const YoutubePlayer: FC<YoutubePlayerProps> = ({ movie }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError(true);
      }
    }, API_CONFIG.TIMEOUT);
    return () => clearTimeout(timer);
  }, [loading]);

  if (!movie.trailerYouTubeId) {
    return (
      <div className={styles.player}>
        <span>Видео недоступно.</span>
      </div>
    );
  }

  return (
    <div className={styles.player}>
      {!error && loading && (
        <div className={styles.player__loader}>
          <Loader size="medium" />
        </div>
      )}

      {error && !loading && <span>Видео недоступно.</span>}

      <iframe
        className={clsx(styles.player__iframe, loading && "visually-hidden")}
        src={`https://www.youtube.com/embed/${movie.trailerYouTubeId}?autoplay=1`}
        allow="autoplay; encrypted-media"
        allowFullScreen
        title={movie.title}
        onLoad={() => {
          setLoading(false);
          setError(false);
        }}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
    </div>
  );
};
