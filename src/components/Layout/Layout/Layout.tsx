import clsx from "clsx";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Loader } from "@components/UI/Loader";
import { usePageTitle } from "@hooks/usePageTitle";

import { Header } from "../Header";
import { Footer } from "../Footer";
import styles from "./Layout.module.scss";

const routerLoader = (
  <section className={styles.section}>
    <div className={clsx("container", styles.section__container)}>
      <Loader />
    </div>
  </section>
);

export const Layout = () => {
  const pageTitle = usePageTitle();

  return (
    <>
      <Header />
      <main>
        <h1 className="visually-hidden">{pageTitle}</h1>
        <Suspense fallback={routerLoader}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};
