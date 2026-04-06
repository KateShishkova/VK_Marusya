import type { ProfileTab } from "@app-types/profileTab";

export const PROFILE_TABS: ProfileTab[] = [
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
