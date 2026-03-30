import type { AnchorHTMLAttributes, FC } from "react";
import styles from "./CustomLink.module.scss";
import clsx from "clsx";
import { Link as RouterLink } from "react-router-dom";

interface ICustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  kind?: "text" | "icon" | "img" | "icon-text";
  isActive?: boolean;
}

const isInternalLink = (href: string) => {
  return /^\/(?!\/)/.test(href);
};

export const CustomLink: FC<ICustomLinkProps> = ({
  href,
  children,
  kind = "text",
  isActive = false,
  className,
  ...props
}) => {
  const isText = kind === "text";

  const finalClassName = clsx(
    styles.link,
    !isText && styles[`link--${kind}`],
    isActive && styles[`link--active`],
    className,
  );

  if (isInternalLink(href)) {
    return (
      <RouterLink to={href} className={finalClassName} {...props}>
        {children}
      </RouterLink>
    );
  } else {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={finalClassName}
        {...props}
      >
        {children}
      </a>
    );
  }
};
