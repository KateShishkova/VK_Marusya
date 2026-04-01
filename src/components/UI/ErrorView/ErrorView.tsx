import type { FC, HTMLAttributes } from "react";
import styles from "./ErrorView.module.scss";
import clsx from "clsx";
import { Button } from "../Button";

interface IErrorViewProps extends HTMLAttributes<HTMLDivElement> {
  kind?: "page" | "section";
  message?: string;
  onRetry?: () => void;
}

export const ErrorView: FC<IErrorViewProps> = ({
  kind = "page",
  message,
  onRetry,
  className,
  ...props
}) => {
  const finalClassName = clsx(
    styles.error,
    kind !== "page" && styles[`error--${kind}`],
    className,
  );

  return (
    <div className={finalClassName} {...props}>
      <h2 className={styles.error__title}>Произошла ошибка:</h2>
      <div className={styles.error__content}>
        <p className={styles.error__text}>
          {message || "Не удалось загрузить данные."}
        </p>

        {kind === "page" && (
          <p className={styles.error__text}>
            Проверьте подключение к интернету и обновите страницу.
          </p>
        )}
      </div>
      {onRetry && (
        <Button background="accent" onClick={onRetry} className={styles.error__btn}>
          Повторить запрос
        </Button>
      )}
    </div>
  );
};
