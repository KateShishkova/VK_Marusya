import type { ProfileTab } from "@app-types/profileTab";
import { PATHS } from "./paths";

export const PROFILE_TABS: ProfileTab[] = [
  {
    iconName: "heart",
    label: "Избранные фильмы",
    shortLabel: "Избранное",
    linkTo: PATHS.PROFILE.FAVORITES,
  },
  {
    iconName: "user",
    label: "Настройка аккаунта",
    shortLabel: "Настройки",
    linkTo: PATHS.PROFILE.SETTINGS,
  },
];
