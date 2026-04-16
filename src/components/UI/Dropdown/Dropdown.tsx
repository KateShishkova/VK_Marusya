import clsx from "clsx";
import { useRef, useEffect } from "react";
import type { FC, HTMLAttributes, ReactNode, RefObject } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./Dropdown.module.scss";

const TRANSITION_TIMEOUT = 300;

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  children: ReactNode;
  onClose?: () => void;
  boundaryRef?: RefObject<HTMLElement | null>;
}

export const Dropdown: FC<DropdownProps> = ({
  open,
  children,
  onClose,
  boundaryRef,
  className,
  ...props
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handles click out of the Dropdown to close it
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const boundaryNode = boundaryRef?.current ?? dropdownRef.current;

      if (boundaryNode && !boundaryNode.contains(target)) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose, boundaryRef]);

  const finalClassName = clsx(styles.dropdown, className);

  return (
    <CSSTransition
      in={open}
      timeout={TRANSITION_TIMEOUT}
      classNames={{
        enter: styles.dropdownEnter,
        enterActive: styles.dropdownEnterActive,
        exit: styles.dropdownExit,
        exitActive: styles.dropdownExitActive,
      }}
      unmountOnExit
      nodeRef={dropdownRef}
    >
      <div ref={dropdownRef} className={finalClassName} {...props}>
        {children}
      </div>
    </CSSTransition>
  );
};
