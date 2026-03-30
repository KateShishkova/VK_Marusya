import type { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

type TPlainButtonProps = {
  kind: "plain";
  type?: "submit" | "reset" | "button";

  children: React.ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

type TRegularButtonProps = {
  kind?: "regular";
  type?: "submit" | "reset" | "button";

  shape?: "rectangle" | "rectangle-small" | "circle" | "circle-small";
  background?: "primary" | "accent" | "white";
  children: React.ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

type TButtonProps = TPlainButtonProps | TRegularButtonProps;

export const Button: FC<TButtonProps> = (props) => {
  if (props.kind === "plain") {
    const { className, children, type = "button", ...rest } = props;
    
    const finalClassName = clsx(styles.btn, styles["btn--plain"], className);

    return (
      <button className={finalClassName} type={type} {...rest}>
        {children}
      </button>
    );
  }

  // Kind === "button"
  const {
    shape = "rectangle",
    background = "primary",
    className,
    children,
    type = "button",
    ...rest
  } = props;

  const finalClassName = clsx(
    styles.btn,
    styles[`btn--${shape}`],
    styles[`btn--${background}`],
    className,
  );

  return (
    <button className={finalClassName} type={type} {...rest}>
      {children}
    </button>
  );
};
