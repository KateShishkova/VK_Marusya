import clsx from "clsx";
import {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import type { ReactNode, MouseEvent, SyntheticEvent } from "react";

import { Button } from "../Button";
import { Icon } from "../Icon";
import styles from "./Popup.module.scss";

export interface PopupProps {
  children: ReactNode | ((popupHandle: PopupHandle) => ReactNode);
  kind?: "default" | "video" | "search";
  onClose?: () => void;
}

export interface PopupHandle {
  startClosing: () => void;
  isMounted: boolean;
}

export const Popup = forwardRef<PopupHandle, PopupProps>(function Popup(
  { children, kind = "default", onClose },
  ref,
) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Adds scroll-lock to body when Popup opens and removes it when Popup closes
  useEffect(() => {
    document.body.classList.add("scroll-lock");

    return () => {
      document.body.classList.remove("scroll-lock");
    };
  }, []);

  // Opens <dialog> as a modal window on mount
  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
    const timer = setTimeout(() => setIsMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Closing after animation
  const startClosing = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing && onClose) {
      onClose();
    }
  };

  // Handles click on the backdrop area to close the Popup
  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      startClosing();
    }
  };

  // Handles the native <dialog> cancel event to close the Popup
  const handleCancel = (e: SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    startClosing();
  };

  // Export the Popup close function
  useImperativeHandle(ref, () => ({
    startClosing,
    isMounted,
  }));

  const popupHandle: PopupHandle = { startClosing, isMounted };
  const popupContent =
    typeof children === "function" ? children(popupHandle) : children;

  const finalClassName = clsx(
    styles.popup,
    kind !== "default" && styles[`popup--${kind}`],
    isClosing && styles["popup--close"],
  );

  return (
    <dialog
      ref={dialogRef}
      className={finalClassName}
      onClick={handleBackdropClick}
      onCancel={handleCancel}
      onAnimationEnd={handleAnimationEnd}
      data-video={kind === "video" || undefined}
      data-mounted={isMounted || undefined}
      data-closing={isClosing || undefined}
      data-testid="modal"
    >
      <div className={styles.popup__wrapper}>{popupContent}</div>
      <Button
        shape="circle"
        background="white"
        className={styles.popup__close}
        onClick={startClosing}
        aria-label="Закрыть модальное окно"
      >
        <Icon name="close" />
      </Button>
    </dialog>
  );
});
