import clsx from "clsx";
import type { FC, ReactNode } from "react";
import { ErrorView } from "../ErrorView";
import { Loader } from "../Loader";
import styles from "./PageView.module.scss";

interface PageViewProps {
  isLoading?: boolean;
  error?: string | undefined;
  onRetry?: () => void;
  children: ReactNode;
}

export const PageView: FC<PageViewProps> = ({
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
