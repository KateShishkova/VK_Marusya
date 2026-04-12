import type { ProfileTab } from "@app-types/profileTab";
import { PATHS } from "./paths";

export const PROFILE_TABS: ProfileTab[] = [
  {
    iconName: "heart",
    label: "Избранные фильмы",
    linkTo: PATHS.PROFILE.FAVORITES,
  },
  {
    iconName: "user",
    label: "Настройка аккаунта",
    linkTo: PATHS.PROFILE.SETTINGS,
  },
];
