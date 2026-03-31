import { type FC, type HTMLAttributes } from "react";
import styles from "./LoginForm.module.scss";
import clsx from "clsx";
import { CustomInput } from "@components/UI/CustomInput";
import { Button } from "@components/UI/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginSchema, type TUserLogin } from "@schemas/user.schema";
import { authApi, useLoginMutation } from "@api/authApi";
import { getRtkErrorMessage } from "@utils/getRtkErrorMessage";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@store/store";

interface ILoginForm extends HTMLAttributes<HTMLFormElement> {}

export const LoginForm: FC<ILoginForm> = ({ className, ...props }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TUserLogin>({
    resolver: zodResolver(userLoginSchema),
  });

  const [login, { isLoading, isError, error }] = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: TUserLogin) => {
    try {
      await login(data).unwrap();
      await dispatch(
        authApi.endpoints.fetchProfile.initiate(undefined, {
          forceRefetch: true,
        }),
      );
    } catch (e) {}
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
