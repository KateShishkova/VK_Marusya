import clsx from "clsx";
import { type FC } from "react";

import logoHeader from "@assets/images/logo-header.png";
import logoHeaderMobile from "@assets/images/logo-header--mobile.png";

import { CustomLink } from "@components/UI/CustomLink";
import { PATHS } from "@config/paths";
import { useAuthModal } from "@hooks/useAuthModal";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useSearchModal } from "@hooks/useSearchModal";

import { HeaderNav } from "./HeaderNav";
import styles from "./Header.module.scss";

export const Header: FC = () => {
  const { isOpenSearchModal, openSearchModal, SearchModal } = useSearchModal();
  const { openAuthModal, AuthModal } = useAuthModal();

  const isMobileSm = useMediaQuery("mobile-sm");

  // Logo
  const logoContent = (
    <CustomLink
      to={PATHS.HOME}
      kind="img"
      className={styles["header__logo-link"]}
      aria-label="На главную"
    >
      {isMobileSm ? (
        <img
          className={styles["header__logo-image"]}
          src={logoHeaderMobile}
          alt="Логотип ВK Маруся"
          width={81}
          height={18}
        />
      ) : (
        <img
          className={styles["header__logo-image"]}
          src={logoHeader}
          alt="Логотип ВK Маруся"
          width={144}
          height={32}
        />
      )}
    </CustomLink>
  );

  const finalClassName = clsx(
    "section",
    styles.header,
    isOpenSearchModal && styles["header--open-modal"],
  );

  return (
    <header className={finalClassName}>
      <div className="container">
        <div className={styles.header__wrapper}>
          {logoContent}
          <HeaderNav
            openSearchModal={openSearchModal}
            openAuthModal={openAuthModal}
          />

          {SearchModal}
          {AuthModal}
        </div>
      </div>
    </header>
  );
};
