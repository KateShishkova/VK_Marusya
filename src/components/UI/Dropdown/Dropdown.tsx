import clsx from "clsx";
import { useRef, useEffect } from "react";
import type { FC, HTMLAttributes, ReactNode } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./Dropdown.module.scss";

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  children: ReactNode;
  onClose?: () => void;
}

export const Dropdown: FC<DropdownProps> = ({
  open,
  children,
  onClose,
  className,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Handles click out of the Dropdown to close it
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  const finalClassName = clsx(styles.dropdown, className);

  return (
    <CSSTransition
      in={open}
      timeout={300}
      classNames={{
        enter: styles.dropdownEnter,
        enterActive: styles.dropdownEnterActive,
        exit: styles.dropdownExit,
        exitActive: styles.dropdownExitActive,
      }}
      unmountOnExit
      nodeRef={ref}
    >
      <div ref={ref} className={finalClassName} {...props}>
        {children}
      </div>
    </CSSTransition>
  );
};
