import type { IProfileTab } from "types/profileTab";

export const PROFILE_TABS: IProfileTab[] = [
  {
    iconName: "heart",
    label: "Избранные фильмы",
    linkTo: "ProfileFavoritesPage",
  },
  {
    iconName: "user",
    label: "Настройка аккаунта",
    linkTo: "ProfileSettingsPage",
  },
];
