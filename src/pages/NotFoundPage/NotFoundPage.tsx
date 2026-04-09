import clsx from "clsx";
import styles from "./NotFoundPage.module.scss";

export const NotFoundPage = () => {
  return (
    <section className={styles.section}>
      <div className={clsx("container", styles.section__container)}>
        <div className={styles.section__wrapper}>
          <h2 className={styles.section__title}>404 - страница не найдена</h2>
          <p className={styles.section__desc}>
            Извините, эта страница удалена или её никогда не существовало.
            Попробуйте вернуться на Главную или воспользуйтесь поиском
          </p>
        </div>
      </div>
    </section>
  );
};
