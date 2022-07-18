import { ResultsProps, ResultsResponse } from "../interface/SearchInterface";
import "./Results.css";

const Results = ({ typeSearch, results }: ResultsProps): JSX.Element => {
  const pipeText = (text: string): string => {
    if (text?.length > 50) {
      return text.substring(0, 50) + "...";
    }
    return text;
  };

  return (
    <div className="ftco-section results-section bg-light">
      <div className="container">
        <div className="row d-flex">
          {results.length > 0 ? (
            results.map((result: ResultsResponse) => (
              <div
                className="col-md-3 col-6 d-flex align-self-stretch ftco-animate fadeInUp ftco-animated"
                key={result.id}
                aria-label="result-item"
              >
                <div className="media block-6 results d-block text-center w-100">
                  <div className="d-flex justify-content-center">
                    <div className="icon">
                      {typeSearch === "repositories" ? (
                        <img
                          src={result.owner.avatar_url}
                          alt="avatar"
                          className="img-avatar"
                        />
                      ) : (
                        <img
                          src={result.avatar_url}
                          alt="avatar"
                          className="img-avatar"
                        />
                      )}
                    </div>
                  </div>

                  <div className="media-body p-2 mt-2">
                    {typeSearch === "repositories" ? (
                      <>
                        <h4 className="heading mb-3 fsize-14">{result.name}</h4>
                        <p>Language: {result.language}</p>
                        <p> Star: {result.stargazers_count}</p>
                        <p>{pipeText(result.description)}</p>
                      </>
                    ) : (
                      <>
                        <h4 className="heading mb-3 fsize-14">
                          {result.login}
                        </h4>
                        <div className="d-flex justify-content-center suggestion-wrap">
                          <a href={result.html_url} aria-label="github-link">
                            <p>Gihub Profile</p>
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-md-12 mt-0">
              <h4 className="heading mb-3 fsize-14">No results found</h4>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
