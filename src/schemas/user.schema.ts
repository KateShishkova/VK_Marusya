import { z } from "zod";

// Schemas
export const userResponseSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.email(),
  favorites: z.array(z.string()),
});

export const userRegisterBaseSchema = userResponseSchema
  .omit({ favorites: true })
  .extend({
    name: z.string().nonempty("Заполните поле"),
    surname: z.string().nonempty("Заполните поле"),
    email: z.email("Укажите электронную почту в формате example@gmail.com"),
    password: z.string().min(8, "Пароль должен содержать не менее 8 символов"),
    repeatPassword: z.string().nonempty("Заполните поле"),
  });

export const userRegisterSchema = userRegisterBaseSchema.refine(
  (data) => data.password === data.repeatPassword,
  {
    message: "Пароли не совпадают",
    path: ["repeatPassword"],
  }
);

export const userLoginSchema = userRegisterBaseSchema.omit({
  name: true,
  surname: true,
  repeatPassword: true,
});

// Extracted types
export type UserResponse = z.infer<typeof userResponseSchema>;
export type UserRegister = z.infer<typeof userRegisterSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;
