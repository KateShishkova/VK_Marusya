import { forwardRef, useImperativeHandle } from "react";
import { render, screen } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";

import { useSearchModal } from "./useSearchModal";

const startClosingMock = jest.fn();

jest.mock("@components/UI/Popup", () => ({
  Popup: forwardRef((_props, ref) => {
    useImperativeHandle(ref, () => ({
      startClosing: startClosingMock,
      isMounted: true,
    }));
    return <div data-testid="modal" />;
  }),
}));

const TestComponent = () => {
  const {
    isOpenSearchModal,
    openSearchModal,
    closeSearchModal,
    externalCloseSearchModal,
    SearchModal,
  } = useSearchModal();

  return (
    <div>
      <span data-testid="modal-state">
        {isOpenSearchModal ? "open" : "closed"}
      </span>

      <button onClick={openSearchModal}>Open</button>
      <button onClick={closeSearchModal}>Close</button>
      <button onClick={externalCloseSearchModal}>External</button>
      {SearchModal}
    </div>
  );
};

describe("useSearchModal", () => {
  let user: UserEvent;

  beforeAll(() => {
    window.HTMLDialogElement.prototype.showModal = jest.fn();
    window.HTMLDialogElement.prototype.close = jest.fn();
  });

  beforeEach(() => {
    user = userEvent.setup();
    startClosingMock.mockClear();
  });

  it("Initial: при монтировании компонента модальное окно отсутствует", () => {
    render(<TestComponent />);

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    expect(screen.getByTestId("modal-state")).toHaveTextContent("closed");
  });

  it("OpenSearchModal: модальное окно отображается после вызова openSearchModal()", async () => {
    render(<TestComponent />);

    await user.click(screen.getByRole("button", { name: /open/i }));

    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByTestId("modal-state")).toHaveTextContent("open");
  });

  it("CloseSearchModal: модальное окно закрывается после вызова closeSearchModal()", async () => {
    render(<TestComponent />);

    await user.click(screen.getByRole("button", { name: /open/i }));
    await user.click(screen.getByRole("button", { name: /close/i }));

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    expect(screen.getByTestId("modal-state")).toHaveTextContent("closed");
  });

  it("ExternalCloseSearchModal: вызывает метод Popup.startClosing()", async () => {
    render(<TestComponent />);

    await user.click(screen.getByRole("button", { name: /open/i }));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByTestId("modal-state")).toHaveTextContent("open");

    await user.click(screen.getByRole("button", { name: /external/i }));
    expect(startClosingMock).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByTestId("modal-state")).toHaveTextContent("open");
  });
});
