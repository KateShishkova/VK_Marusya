import type { FC } from "react";
import styles from "./Footer.module.scss";
import { Socials } from "@components/UI/Socials";

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__wrapper}>
          <Socials />
        </div>
      </div>
    </footer>
  );
};
