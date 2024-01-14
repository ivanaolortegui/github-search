import { fireEvent, render, screen } from "@testing-library/react";
import { ResultsProps } from "../interface/SearchInterface";
import Results from "./Results";

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

const resultsEmptyProps: ResultsProps = {
  typeSearch: "users",
  results: [],
};

const resultsUsersProps: ResultsProps = {
  typeSearch: "users",
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

test("result component mapping to the resultsProps", () => {
  const { queryAllByLabelText } = render(<Results {...resultsProps} />);
  expect(queryAllByLabelText("result-item")).toHaveLength(2);
});
test("result component mapping to the resultsEmptyProps", () => {
  const { queryAllByLabelText } = render(<Results {...resultsEmptyProps} />);
  expect(queryAllByLabelText("result-item")).toHaveLength(0);
});

test("typeSearch value is users", () => {
  resultsProps.typeSearch = "users";
  render(<Results {...resultsProps} />);
});
