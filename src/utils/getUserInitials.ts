import type { UserResponse } from "@schemas/user.schema";

export const getUserInitials = (user: UserResponse) => {
  const first = user.name?.[0] ?? "";
  const second = user.surname?.[0] ?? "";

  return (first + second).toUpperCase();
};
