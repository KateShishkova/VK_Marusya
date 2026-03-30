import { getFullName } from "@utils/getFullName";
import { getUserInitials } from "@utils/getUserInitials";
import type { IProfileDetail } from "types/profileDetail";

export const PROFILE_DETAILS: IProfileDetail[] = [
  {
    iconName: null,
    getIconContent: getUserInitials,
    label: "Имя Фамилия",
    getValue: getFullName,
  },
  {
    iconName: 'email',
    getIconContent: null,
    label: "Электронная почта",
    getValue: (user) => user.email,
  },
];
