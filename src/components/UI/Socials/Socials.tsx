import type { FC, HTMLAttributes } from "react";
import { CustomLink } from "../CustomLink";
import { Icon } from "../Icon";
import { SOCIALS } from "@config/socials";
import styles from "./Socials.module.scss";
import clsx from "clsx";

type SocialsProps = HTMLAttributes<HTMLUListElement>;

export const Socials: FC<SocialsProps> = ({ className, ...props }) => {
  const finalClassName = clsx(styles.socials, className);

  return (
    <ul
      aria-label="Страницы ВК Маруся в социальных сетях"
      className={finalClassName}
      {...props}
    >
      {SOCIALS.map((item) => {
        return (
          <li key={item.id}>
            <CustomLink kind="icon" href={item.url} aria-label={item.name}>
              <Icon name={item.iconName} />
            </CustomLink>
          </li>
        );
      })}
    </ul>
  );
};
