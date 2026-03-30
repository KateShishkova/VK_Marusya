import type { TUserResponse } from "@schemas/user.schema";

export const getUserInitials = (user: TUserResponse) => {
  const first = user.name?.[0] ?? '';
  const second = user.surname?.[0] ?? '';

  return (first + second).toUpperCase();
}