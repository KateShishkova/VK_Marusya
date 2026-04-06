import type { ReactNode } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
