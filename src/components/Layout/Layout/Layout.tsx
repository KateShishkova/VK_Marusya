import type { ReactNode } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
