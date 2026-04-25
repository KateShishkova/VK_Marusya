import { getFormatRuntime } from "./getFormatRuntime";

describe("getFormatRuntime", () => {
  it("Возвращает строку формата 'X ч X мин", () => {
    expect(getFormatRuntime(67)).toBe("1 ч 7 мин");
  });
  
  it("Возвращает 'NaN мин' для невалидных значений", () => {
    expect(getFormatRuntime(Number("test"))).toBe("NaN мин");
  });
});
