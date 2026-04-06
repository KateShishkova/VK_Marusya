import { useEffect, useState, type FC } from "react";
import styles from "./YoutubePlayer.module.scss";
import { Loader } from "@components/UI/Loader";
import clsx from "clsx";
import type { MovieResponse } from "@schemas/movie.schema";

interface YoutubePlayerProps {
  movie: MovieResponse;
}

export const YoutubePlayer: FC<YoutubePlayerProps> = ({ movie }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) setError(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className={styles.player}>
      {loading && !error && (
        <div className={styles.player__loader}>
          <Loader size="medium" />
        </div>
      )}

      {error && <span>Видео недоступно.</span>}

      <iframe
        className={clsx(
          styles.player__iframe,
          (loading || error) && "visually-hidden",
        )}
        src={`https://www.youtube.com/embed/${movie.trailerYouTubeId}?autoplay=1`}
        allow="autoplay; encrypted-media"
        allowFullScreen
        title={movie.title}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
    </div>
  );
};
