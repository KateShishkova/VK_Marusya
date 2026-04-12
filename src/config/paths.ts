export const PATHS = {
  HOME: "/",
  GENRES: {
    ROOT: "/genres",
    BY_GENRE: `/genres/:genreEn`,
  },
  MOVIES: {
    ROOT: "/movies",
    BY_ID: `/movies/:movieId`,
  },
  PROFILE: {
    ROOT: "/profile",
    SEGMENTS: {
      FAVORITES: "favorites",
      SETTINGS: "settings",
    },
    FAVORITES: "/profile/favorites",
    SETTINGS: "/profile/settings",
  },

  NOT_FOUND: "/404",
} as const;
