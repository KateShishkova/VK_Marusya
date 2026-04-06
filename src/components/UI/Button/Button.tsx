import type { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

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
  // Kind === "plain"
  if (props.kind === "plain") {
    const {
      type = "button",
      fontSize = "medium",
      children,
      className,
      ...rest
    } = props;

    const finalClassName = clsx(
      styles.btn,
      styles[`btn--font-${fontSize}`],
      styles["btn--plain"],
      className,
    );

    return (
      <button className={finalClassName} type={type} {...rest}>
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
