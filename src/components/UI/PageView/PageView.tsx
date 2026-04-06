import type { FC, ReactNode } from "react";
import { Loader } from "../Loader";
import styles from "./PageView.module.scss";
import clsx from "clsx";
import { ErrorView } from "../ErrorView";

interface IPageViewProps {
  isLoading?: boolean;
  error?: string | undefined;
  onRetry?: () => void;
  children: ReactNode;
}

export const PageView: FC<IPageViewProps> = ({
  isLoading,
  error,
  onRetry,
  children,
}) => {
  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className={clsx("container", styles.section__container)}>
          <Loader />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.section}>
        <div className={clsx("container", styles.section__container)}>
          <ErrorView message={error} onRetry={onRetry} />
        </div>
      </section>
    );
  }

  return <>{children}</>;
};
