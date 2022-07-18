import React, { useState } from "react";
import { helpHttp } from "../../helpers/helpHttp";
import Results from "../results/Results";
import { SearchBarProps } from "../interface/SearchInterface";
import "./SearchBar.css";
import { Link } from "react-router-dom";

const SearchBar = ({ typeSearch }: SearchBarProps): JSX.Element => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState();
  const handleOnChange = (e: any) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (value.length > 0) {
      let url = `https://api.github.com/search/${typeSearch}?q=${value}`;
      helpHttp()
        .get(url)
        .then((res: any) => setResults(res.items));
    }
  };
  return (
    <div>
      <div className="search-bar">
        <form onSubmit={handleSubmit} aria-label="form-submit">
          <fieldset>
            <legend>
              WHAT {typeSearch === "repositories" ? "REPO" : "USERS"} ARE YOU
              LOOKING FOR?
            </legend>
            <div className="inner-form">
              <div className="input-field">
                <div className="choices">
                  <div className="choices__inner">
                    <input
                      type="text"
                      className="choices__input choices__input--cloned"
                      autoComplete="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      aria-autocomplete="list"
                      style={{ width: "100%" }}
                      aria-label="input-field"
                      placeholder={
                        typeSearch === "repositories"
                          ? "Repo to search..."
                          : "User to search..."
                      }
                      onChange={handleOnChange}
                      value={value}
                      tabIndex={-1}
                      aria-hidden="true"
                      data-choice="active"
                    />
                  </div>
                </div>
                <button
                  className="btn-search"
                  type="submit"
                  aria-label="btn-submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="suggestion-wrap">
              <Link to={typeSearch === "repositories" ? "/search-users" : "/"}>
                <span>
                  Search
                  {typeSearch === "repositories" ? " users" : " repositories"}
                </span>
              </Link>
            </div>
          </fieldset>
        </form>
      </div>
      {results ? <Results typeSearch={typeSearch} results={results} /> : <></>}
    </div>
  );
};

export default SearchBar;
