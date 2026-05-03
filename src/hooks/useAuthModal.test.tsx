import { forwardRef, useImperativeHandle } from "react";
import { Provider } from "react-redux";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";

import { authApi } from "@api/authApi";
import { setupTestStore } from "@store/setupTestStore";

import { useAuthModal } from "./useAuthModal";

jest.mock("@components/UI/Popup", () => ({
  Popup: forwardRef((_props, ref) => {
    useImperativeHandle(ref, () => ({
      startClosing: jest.fn(),
      isMounted: true,
    }));
    return <div data-testid="modal" />;
  }),
}));

const TestComponent = () => {
  const { openAuthModal, AuthModal } = useAuthModal();

  return (
    <div>
      <button onClick={openAuthModal}>Open</button>
      {AuthModal}
    </div>
  );
};

describe("useAuthModal", () => {
  let user: UserEvent;

  beforeAll(() => {
    window.HTMLDialogElement.prototype.showModal = jest.fn();
    window.HTMLDialogElement.prototype.close = jest.fn();
  });

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("После аутентификации модальное окно автоматически закрывается", async () => {
    const testStore = setupTestStore({
      user: { user: null, isAuth: false, authStatus: "guest" },
    });

    render(
      <Provider store={testStore}>
        <TestComponent />
      </Provider>,
    );

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /open/i }));
    expect(screen.getByTestId("modal")).toBeInTheDocument();

    await testStore.dispatch(authApi.endpoints.fetchProfile.initiate());

    await waitFor(() => {
      expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    });
  });
});
