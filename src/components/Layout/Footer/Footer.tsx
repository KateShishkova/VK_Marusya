import clsx from "clsx";
import type { FC } from "react";
import { Socials } from "@components/UI/Socials";
import styles from "./Footer.module.scss";

export const Footer: FC = () => {
  return (
    <footer className={clsx("section", styles.footer)}>
      <div className="container">
        <div className={styles.footer__wrapper}>
          <Socials />
        </div>
      </div>
    </footer>
  );
};
