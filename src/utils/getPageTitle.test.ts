import { matchPath } from "react-router-dom";
import { getPageTitle } from "./getPageTitle";

jest.mock("react-router-dom", () => ({
  matchPath: jest.fn(),
}));

jest.mock("@config/pageTitles", () => ({
  PAGE_TITLES: {
    "/genres": "Жанры",
    "/genres/:title": (context: { genreTitle: string }) => `Жанр ${context.genreTitle}`,
  },
  BASE_TITLE: "VK Marusya",
}));

describe("getPageTitle", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Возвращает строковый заголовок, если matchPath совпал и значение строка", () => {
    (matchPath as jest.Mock).mockImplementation(
      ({ path }, pathname) => path === "/genres" && pathname === "/genres",
    );

    expect(getPageTitle("/genres")).toBe("Жанры");
  });

  it("Возвращает результат функции, если matchPath совпал и значение функция", () => {
    (matchPath as jest.Mock).mockImplementation(
      ({ path }, pathname) =>
        path === "/genres/:title" && pathname === "/genres/:title",
    );

    expect(getPageTitle("/genres/:title", { genreTitle: "фантастика" })).toBe(
      "Жанр фантастика",
    );
  });

  it("Возвращает заголовок по умолчанию, если matchPath не совпал", () => {
    (matchPath as jest.Mock).mockReturnValue(false);

    expect(getPageTitle("/unknown")).toBe("VK Marusya");
  });
});
