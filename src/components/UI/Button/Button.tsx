import clsx from "clsx";
import type { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.scss";

type PlainButtonProps = {
  kind: "plain";
  type?: "submit" | "reset" | "button";

  fontSize?: "medium" | "small";
  children: React.ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

type RegularButtonProps = {
  kind?: "regular";
  type?: "submit" | "reset" | "button";

  shape?: "rectangle" | "rectangle-small" | "circle" | "circle-small";
  background?: "primary" | "accent" | "white";
  children: React.ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

type ButtonProps = PlainButtonProps | RegularButtonProps;

export const Button: FC<ButtonProps> = (props) => {
  const { kind, ...rest } = props;

  // Kind === "plain"
  if (kind === "plain") {
    const {
      type = "button",
      fontSize = "medium",
      children,
      className,
      ...buttonProps
    } = rest as PlainButtonProps;

    const finalClassName = clsx(
      styles.btn,
      styles[`btn--font-${fontSize}`],
      styles["btn--plain"],
      className,
    );

    return (
      <button className={finalClassName} type={type} {...buttonProps}>
        {children}
      </button>
    );
  }

  // Kind === "button"
  const {
    type = "button",
    shape = "rectangle",
    background = "primary",
    children,
    className,
    ...buttonProps
  } = rest as RegularButtonProps;

  const finalClassName = clsx(
    styles.btn,
    styles[`btn--${shape}`],
    styles[`btn--${background}`],
    className,
  );

  return (
    <button className={finalClassName} type={type} {...buttonProps}>
      {children}
    </button>
  );
};
