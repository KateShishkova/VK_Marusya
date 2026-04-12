import clsx from "clsx";
import { type FC } from "react";
import { useSelector } from "react-redux";

import logoMd from "@assets/images/logo--md.png";

import { Button } from "@components/UI/Button";
import { CustomLink, CustomNavLink } from "@components/UI/CustomLink";
import { SearchBar } from "@components/Search/SearchBar";
import { PATHS } from "@config/paths";
import { useAuthModal } from "@hooks/useAuthModal";
import type { RootState } from "@store/store";

import styles from "./Header.module.scss";

export const Header: FC = () => {
  const { isAuth, user } = useSelector((state: RootState) => state.user);
  const { openAuthModal, AuthModal } = useAuthModal();

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__wrapper}>
          <CustomLink
            to={PATHS.HOME}
            kind="img"
            className={styles["header__logo-link"]}
            aria-label="На главную"
          >
            <img
              className={styles["header__logo-image"]}
              src={logoMd}
              alt="Логотип ВK Маруся"
              width={144}
              height={32}
            />
          </CustomLink>
          <nav className={styles.header__nav}>
            <CustomNavLink
              to={PATHS.HOME}
              end={true}
              className={styles["header__nav-item"]}
            >
              Главная
            </CustomNavLink>
            <CustomNavLink
              to={PATHS.GENRES.ROOT}
              className={styles["header__nav-item"]}
            >
              Жанры
            </CustomNavLink>
            <div
              className={clsx(
                styles["header__nav-item"],
                styles["header__nav-item--search"],
              )}
            >
              <SearchBar />
            </div>

            {isAuth ? (
              <CustomNavLink
                to={PATHS.PROFILE.ROOT}
                className={clsx(
                  styles["header__nav-item"],
                  styles["header__nav-item--end"],
                )}
              >
                {user?.name ?? "Профиль"}
              </CustomNavLink>
            ) : (
              <>
                <Button
                  kind="plain"
                  className={clsx(
                    styles["header__nav-item"],
                    styles["header__nav-item--end"],
                  )}
                  onClick={openAuthModal}
                >
                  Войти
                </Button>
                {AuthModal}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
