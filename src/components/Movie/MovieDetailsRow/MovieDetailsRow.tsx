import type { FC } from "react";
import styles from "./MovieDetailsRow.module.scss";

interface IMovieDetailsRowProps {
  label: string;
  value: string;
}

export const MovieDetailsRow: FC<IMovieDetailsRowProps> = ({
  label,
  value,
}) => {
  return (
    <div className={styles.row}>
      <div className={styles["row__label-wrapper"]}>
        <span className={styles.row__label}>{label}</span>
        <span className={styles.row__line}></span>
      </div>
      <span className={styles.row__value}>{value}</span>
    </div>
  );
};
