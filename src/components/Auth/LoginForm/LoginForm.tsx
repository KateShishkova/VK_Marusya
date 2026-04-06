import clsx from "clsx";
import { type FC, type HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLoginMutation } from "@api/authApi";
import { Button } from "@components/UI/Button";
import { CustomInput } from "@components/UI/CustomInput";
import { userLoginSchema, type UserLogin } from "@schemas/user.schema";
import { getRtkErrorMessage } from "@utils/getRtkErrorMessage";

import styles from "./LoginForm.module.scss";

type LoginFormProps = HTMLAttributes<HTMLFormElement>;

export const LoginForm: FC<LoginFormProps> = ({ className, ...props }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserLogin>({
    resolver: zodResolver(userLoginSchema),
  });

  const [login, { isLoading, isError, error }] = useLoginMutation();

  const onSubmit = async (data: UserLogin) => {
    await login(data).unwrap();
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

      {isError && (
        <div className={styles["form__submit-error"]}>
          {getRtkErrorMessage(
            error,
            "Произошла ошибка. Проверьте введённые данные или попробуйте позже.",
          )}
        </div>
      )}

      <Button background="accent" type="submit" disabled={isLoading}>
        {isLoading ? "Вход..." : "Войти"}
      </Button>
    </form>
  );
};
