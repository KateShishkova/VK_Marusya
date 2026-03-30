import type { TUserResponse } from "@schemas/user.schema";

export interface IProfileDetail {
  iconName: string | null;
  getIconContent: ((user: TUserResponse) => string) | null;
  label: string;
  getValue: (user: TUserResponse) => string;
}