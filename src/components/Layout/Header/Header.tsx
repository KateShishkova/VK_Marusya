import { useState, type FC } from "react";
import styles from "./Header.module.scss";
import clsx from "clsx";
import { CustomLink } from "@components/UI/CustomLink";
import { SearchBar } from "@components/Search/SearchBar/SearchBar";
import { useSelector } from "react-redux";
import type { RootState } from "@store/store";
import { Popup } from "@components/UI/Popup";
import { AuthForm } from "@components/Auth/AuthForm";
import { Button } from "@components/UI/Button";

export const Header: FC = () => {
  const { isAuth, user } = useSelector((state: RootState) => state.user);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

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
              src="src/assets/images/logo--md.png"
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
                {user?.name}
              </CustomLink>
            ) : (
              <>
                <Button
                  kind="plain"
                  className={clsx(
                    styles["header__nav-item"],
                    styles["header__nav-item--end"],
                  )}
                  onClick={() => setAuthModalOpen(true)}
                >
                  Войти
                </Button>
                {isAuthModalOpen && (
                  <Popup onClose={() => setAuthModalOpen(false)}>
                    <AuthForm />
                  </Popup>
                )}
              </>
            )}

          </nav>
        </div>
      </div>
    </header>
  );
};
