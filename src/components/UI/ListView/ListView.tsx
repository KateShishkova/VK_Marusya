import type { ReactNode } from "react";
import styles from "./ListView.module.scss";
import { Loader } from "../Loader";
import clsx from "clsx";
import { ErrorView } from "../ErrorView";

interface ListViewProps<T> {
  list: T[];
  renderList: (list: T[]) => ReactNode;
  isLoading?: boolean;
  error?: string | undefined;
  onRetry?: () => void;
  emptyText?: string;
}

export const ListView = <T,>({
  list,
  renderList,
  isLoading,
  error,
  onRetry,
  emptyText = "Список пуст...",
}: ListViewProps<T>) => {
  if (isLoading) {
    return (
      <div className={clsx(styles["list-view"], styles["list-view--loader"])}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles["list-view"]}>
        <ErrorView kind="section" message={error} onRetry={onRetry} />
      </div>
    );
  }

  if (!list.length) {
    return (
      <div className={styles["list-view"]}>
        <span className={styles["list-view__text"]}>{emptyText}</span>
      </div>
    );
  }

  return <>{renderList(list)}</>;
};
