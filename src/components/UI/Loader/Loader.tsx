import type { FC, HTMLAttributes } from "react";
import { Icon } from "../Icon";
import styles from "./Loader.module.scss";
import clsx from "clsx";

interface ILoader extends HTMLAttributes<HTMLSpanElement> {
  size?: 'small' | 'medium';
}

export const Loader: FC<ILoader> = ({ size = 'medium', className, ...props }) => {
  const finalClassName = clsx(
    styles.loader,
    styles[`loader--${size}`],
  );
  
  return (
    <Icon className={finalClassName} name="spinner" {...props} />
  );
};
