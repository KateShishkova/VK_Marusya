import { useState, type FC, type HTMLAttributes } from "react";
import styles from "./LoginForm.module.scss";
import clsx from "clsx";
import { CustomInput } from "@components/UI/CustomInput";
import { Button } from "@components/UI/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginSchema, type TUserLogin } from "@schemas/user.schema";
import { useLoginMutation } from "@api/authApi";

interface ILoginForm extends HTMLAttributes<HTMLFormElement> {}

export const LoginForm: FC<ILoginForm> = ({ className, ...props }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TUserLogin>({
    resolver: zodResolver(userLoginSchema),
  });

  const [login, { isLoading }] = useLoginMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: TUserLogin) => {
    setSubmitError(null);
    try {
      await login(data).unwrap();
    } catch (e: any) {
      const message =
        e?.data?.message || e?.message || "Произошла ошибка регистрации";
      setSubmitError(message);
    }
  };

  const finalClassName = clsx(styles.form, className);

  return (
    <form
      className={finalClassName}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className={styles["form__field-wrapper"]}>
        <CustomInput
          type="email"
          placeholder="Электронная почта"
          iconName="email"
          theme="light"
          errorMessage={errors.email?.message}
          {...register("email")}
        />
        <CustomInput
          type="password"
          placeholder="Пароль"
          iconName="key"
          theme="light"
          errorMessage={errors.password?.message}
          {...register("password")}
        />
      </div>

      {submitError && (
        <div className={styles["form__submit-error"]}>{submitError}</div>
      )}

      <Button background="accent" type="submit" disabled={isLoading}>
        {isLoading ? "Вход..." : "Войти"}
      </Button>
    </form>
  );
};
