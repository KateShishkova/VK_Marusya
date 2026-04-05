import type { FC, HTMLAttributes } from "react";
import styles from "./ErrorView.module.scss";
import clsx from "clsx";
import { Button } from "../Button";

interface IErrorViewProps extends HTMLAttributes<HTMLDivElement> {
  kind?: "page" | "section" | "component";
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

  const titleEl = <h2 className={styles.error__title}>Произошла ошибка:</h2>;
  const messageEl = (
    <p className={styles.error__text}>
      {message || "Не удалось загрузить данные."}
    </p>
  );
  const guidanceEl = (
    <p className={styles.error__text}>
      Проверьте подключение к интернету и обновите страницу.
    </p>
  );
  const retryBtn = (
    <Button background="accent" onClick={onRetry} className={styles.error__btn}>
      Повторить запрос
    </Button>
  );

  let contentEl;

  switch (kind) {
    case "page":
      contentEl = (
        <>
          {titleEl}
          <div className={styles.error__content}>
            {messageEl}
            {guidanceEl}
          </div>
          {onRetry && retryBtn}
        </>
      );
      break;

    case "section":
      contentEl = (
        <>
          {titleEl}
          {messageEl}
          {onRetry && retryBtn}
        </>
      );
      break;

    case "component":
      contentEl = (
        <>
          {titleEl}
          {messageEl}
        </>
      );
      break;
  }

  return (
    <div className={finalClassName} {...props}>
      {contentEl}
    </div>
  );
};
