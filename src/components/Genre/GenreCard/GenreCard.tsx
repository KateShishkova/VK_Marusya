import { useState, type FC } from "react";
import styles from "./GenreCard.module.scss";
import type { TGenre } from "@schemas/genre.schema";

interface IGenreCardProps {
  genre: TGenre;
}

export const GenreCard: FC<IGenreCardProps> = ({ genre }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      className={styles.card}
      href={`https://cinemaguide.skillbox.cc/movie?genre=${genre.en}`}
    >
      <div className={styles.card__poster}>
        {!imgError ? (
          <img
            className={styles.card__img}
            src={genre.img}
            alt={genre.ru}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className={styles.card__error}>{genre.ru}</span>
        )}
      </div>
      <div className={styles.card__content}>
        <h3 className={styles.card__title}>{genre.ru}</h3>
      </div>
    </a>
  );
};
