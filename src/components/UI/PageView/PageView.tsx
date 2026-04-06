import type { FC, ReactNode } from "react";
import { Loader } from "../Loader";
import styles from "./PageView.module.scss";
import clsx from "clsx";
import { ErrorView } from "../ErrorView";

interface IPageViewProps {
  isLoading?: boolean;
  isError?: boolean;
  error?: string | undefined;
  children: ReactNode;
}

export const PageView: FC<IPageViewProps> = ({
  isLoading,
  isError,
  error,
  children,
}) => {
  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className={clsx("contsiner", styles.section__container)}>
          <Loader />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={styles.section}>
        <div className={clsx("contsiner", styles.section__container)}>
          <ErrorView message={error} />
        </div>
      </section>
    );
  }

  return <>{children}</>;
};
