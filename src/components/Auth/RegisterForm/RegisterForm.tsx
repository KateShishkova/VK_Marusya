import type { FC, HTMLAttributes } from "react";
import { useState } from "react";
import styles from "./RegisterForm.module.scss";
import clsx from "clsx";
import { CustomInput } from "@components/UI/CustomInput";
import { Button } from "@components/UI/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterSchema, type TUserRegister } from "@schemas/user.schema";
import { useRegisterUserMutation } from "@api/authApi";

interface IRegisterForm extends HTMLAttributes<HTMLFormElement> {
  onSuccessRegister?: () => void;
}

export const RegisterForm: FC<IRegisterForm> = ({
  onSuccessRegister,
  className,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TUserRegister>({
    resolver: zodResolver(userRegisterSchema),
  });

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: TUserRegister) => {
    setSubmitError(null);
    try {
      await registerUser(data).unwrap();
      onSuccessRegister?.();
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
          type="text"
          placeholder="Имя"
          iconName="user"
          theme="light"
          errorMessage={errors.name?.message}
          {...register("name")}
        />
        <CustomInput
          type="text"
          placeholder="Фамилия"
          iconName="user"
          theme="light"
          errorMessage={errors.surname?.message}
          {...register("surname")}
        />
        <CustomInput
          type="password"
          placeholder="Пароль"
          iconName="key"
          theme="light"
          errorMessage={errors.password?.message}
          {...register("password")}
        />
        <CustomInput
          type="password"
          placeholder="Подтвердите пароль"
          iconName="key"
          theme="light"
          errorMessage={errors.repeatPassword?.message}
          {...register("repeatPassword")}
        />
      </div>

      {submitError && (
        <div className={styles["form__submit-error"]}>{submitError}</div>
      )}

      <Button background="accent" type="submit" disabled={isLoading}>
        {isLoading ? "Создание..." : "Создать аккаунт"}
      </Button>
    </form>
  );
};
