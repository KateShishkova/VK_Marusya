import type { UserResponse } from "@schemas/user.schema";

export const getFullName = (user: UserResponse) => {
  const first = user.name ?? "";
  const last = user.surname ?? "";
  return [first, last].filter(Boolean).join(" ").trim();
};
