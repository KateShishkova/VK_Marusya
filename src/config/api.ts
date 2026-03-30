export const API_CONFIG = {
  BASE_URL: "https://cinemaguide.skillbox.cc",
  PATHS: {
    AUTH: {
      LOGIN: "/auth/login", // POST
      REGISTER: "/user", // POST
      LOGOUT: "/auth/logout", // GET
      PROFILE: "/profile", // GET
    },
    FAVORITES: {
      ROOT: "/favorites", // GET, POST
      BY_ID: (movieId: number | string) => `/favorites/${movieId}`, // DELETE
    },
    MOVIE: {
      ROOT: "/movie", // GET
      TOP10: "/movie/top10", // GET
      GENRES: "/movie/genres", // GET
      BY_ID: (movieId: number | string) => `/movie/${movieId}`, // GET
      RANDOM: "/movie/random", // GET
    },
  },
  MOVIES_LIMIT: 50,
  TIMEOUT: 10000,
};
