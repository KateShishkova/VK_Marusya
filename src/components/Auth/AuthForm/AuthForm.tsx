import { useState } from "react";
import { LoginForm } from "../LoginForm";
import { RegisterForm } from "../RegisterForm";
import styles from "./AuthForm.module.scss";
import { Button } from "@components/UI/Button";

type TAuthState = "login" | "register" | "successRegister";

export const AuthForm = () => {
  const [authType, setAuthType] = useState<TAuthState>("login");

  const handleClick = () => {
    setAuthType((prevState) => (prevState === "login" ? "register" : "login"));
  };

  const handleRegisterSuccess = () => setAuthType("successRegister");

  let authContent;
  switch (authType) {
    case "login":
      authContent = (
        <>
          <LoginForm />
          <Button kind="plain" fontSize="small" onClick={handleClick}>
            Регистрация
          </Button>
        </>
      );
      break;

    case "register":
      authContent = (
        <>
          <h3 className={styles.auth__title}>Регистрация</h3>
          <RegisterForm onSuccessRegister={handleRegisterSuccess} />
          <Button kind="plain" fontSize="small" onClick={handleClick}>
            У меня есть пароль
          </Button>
        </>
      );
      break;

    case "successRegister":
      authContent = (
        <>
          <h3 className={styles.auth__title}>Регистрация завершена</h3>
          <p className={styles.auth__text}>
            Используйте вашу электронную почту для входа
          </p>
          <Button background="accent" onClick={handleClick}>
            Войти
          </Button>
        </>
      );
      break;
  }

  return (
    <div className={styles.auth}>
      <img
        className={styles.auth__logo}
        src="src/assets/images/logo--lg.png"
        alt="Логотип ВK Маруся"
        width={132}
        height={29}
      />
      <div className={styles.auth__wrapper}>{authContent}</div>
    </div>
  );
};
