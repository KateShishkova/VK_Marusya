import clsx from "clsx";
import type { FC } from "react";
import { NavLink, type NavLinkRenderProps } from "react-router-dom";

import type { CustomNavLinkProps } from "./types";
import styles from "./CustomLink.module.scss";

export const CustomNavLink: FC<CustomNavLinkProps> = ({
  children,
  kind = "text",
  color = "white",
  className,
  end = false,
  ...props
}) => {
  const getFinalClassName = ({ isActive }: NavLinkRenderProps) => {
    return clsx(
      styles.link,
      kind !== "text" && styles[`link--${kind}`],
      color !== "white" && styles[`link--${color}`],
      isActive && styles[`link--active`],
      className,
    );
  };

  return (
    <NavLink end={end} className={getFinalClassName} {...props}>
      {children}
    </NavLink>
  );
};
