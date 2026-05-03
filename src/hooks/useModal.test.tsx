import userEvent, { type UserEvent } from "@testing-library/user-event";
import { useModal } from "./useModal";
import { render, screen } from "@testing-library/react";

interface TestComponentProps {
  userCancel?: () => void;
}

const TestComponent = ({ userCancel }: TestComponentProps) => {
  const { openModal, closeModal, userCancelModal, Modal } = useModal(
    <div>Test content</div>,
    "default",
    userCancel,
  );

  return (
    <div>
      <button onClick={openModal}>Open</button>
      <button onClick={closeModal}>Close</button>
      <button onClick={userCancelModal}>Cancel</button>
      {Modal}
    </div>
  );
};

describe("useModal", () => {
  let user: UserEvent;

  beforeAll(() => {
    window.HTMLDialogElement.prototype.showModal = jest.fn();
    window.HTMLDialogElement.prototype.close = jest.fn();
  });

  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Initial: при монтировании компонента модальное окно отсутствует, переданный контент не виден пользователю", () => {
    render(<TestComponent />);

    expect(screen.queryByText("Test content")).not.toBeInTheDocument();
  });

  it("OpenModal: модальное окно и переданный контент видны пользователю после вызова openModal()", async () => {
    render(<TestComponent />);

    await user.click(screen.getByRole("button", { name: /open/i }));

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("CloseModal: модальное окно удаляется из DOM после вызова closeModal()", async () => {
    render(<TestComponent />);

    await user.click(screen.getByRole("button", { name: /open/i }));
    await user.click(screen.getByRole("button", { name: /close/i }));

    expect(screen.queryByText("Test content")).not.toBeInTheDocument();
  });

  it("UserCancelModal: при вызове userCancelModal вызывается переданный коллбэк и модальное окно закрывается", async () => {
    const onUserCancel = jest.fn();

    render(<TestComponent userCancel={onUserCancel} />);

    await user.click(screen.getByRole("button", { name: /open/i }));
    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onUserCancel).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Test content")).not.toBeInTheDocument();
  });

  it("UserCancelModal: при вызове userCancelModal модальное окно закрывается, даже если коллбэк не передан", async () => {
    render(<TestComponent />);

    await user.click(screen.getByRole("button", { name: /open/i }));
    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(screen.queryByText("Test content")).not.toBeInTheDocument();
  });
});
