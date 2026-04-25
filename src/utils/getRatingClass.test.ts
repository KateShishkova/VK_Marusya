import { getRatingClass } from "./getRatingClass";

describe("getRatingClass", () => {
  it("Возвращает high, если рейтинг больше или равен 8", () => {
    expect(getRatingClass(8)).toBe("high");
    expect(getRatingClass(20)).toBe("high");
  });

  it("Возвращает good, если рейтинг больше или равен 7 и меньше 8", () => {
    expect(getRatingClass(7)).toBe("good");
    expect(getRatingClass(7.99)).toBe("good");
  });

  it("Возвращает medium, если рейтинг больше или равен 5 и меньше 7", () => {
    expect(getRatingClass(5)).toBe("medium");
    expect(getRatingClass(6.99)).toBe("medium");
  });

  it("Возвращает low, если рейтинг меньше 5", () => {
    expect(getRatingClass(4.99)).toBe("low");
    expect(getRatingClass(-20)).toBe("low");
  });
});
