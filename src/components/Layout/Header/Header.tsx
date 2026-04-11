import clsx from "clsx";
import { type FC } from "react";
import { useSelector } from "react-redux";

import logoMd from '@assets/images/logo--md.png'

import { Button } from "@components/UI/Button";
import { CustomLink } from "@components/UI/CustomLink";
import { SearchBar } from "@components/Search/SearchBar";
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
            href="#"
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
            <CustomLink
              className={styles["header__nav-item"]}
              isActive={true}
              href="#"
            >
              Главная
            </CustomLink>
            <CustomLink className={styles["header__nav-item"]} href="#">
              Жанры
            </CustomLink>
            <div
              className={clsx(
                styles["header__nav-item"],
                styles["header__nav-item--search"],
              )}
            >
              <SearchBar />
            </div>

            {isAuth ? (
              <CustomLink
                className={clsx(
                  styles["header__nav-item"],
                  styles["header__nav-item--end"],
                )}
                href="#"
              >
                {user?.name ?? "Профиль"}
              </CustomLink>
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
