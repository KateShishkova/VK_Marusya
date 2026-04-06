import clsx from "clsx";
import type { FC, HTMLAttributes } from "react";
import { Icon } from "../Icon";
import styles from "./Loader.module.scss";

interface LoaderProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "small" | "medium";
}

export const Loader: FC<LoaderProps> = ({
  size = "medium",
  className,
  ...props
}) => {
  const finalClassName = clsx(
    styles.loader,
    styles[`loader--${size}`],
    className,
  );

  return <Icon className={finalClassName} name="spinner" {...props} />;
};
