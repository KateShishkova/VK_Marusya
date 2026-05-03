import { setupTestStore } from "@store/setupTestStore";
import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { useFavoriteMovie } from "./useFavoriteMovie";

const postFavoriteMock = jest.fn();
const deleteFavoriteMock = jest.fn();

jest.mock("@api/favoritesApi", () => ({
  usePostFavoriteMovieMutation: () => [postFavoriteMock],
  useDeleteFavoriteMovieMutation: () => [deleteFavoriteMock],
}));

const getWrapper = (userState = {}) => {
  const testStore = setupTestStore({
    user: {
      isAuth: true,
      authStatus: "authenticated",
      user: {
        name: "Линус",
        surname: "Торвальдс",
        email: "linus@test.com",
        favorites: ["1"],
      },
      ...userState,
    },
  });
  return ({ children }: { children: ReactNode }) => (
    <Provider store={testStore}>{children}</Provider>
  );
};

describe("useFavoriteMovie", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("isAuthPending", () => {
    it("возвращает true, если запрос на проверку аутентификации выполняется", () => {
      const { result } = renderHook(() => useFavoriteMovie(), {
        wrapper: getWrapper({ authStatus: "loading" }),
      });

      expect(result.current.isAuthPending).toBe(true);
    });

    it("возвращает false, если статус аутентификации 'authenticated'", () => {
      const { result } = renderHook(() => useFavoriteMovie(), {
        wrapper: getWrapper({ authStatus: "authenticated" }),
      });

      expect(result.current.isAuthPending).toBe(false);
    });

    it("возвращает false, если статус аутентификации 'guest'", () => {
      const { result } = renderHook(() => useFavoriteMovie(), {
        wrapper: getWrapper({ authStatus: "guest" }),
      });

      expect(result.current.isAuthPending).toBe(false);
    });
  });

  describe("isFavorite", () => {
    it("возвращает true, если фильм добавлен в избранные", () => {
      const { result } = renderHook(() => useFavoriteMovie(), {
        wrapper: getWrapper(),
      });

      expect(result.current.isFavorite("1")).toBe(true);
    });

    it("возвращает false, если фильм не добавлен в избранные", () => {
      const { result } = renderHook(() => useFavoriteMovie(), {
        wrapper: getWrapper(),
      });

      expect(result.current.isFavorite("2")).toBe(false);
    });
  });

  describe("hasFavoriteError", () => {
    it("возвращает true, если есть ошибка для указанного фильма", async () => {
      postFavoriteMock.mockReturnValue({
        unwrap: () => Promise.reject("Ошибка"),
      });

      const { result } = renderHook(() => useFavoriteMovie(), {
        wrapper: getWrapper(),
      });

      await act(async () => {
        await result.current.handleAddFavorite("2");
      });
      expect(result.current.hasFavoriteError("2")).toBe(true);
    });

    it("возвращает false, если нет ошибки для указанного фильма", () => {
      const { result } = renderHook(() => useFavoriteMovie(), {
        wrapper: getWrapper(),
      });

      expect(result.current.hasFavoriteError("2")).toBe(false);
    });
  });

  describe("getFavoriteError", () => {
    it("возвращает текст ошибки, если есть ошибка для указанного фильма", async () => {
      postFavoriteMock.mockReturnValue({
        unwrap: () => Promise.reject("Ошибка"),
      });

      const { result } = renderHook(() => useFavoriteMovie(), {
        wrapper: getWrapper(),
      });

      await act(async () => {
        await result.current.handleAddFavorite("2");
      });
      expect(result.current.getFavoriteError("2")).toBe("Ошибка");
    });

    it("возвращает undefined, если нет ошибки для указанного фильма", async () => {
      const { result } = renderHook(() => useFavoriteMovie(), {
        wrapper: getWrapper(),
      });

      expect(result.current.getFavoriteError("2")).toBe(undefined);
    });
  });

  describe("hasAnyFavoriteErrors", () => {
    it("возвращает true, если есть хоть одна ошибка", async () => {
      postFavoriteMock.mockReturnValue({
        unwrap: () => Promise.reject("Ошибка"),
      });

      const { result } = renderHook(() => useFavoriteMovie(), {
        wrapper: getWrapper(),
      });

      await act(async () => {
        await result.current.handleAddFavorite("2");
      });
      expect(result.current.hasAnyFavoriteErrors()).toBe(true);
    });

    it("возвращает false, если ошибок нет", () => {
      const { result } = renderHook(() => useFavoriteMovie(), {
        wrapper: getWrapper(),
      });

      expect(result.current.hasAnyFavoriteErrors()).toBe(false);
    });
  });

  describe("handleAddFavorite", () => {
    it("вызывает postFavoriteMovie с правильным id", async () => {
      postFavoriteMock.mockReturnValue({ unwrap: () => Promise.resolve() });

      const { result } = renderHook(() => useFavoriteMovie(), {
        wrapper: getWrapper(),
      });

      await act(async () => {
        await result.current.handleAddFavorite("2");
      });

      expect(postFavoriteMock).toHaveBeenCalledWith({ id: "2" });
      expect(result.current.hasFavoriteError("2")).toBe(false);
    });

    it("устанавливает ошибку при неудачном добавлении", async () => {
      postFavoriteMock.mockReturnValue({
        unwrap: () => Promise.reject("Ошибка"),
      });

      const { result } = renderHook(() => useFavoriteMovie(), {
        wrapper: getWrapper(),
      });

      await act(async () => {
        await result.current.handleAddFavorite("2");
      });

      expect(result.current.hasFavoriteError("2")).toBe(true);
      expect(result.current.getFavoriteError("2")).toBe("Ошибка");
      expect(result.current.hasAnyFavoriteErrors()).toBe(true);
    });

    it("очищает ошибку после успешной повторной попытки", async () => {
      postFavoriteMock
        .mockReturnValueOnce({ unwrap: () => Promise.reject("Ошибка") })
        .mockReturnValueOnce({ unwrap: () => Promise.resolve() });

      const { result } = renderHook(() => useFavoriteMovie(), {
        wrapper: getWrapper(),
      });

      await act(async () => {
        await result.current.handleAddFavorite("2");
      });
      expect(result.current.hasFavoriteError("2")).toBe(true);

      await act(async () => {
        await result.current.handleAddFavorite("2");
      });
      expect(result.current.hasFavoriteError("2")).toBe(false);
    });

    it("не вызывает postFavoriteMovie и вызывает onAuthRequired, если не авторизован и передан коллбэк", async () => {
      const onAuthRequired = jest.fn();

      const { result } = renderHook(() => useFavoriteMovie(onAuthRequired), {
        wrapper: getWrapper({ isAuth: false }),
      });

      await act(async () => {
        await result.current.handleAddFavorite("2");
      });

      expect(postFavoriteMock).not.toHaveBeenCalled();
      expect(onAuthRequired).toHaveBeenCalled();
    });
  });

  describe("handleDeleteFavorite", () => {
    it("вызывает deleteFavoriteMovie с правильным id", async () => {
      deleteFavoriteMock.mockReturnValue({ unwrap: () => Promise.resolve() });

      const { result } = renderHook(() => useFavoriteMovie(), {
        wrapper: getWrapper(),
      });

      await act(async () => {
        await result.current.handleDeleteFavorite("1");
      });

      expect(deleteFavoriteMock).toHaveBeenCalledWith("1");
      expect(result.current.hasFavoriteError("1")).toBe(false);
    });

    it("устанавливает ошибку при неудачном удалении", async () => {
      deleteFavoriteMock.mockReturnValue({
        unwrap: () => Promise.reject("Ошибка"),
      });

      const { result } = renderHook(() => useFavoriteMovie(), {
        wrapper: getWrapper(),
      });

      await act(async () => {
        await result.current.handleDeleteFavorite("1");
      });

      expect(result.current.hasFavoriteError("1")).toBe(true);
      expect(result.current.getFavoriteError("1")).toBe("Ошибка");
      expect(result.current.hasAnyFavoriteErrors()).toBe(true);
    });

    it("очищает ошибку после успешной повторной попытки", async () => {
      deleteFavoriteMock
        .mockReturnValueOnce({ unwrap: () => Promise.reject("Ошибка") })
        .mockReturnValueOnce({ unwrap: () => Promise.resolve() });

      const { result } = renderHook(() => useFavoriteMovie(), {
        wrapper: getWrapper(),
      });

      await act(async () => {
        await result.current.handleDeleteFavorite("1");
      });
      expect(result.current.hasFavoriteError("1")).toBe(true);

      await act(async () => {
        await result.current.handleDeleteFavorite("1");
      });
      expect(result.current.hasFavoriteError("1")).toBe(false);
    });

    it("не вызывает deleteFavoriteMovie и вызывает onAuthRequired, если не авторизован и передан коллбэк", async () => {
      const onAuthRequired = jest.fn();

      const { result } = renderHook(() => useFavoriteMovie(onAuthRequired), {
        wrapper: getWrapper({ isAuth: false }),
      });

      await act(async () => {
        await result.current.handleDeleteFavorite("1");
      });

      expect(deleteFavoriteMock).not.toHaveBeenCalled();
      expect(onAuthRequired).toHaveBeenCalled();
    });
  });

  describe("handleToggleFavorite", () => {
    it("вызывает handleAddFavorite, если isFavorite === false", async () => {
      postFavoriteMock.mockReturnValue({ unwrap: () => Promise.resolve() });

      const { result } = renderHook(() => useFavoriteMovie(), {
        wrapper: getWrapper({ user: { favorites: [] } }),
      });

      await act(async () => {
        await result.current.handleToggleFavorite("2");
      });

      expect(postFavoriteMock).toHaveBeenCalledWith({ id: "2" });
      expect(deleteFavoriteMock).not.toHaveBeenCalled();
    });

    it("вызывает handleDeleteFavorite, если isFavorite === true", async () => {
      deleteFavoriteMock.mockReturnValue({ unwrap: () => Promise.resolve() });

      const { result } = renderHook(() => useFavoriteMovie(), {
        wrapper: getWrapper({ user: { favorites: ["1"] } }),
      });

      await act(async () => {
        await result.current.handleToggleFavorite("1");
      });

      expect(deleteFavoriteMock).toHaveBeenCalledWith("1");
      expect(postFavoriteMock).not.toHaveBeenCalled();
    });
  });
});
