import { rest } from "msw";
import { API_CONFIG } from "@config/api";

export const handlers = [
  rest.get(
    `${API_CONFIG.BASE_URL}${API_CONFIG.PATHS.AUTH.PROFILE}`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          name: "Линус",
          surname: "Торвальдс",
          email: "linus@test.com",
          favorites: [],
        }),
      );
    },
  ),
];
