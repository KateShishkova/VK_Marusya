import type { UserResponse } from "@schemas/user.schema";

export interface ProfileDetail {
  iconName: string | null;
  getIconContent: ((user: UserResponse) => string) | null;
  label: string;
  getValue: (user: UserResponse) => string;
}