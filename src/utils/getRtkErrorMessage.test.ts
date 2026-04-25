import { getRtkErrorMessage } from "./getRtkErrorMessage";

describe("getRtkErrorMessage", () => {
  it("Возвращает дефолтное значение, если ошибка === undefined", () => {
    expect(getRtkErrorMessage(undefined)).toBe("Произошла ошибка");
  });

  it("Возвращает строку, если ошибка 'string", () => {
    expect(getRtkErrorMessage("Ошибка")).toBe("Ошибка");
  });

  it("Возвращает текст ошибки из поля message, если передан инстанс Error", () => {
    expect(getRtkErrorMessage(new Error("Ошибка из Error"))).toBe(
      "Ошибка из Error",
    );
  });

  it("Возвращает error.error, если это FetchBaseQueryError с текстом ошибки", () => {
    const error = { status: 400, error: "Ошибка запроса" };
    expect(getRtkErrorMessage(error)).toBe("Ошибка запроса");
  });

  it("Возвращает error.data.message, если это оно присутствует", () => {
    const error = { status: 400, data: { message: "Ошибка в данных" } };
    expect(getRtkErrorMessage(error)).toBe("Ошибка в данных");
  });

  it("Возвращает сообщение из error.data.error, если оно присутствует", () => {
    const error = { status: 400, data: { error: "Ошибка error" } };
    expect(getRtkErrorMessage(error)).toBe("Ошибка error");
  });

  it("Возвращает сообщение из SerializedError", () => {
    const error = { message: "Сериализованная ошибка" };
    expect(getRtkErrorMessage(error)).toBe("Сериализованная ошибка");
  });

  it("Возвращает дефолтное сообщение, если подходящее сообщение не найдено", () => {
    const error = { status: 400, data: {} };
    expect(getRtkErrorMessage(error)).toBe("Произошла ошибка");
  });
});
