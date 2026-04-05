import type { ReactNode } from "react";
import styles from "./ListView.module.scss";
import { Loader } from "../Loader";
import clsx from "clsx";
import { ErrorView } from "../ErrorView";

interface IListViewProps<T> {
  list: T[];
  renderList: (list: T[]) => ReactNode;
  isLoading?: boolean;
  error?: string | undefined;
  emptyText?: string;
}

export const ListView = <T,>({
  list,
  renderList,
  isLoading,
  error,
  emptyText = "Список пуст...",
}: IListViewProps<T>) => {
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
        <ErrorView kind="component" message={error} />
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
