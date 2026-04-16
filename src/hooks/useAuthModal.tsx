import { useEffect } from "react";
import { useSelector } from "react-redux";

import { AuthForm } from "@components/Auth/AuthForm";
import type { RootState } from "@store/store";
import { useModal } from "./useModal";

export const useAuthModal = (onUserCancel?: () => void) => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const { openModal, closeModal, Modal } = useModal(
    <AuthForm />,
    "default",
    onUserCancel,
  );

  useEffect(() => {
    if (isAuth) closeModal();
  }, [isAuth, closeModal]);

  return {
    openAuthModal: openModal,
    closeAuthModal: closeModal,
    AuthModal: Modal,
  };
};
