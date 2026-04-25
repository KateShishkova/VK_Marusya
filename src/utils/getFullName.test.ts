import type { UserResponse } from "@schemas/user.schema";
import { getFullName } from "./getFullName";

describe("getFullName", () => {
  it("Возвращает имя и фамилию пользователя через пробел", () => {
    expect(
      getFullName({ name: "Линус", surname: "Торвальдс" } as UserResponse),
    ).toBe("Линус Торвальдс");
  });

  it("Возвращает только имя пользователя, если фамилия отсутствует", () => {
    expect(getFullName({ name: "Линус" } as UserResponse)).toBe("Линус");
    expect(getFullName({ name: "Линус", surname: "   " } as UserResponse)).toBe(
      "Линус",
    );
  });

  it("Возвращает только фамилию пользователя, если имя отсутствует", () => {
    expect(getFullName({ surname: "Торвальдс" } as UserResponse)).toBe(
      "Торвальдс",
    );
    expect(
      getFullName({ name: "   ", surname: "Торвальдс" } as UserResponse),
    ).toBe("Торвальдс");
  });

  it("Возвращает пустую строку, если оба параметра отсутствуют", () => {
    expect(getFullName({} as UserResponse)).toBe("");
  });
});
