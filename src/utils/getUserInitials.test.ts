import type { UserResponse } from "@schemas/user.schema";
import { getUserInitials } from "./getUserInitials";

describe("getUserInitials", () => {
  it("Возвращает заглавные буквы имени (И) и фамилии (Ф) пользователя в формате 'ИФ'", () => {
    expect(
      getUserInitials({ name: "Линус", surname: "Торвальдс" } as UserResponse),
    ).toBe("ЛТ");
  });

  it("Возвращает только заглавную букву имени пользователя (И), если фамилия отсутствует", () => {
    expect(
      getUserInitials({ name: "Линус", surname: "   " } as UserResponse),
    ).toBe("Л");
  });

  it("Возвращает только заглавную букву фамилии пользователя (Ф), если имя отсутствует", () => {
    expect(
      getUserInitials({ name: "   ", surname: "Торвальдс" } as UserResponse),
    ).toBe("Т");
  });

  it("Возвращает пустую строку, если оба параметра отсутствуют", () => {
    expect(getUserInitials({} as UserResponse)).toBe("");
  });
});
