import { useState, type FC } from "react";
import type { Genre } from "@schemas/genre.schema";
import styles from "./GenreCard.module.scss";
import { CustomLink } from "@components/UI/CustomLink";
import { generatePath } from "react-router-dom";
import { PATHS } from "@config/paths";

interface GenreCardProps {
  genre: Genre;
}

export const GenreCard: FC<GenreCardProps> = ({ genre }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <CustomLink
      className={styles.card}
      to={generatePath(PATHS.GENRES.BY_GENRE, { genreEn: genre.en })}
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
    </CustomLink>
  );
};
