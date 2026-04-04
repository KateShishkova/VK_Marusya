import { Popup } from "@components/UI/Popup";
import { useCallback, useState, type ReactNode } from "react";

export const useModal = (modalContent: ReactNode = null) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const Modal = isOpen ? (
    <Popup onClose={closeModal}>{modalContent}</Popup>
  ) : null;

  return { openModal, closeModal, Modal };
};
