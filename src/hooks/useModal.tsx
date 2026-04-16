import { useCallback, useState, type ReactNode } from "react";
import { Popup, type PopupProps } from "@components/UI/Popup";

type PopupKind = PopupProps["kind"];

export const useModal = (
  modalContent: ReactNode = null,
  kind: PopupKind = "default",
  onUserCancel?: () => void,
) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  const userCancelModal = useCallback(() => {
    setIsOpen(false);
    onUserCancel?.();
  }, [onUserCancel]);

  const Modal = isOpen ? (
    <Popup kind={kind} onClose={userCancelModal}>
      {modalContent}
    </Popup>
  ) : null;

  return { openModal, closeModal, userCancelModal, Modal };
};
