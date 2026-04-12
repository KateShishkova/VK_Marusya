import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { LinkProps, NavLinkProps, To } from "react-router-dom";

interface BaseLinkProps {
  children: ReactNode;
  kind?: "text" | "icon" | "img" | "icon-text" | "btn";
  className?: string;
}

export type InternalLinkProps = BaseLinkProps & {
  to: To;
  href?: never;
} & Omit<LinkProps, "to" | "className" | "children">;

export type ExternalLinkProps = BaseLinkProps & {
  to?: never;
  href: string;
} & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >;

export type CustomNavLinkProps = BaseLinkProps &
  Omit<NavLinkProps, "className" | "children">;
