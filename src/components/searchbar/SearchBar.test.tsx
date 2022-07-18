import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import Results from "../results/Results";
import { ResultsProps, SearchBarProps } from "../interface/SearchInterface";

const resultsProps: ResultsProps = {
  typeSearch: "repositories",
  results: [
    {
      id: 1,
      name: "test",
      owner: {
        login: "test",
        avatar_url: "https://avatars1.githubusercontent.com/u/1?v=4",
      },
      html_url: "test",
      stargazers_count: 0,
      language: "test",
      description:
        "test uewiueiu jkjksdjdsj jksjkjds skjjdjd 1236363 jejjejeu 2737389",
      login: "test",
      avatar_url: "https://avatars1.githubusercontent.com/u/1?v=4",
    },
    {
      id: 2,
      name: "test",
      owner: {
        login: "test",
        avatar_url: "https://avatars1.githubusercontent.com/u/1?v=4",
      },
      html_url: "test",
      stargazers_count: 0,
      language: "test",
      description: "test",
      login: "test",
      avatar_url: "https://avatars1.githubusercontent.com/u/1?v=4",
    },
  ],
};

const searchBarProps: SearchBarProps = {
  typeSearch: "repositories",
};

const setup = () => {
  const utils = render(<SearchBar {...searchBarProps} />);
  const form = utils.getByLabelText("form-submit") as HTMLFormElement;
  const input = utils.getByLabelText("input-field") as HTMLInputElement;
  const button = utils.getByLabelText("btn-submit") as HTMLInputElement;
  return {
    input,
    form,
    button,
    ...utils,
  };
};

test("renders SearchBar component", () => {
  render(<SearchBar {...searchBarProps} />);
  const linkElement = screen.getByText(/WHAT REPO ARE YOU LOOKING FOR?/i);
  expect(linkElement).toBeInTheDocument();
});

// test for data-testid input-field
test("input value change", () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: "23" } });
  expect(input.value).toBe("23");
});

test("trigger submit event ", () => {
  const { input, button } = setup();
  fireEvent.change(input, { target: { value: "23" } });
  fireEvent.submit(button);
  expect(input.value).toBe("23");
});

test("result component mapping to the resultsProps", () => {
  const { queryAllByLabelText } = render(<Results {...resultsProps} />);
  expect(queryAllByLabelText("result-item")).toHaveLength(2);
});

test("typeSearch value is users", () => {
  resultsProps.typeSearch = "users";
  render(<Results {...resultsProps} />);
});
