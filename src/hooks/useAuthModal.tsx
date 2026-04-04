import { AuthForm } from "@components/Auth/AuthForm";
import { Popup } from "@components/UI/Popup";
import type { RootState } from "@store/store";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useAuthModal = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const [isOpen, setIsOpen] = useState(false);

  const openAuthModal = useCallback(() => setIsOpen(true), []);
  const closeAuthModal = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (isAuth) setIsOpen(false);
  }, [isAuth]);

  const AuthModal = isOpen ? (
    <Popup onClose={closeAuthModal}>
      <AuthForm />
    </Popup>
  ) : null;

  return { openAuthModal, closeAuthModal, AuthModal };
};
