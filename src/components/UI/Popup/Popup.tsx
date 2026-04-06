import clsx from "clsx";
import { useRef, useEffect, useState } from "react";
import type { FC, ReactNode, MouseEvent, SyntheticEvent } from "react";
import { Button } from "../Button";
import { Icon } from "../Icon";
import styles from "./Popup.module.scss";

export interface PopupProps {
  children: ReactNode;
  kind?: "default" | "video";
  onClose?: () => void;
}

export const Popup: FC<PopupProps> = ({
  children,
  kind = "default",
  onClose,
}) => {
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

  const finalClassName = clsx(
    styles.popup,
    kind === "video" && styles["popup--video"],
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
    >
      <div className={styles.popup__wrapper}>{children}</div>
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
};
