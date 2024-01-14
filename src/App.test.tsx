import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import App from "./App";

const setup = () => {
  const utils = render(<App />);
  const input = utils.getByLabelText("input-field") as HTMLInputElement;
  return {
    input,
    ...utils,
  };
};

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/WHAT REPO ARE YOU LOOKING FOR?/i);
  expect(linkElement).toBeInTheDocument();
});

// test for data-testid input-field
/* test("renders learn react link", () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: "23" } });
  expect(input.value).toBe("23");
});

test("renders learn react link", () => {
  const { input } = setup();
  fireEvent.keyPress(input, { key: "Enter", target: { value: "23" } });
  expect(input.value).toBe("23");
});
 */
