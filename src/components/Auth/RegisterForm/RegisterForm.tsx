import type { FC, HTMLAttributes } from "react";
import styles from "./RegisterForm.module.scss";
import clsx from "clsx";
import { CustomInput } from "@components/UI/CustomInput";
import { Button } from "@components/UI/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterSchema, type UserRegister } from "@schemas/user.schema";
import { useRegisterUserMutation } from "@api/authApi";
import { getRtkErrorMessage } from "@utils/getRtkErrorMessage";

interface RegisterFormProps extends HTMLAttributes<HTMLFormElement> {
  onSuccessRegister?: () => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({
  onSuccessRegister,
  className,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserRegister>({
    resolver: zodResolver(userRegisterSchema),
  });

  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();

  const onSubmit = async (data: UserRegister) => {
    await registerUser(data).unwrap();
    onSuccessRegister?.();
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

      {isError && (
        <div className={styles["form__submit-error"]}>
          {getRtkErrorMessage(
            error,
            "Произошла ошибка. Проверьте введённые данные или попробуйте позже.",
          )}
        </div>
      )}

      <Button background="accent" type="submit" disabled={isLoading}>
        {isLoading ? "Создание..." : "Создать аккаунт"}
      </Button>
    </form>
  );
};
