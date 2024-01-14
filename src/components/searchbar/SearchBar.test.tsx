import { act, fireEvent, render, RenderResult, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { SearchBarProps } from "../interface/SearchInterface";
import axios from "axios";
import Results  from "../results/Results";
import { ResultsProps } from "../interface/SearchInterface";
import { configure, EnzymeAdapter, shallow } from 'enzyme';
import { helpHttp } from "../../helpers/helpHttp";

import Adapter from "enzyme-adapter-react-16";
import { BrowserRouter } from "react-router-dom";
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const resultsEmptyProps: ResultsProps = {
  typeSearch: "users",
  results: [],
};
configure({ adapter: new Adapter() })
const searchBarProps: SearchBarProps = {
  typeSearch: "repositories",
};
const searchBarUsersProps: SearchBarProps = {
  typeSearch: "users",
};

const setup = () => {
 // let utils = {} as RenderResult;

const utils = render(<BrowserRouter> <SearchBar {...searchBarProps} /> </BrowserRouter>);

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
beforeEach(() => {
  mockedAxios.get.mockReset();
});

test("renders SearchBar component", () => {
  render(<BrowserRouter> <SearchBar {...searchBarProps} /> </BrowserRouter>);
  const linkElement = screen.getByText(/WHAT REPO ARE YOU LOOKING FOR?/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders SearchBar for user component", () => {
  render(<BrowserRouter><SearchBar {...searchBarUsersProps} /></BrowserRouter>);
  const linkElement = screen.getByText(/WHAT USERS ARE YOU LOOKING FOR?/i);
  expect(linkElement).toBeInTheDocument();
});
// test for data-testid input-field
test("input value change", () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: "23" } });
  expect(input.value).toBe("23");
});

test("trigger submit event2 ", async  () => {

  mockedAxios.get.mockResolvedValue({
    data: {
      items : []
    },
    status: 200,
  });
  const { input,  button } = setup();
  const wrapper = shallow(<BrowserRouter> <SearchBar {...searchBarProps} /> </BrowserRouter>);
  fireEvent.change(input, { target: { value: "" } });
    await act(() => {
      render(<BrowserRouter> <SearchBar {...searchBarProps} /> </BrowserRouter>);
      fireEvent.submit(button)
      });
      expect(wrapper.find(<Results {...resultsEmptyProps} />)).toBeTruthy();
  });

test("trigger submit event ", async  () => {

  mockedAxios.get.mockResolvedValue({
    data: {
      items : [{
        owner: { avatar_url: "https://avatars.githubusercontent.com/u/1297781?v=4", },
        id: 1,
        name: 'Joe Doe'
      },
      {
      owner: { avatar_url: "https://avatars.githubusercontent.com/u/1297781?v=4", },
        id: 2,
        name: 'Jane Doe'
      }]
    } ,
    status: 200,
      
    
  });
  
  const { input, button } = setup();
  fireEvent.change(input, { target: { value: '23' } });

  await act(() => {
render(<BrowserRouter> <SearchBar {...searchBarProps} /> </BrowserRouter>);
    fireEvent.submit(button);
  });
  expect(input.value).toBe('23');
});



