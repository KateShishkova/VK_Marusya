import { Outlet } from "react-router-dom";
import { usePageTitle } from "@hooks/usePageTitle";
import { Header } from "../Header";
import { Footer } from "../Footer";

export const Layout = () => {
  const pageTitle = usePageTitle();

  return (
    <>
      <Header />
      <main>
        <h1 className="visually-hidden">{pageTitle}</h1>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
