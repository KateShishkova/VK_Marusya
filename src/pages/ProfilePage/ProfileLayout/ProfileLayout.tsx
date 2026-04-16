import clsx from "clsx";
import { Outlet } from "react-router-dom";
import { ProfileNavList } from "@components/Profile/ProfileNavList";
import styles from "./ProfileLayout.module.scss";

const ProfileLayout = () => {
  return (
    <>
      <section className={clsx("section", styles.section)}>
        <div className="container">
          <div className={styles.section__wrapper}>
            <h2 className={styles.section__title}>Мой аккаунт</h2>
            <ProfileNavList />
          </div>
        </div>
      </section>

      <Outlet />
    </>
  );
};

export default ProfileLayout;
