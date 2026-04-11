import type { ReactNode } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { usePageTitle } from "@hooks/usePageTitle";

export const Layout = ({ children }: { children: ReactNode }) => {
  const pageTitle = usePageTitle();

  return (
    <>
      <Header />
      <main>
        <h1 className="visually-hidden">{pageTitle}</h1>
        {children}
      </main>
      <Footer />
    </>
  );
};
