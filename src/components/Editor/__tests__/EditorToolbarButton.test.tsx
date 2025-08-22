import React, { SVGProps } from "react";
import { render, within } from "@/tests";
import userEvent from "@testing-library/user-event";
import EditorToolbarButton from "../EditorToolbarButton";
const IconMock: React.FC<SVGProps<SVGSVGElement>> = () => <span>Icon</span>;

describe("EditorToolbarButton", () => {
  it("should render button correctly", () => {
    const { getByRole } = render(<EditorToolbarButton renderIcon={IconMock} />);
    const button = getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should render text within the button", () => {
    const text = "Button text";
    const { getByRole } = render(
      <EditorToolbarButton text={text} renderIcon={IconMock} />
    );
    const button = getByRole("button");
    const textElement = within(button).getByText(text);
    expect(textElement).toBeInTheDocument();
  });

  it("should render button as disabled", () => {
    const { getByRole } = render(
      <EditorToolbarButton renderIcon={IconMock} disabled />
    );
    const button = getByRole("button");
    expect(button).toBeDisabled();
  });

  it('should call the "onClick" function when a button is clicked', async () => {
    const onClickMock = vi.fn();
    const { getByRole } = render(
      <EditorToolbarButton renderIcon={IconMock} onClick={onClickMock} />
    );
    const button = getByRole("button");
    await userEvent.click(button);
    expect(onClickMock).toHaveBeenCalledOnce();
  });

  it('should not call the "onClick" function when a button is disabled and clicked', async () => {
    const onClickMock = vi.fn();
    const { getByRole } = render(
      <EditorToolbarButton
        renderIcon={IconMock}
        disabled
        onClick={onClickMock}
      />
    );
    const button = getByRole("button");
    await userEvent.click(button);
    expect(onClickMock).not.toHaveBeenCalled();
  });
});
