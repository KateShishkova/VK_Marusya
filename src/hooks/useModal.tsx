import { useCallback, useState, type ReactNode } from "react";
import { Popup, type PopupProps } from "@components/UI/Popup";

type PopupKind = PopupProps["kind"];

export const useModal = (
  modalContent: ReactNode = null,
  kind: PopupKind = "default",
) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const Modal = isOpen ? (
    <Popup kind={kind} onClose={closeModal}>
      {modalContent}
    </Popup>
  ) : null;

  return { openModal, closeModal, Modal };
};
