import { getFormatCurrency } from "./getFormatCurrency";

describe("getFormatCurrency", () => {
  it("Добавляет неразрывные пробелы между разрядами и строку '.руб'", () => {
    expect(getFormatCurrency("1000000")).toBe("1\u00A0000\u00A0000 руб.");
  });

  it("Корректно форматирует только строки, содержащие целые числа и десятичные дроби", () => {
    expect(getFormatCurrency("1234").replace(" руб.", "")).toBe("1\u00A0234");
    expect(getFormatCurrency("1234.5").replace(" руб.", "")).toBe(
      "1\u00A0234,5",
    );
    expect(getFormatCurrency("  1234  ").replace(" руб.", "")).toBe(
      "1\u00A0234",
    );
  });

  it("Возвращает 'NaN руб.' для невалидных значений", () => {
    expect(getFormatCurrency("1234test")).toBe("NaN руб.");
    expect(getFormatCurrency("test")).toBe("NaN руб.");
    expect(getFormatCurrency("1234,5")).toBe("NaN руб.");
    expect(getFormatCurrency("true")).toBe("NaN руб.");
  });
});
