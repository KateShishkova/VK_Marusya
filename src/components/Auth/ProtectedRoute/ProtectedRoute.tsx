import clsx from "clsx";
import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Loader } from "@components/UI/Loader";
import { PATHS } from "@config/paths";
import { useAuthModal } from "@hooks/useAuthModal";
import type { RootState } from "@store/store";

import styles from "./ProtectedRoute.module.scss";

export const ProtectedRoute = () => {
  const { isAuth, authStatus } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const hasOpenedModalRef = useRef(false);

  const handleUserCancel = () => {
    if (!isAuth) {
      navigate(PATHS.HOME, {
        replace: true,
        state: { from: location.pathname },
      });
    }
  };

  const { openAuthModal, AuthModal } = useAuthModal(handleUserCancel);

  useEffect(() => {
    if (authStatus === "guest" && !hasOpenedModalRef.current) {
      hasOpenedModalRef.current = true;
      openAuthModal();
    }
  }, [authStatus, openAuthModal]);

  useEffect(() => {
    if (authStatus === "authenticated") {
      hasOpenedModalRef.current = false;
    }
  }, [authStatus]);

  if (authStatus === "loading") {
    return (
      <section className={styles.section}>
        <div className={clsx("container", styles.section__container)}>
          <Loader />
        </div>
      </section>
    );
  }

  if (authStatus === "authenticated") {
    return <Outlet />;
  }

  return <>{AuthModal}</>;
};
