import clsx from "clsx";
import type { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

import type { ExternalLinkProps, InternalLinkProps } from "./types";
import styles from "./CustomLink.module.scss";

type CustomLinkProps = InternalLinkProps | ExternalLinkProps;

export const CustomLink: FC<CustomLinkProps> = (props) => {
  // Internal link
  if (props.to !== undefined) {
    const { to, children, kind, color, className, ...rest } = props;

    const finalClassName = clsx(
      styles.link,
      kind !== "text" && styles[`link--${kind}`],
      color !== "white" && styles[`link--${color}`],
      className,
    );

    return (
      <RouterLink to={to} {...rest} className={finalClassName}>
        {children}
      </RouterLink>
    );
  }

  // External link
  if (props.href !== undefined) {
    const { href, children, kind, color, className, ...rest } = props;

    const finalClassName = clsx(
      styles.link,
      kind !== "text" && styles[`link--${kind}`],
      color !== "white" && styles[`link--${color}`],
      className,
    );

    return (
      <a
        href={href}
        {...rest}
        target="_blank"
        rel="noopener noreferrer"
        className={finalClassName}
      >
        {children}
      </a>
    );
  }

  return null;
};
