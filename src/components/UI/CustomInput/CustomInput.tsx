import clsx from "clsx";
import type { FC, InputHTMLAttributes } from "react";
import { Icon } from "../Icon";
import styles from "./CustomInput.module.scss";
import { Button } from "../Button";

interface ICustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: "text" | "email" | "password" | "search";
  placeholder: string;
  errorMessage?: string;
  iconName?: string;
  hasReset?: boolean;
  theme?: "dark" | "light";
}

export const CustomInput: FC<ICustomInputProps> = ({
  name,
  type,
  placeholder,
  errorMessage,
  iconName,
  hasReset = type === "search",
  theme = "dark",
  className,
  ...props
}) => {
  const hasIcon = Boolean(iconName);

  const finalClassName = clsx(
    styles[`custom-input`],
    theme !== "dark" && styles[`custom-input--${theme}`],
    hasIcon && styles["custom-input--icon"],
    errorMessage && styles["custom-input--error"],
    hasReset && styles["custom-input--reset"],
    className,
  );

  return (
    <div className={finalClassName}>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={styles["custom-input__field"]}
        {...props}
      />
      {iconName && (
        <Icon name={iconName} className={styles["custom-input__icon"]} />
      )}
      {hasReset && (
        <Button
          className={styles["custom-input__reset"]}
          kind="plain"
          type="reset"
          aria-label="Очистить поле"
        >
          <Icon name="close" />
        </Button>
      )}
      {errorMessage && (
        <span className={styles["custom-input__error-text"]}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};
