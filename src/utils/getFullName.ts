import type { TUserResponse } from "@schemas/user.schema";

export const getFullName = (user: TUserResponse) => {
  const first = user.name ?? "";
  const last = user.surname ?? "";
  return [first, last].filter(Boolean).join(" ").trim();
};
