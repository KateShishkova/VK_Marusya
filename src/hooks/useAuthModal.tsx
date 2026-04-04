import { AuthForm } from "@components/Auth/AuthForm";
import type { RootState } from "@store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useModal } from "./useModal";

export const useAuthModal = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const { openModal, closeModal, Modal } = useModal(<AuthForm />);

  useEffect(() => {
    if (isAuth) closeModal();
  }, [isAuth, closeModal]);

  return {
    openAuthModal: openModal,
    closeAuthModal: closeModal,
    AuthModal: Modal,
  };
};
