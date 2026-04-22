import clsx from "clsx";
import type { FC } from "react";
import { useSelector } from "react-redux";

import { Button } from "@components/UI/Button";
import { CustomNavLink } from "@components/UI/CustomLink";
import { Icon } from "@components/UI/Icon";
import { Loader } from "@components/UI/Loader";
import { SearchBar } from "@components/Search/SearchBar";
import { PATHS } from "@config/paths";
import { useMediaQuery } from "@hooks/useMediaQuery";
import type { RootState } from "@store/store";

import styles from "./Header.module.scss";

interface HeaderNavProps {
  openSearchModal?: () => void;
  openAuthModal?: () => void;
}

export const HeaderNav: FC<HeaderNavProps> = ({
  openSearchModal,
  openAuthModal,
}) => {
  const { user, authStatus } = useSelector((state: RootState) => state.user);

  const isMobile = useMediaQuery("mobile");
  const isTablet = useMediaQuery("tablet");

  // Home link content
  const homeLinkContent = isMobile ? null : (
    <CustomNavLink
      to={PATHS.HOME}
      end={true}
      className={styles["header__nav-item"]}
    >
      Главная
    </CustomNavLink>
  );

  // Genres link content
  const genresLinkContent = (
    <CustomNavLink
      kind={isMobile ? "icon" : undefined}
      to={PATHS.GENRES.ROOT}
      className={styles["header__nav-item"]}
      aria-label={isMobile ? "Открыть страницу со списком жанров" : undefined}
    >
      {isMobile ? <Icon name="menu" /> : "Жанры"}
    </CustomNavLink>
  );

  // Search content
  const searchContentClassName = clsx(
    styles["header__nav-item"],
    (isMobile || isTablet) && styles["header__nav-item--search-btn"],
    !isMobile && !isTablet && styles["header__nav-item--search"],
  );

  const searchContent =
    isMobile || isTablet ? (
      <Button
        kind="plain"
        type="button"
        aria-label={isMobile ? "Поиск фильма по названию" : undefined}
        className={searchContentClassName}
        onClick={openSearchModal}
      >
        {isMobile ? <Icon name="search" /> : "Поиск"}
      </Button>
    ) : (
      <div className={searchContentClassName}>
        <SearchBar />
      </div>
    );

  // Auth content
  let authContent;
  const authContentClassName = clsx(
    styles["header__nav-item"],
    styles["header__nav-item--end"],
  );

  switch (authStatus) {
    case "loading":
      authContent = (
        <div className={authContentClassName}>
          <Loader size="small" />
        </div>
      );
      break;

    case "authenticated":
      authContent = (
        <CustomNavLink
          kind={isMobile ? "icon" : undefined}
          to={PATHS.PROFILE.ROOT}
          className={authContentClassName}
          aria-label={isMobile ? "Открыть страницу профиля" : undefined}
        >
          {isMobile ? <Icon name="user" /> : (user?.name ?? "Профиль")}
        </CustomNavLink>
      );
      break;

    case "guest":
      authContent = (
        <Button
          kind="plain"
          className={authContentClassName}
          onClick={openAuthModal}
          aria-label={isMobile ? "Войти в приложение" : undefined}
        >
          {isMobile ? <Icon name="user" /> : "Войти"}
        </Button>
      );
      break;
  }

  return (
    <nav className={styles.header__nav}>
      {homeLinkContent}
      {genresLinkContent}
      {searchContent}
      {authContent}
    </nav>
  );
};
