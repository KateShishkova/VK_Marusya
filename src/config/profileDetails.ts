import { getFullName } from "@utils/getFullName";
import { getUserInitials } from "@utils/getUserInitials";
import type { ProfileDetail } from "@app-types/profileDetail";

export const PROFILE_DETAILS: ProfileDetail[] = [
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
