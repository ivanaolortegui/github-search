

export interface SearchBarProps {
    typeSearch: string;
}

export interface ResultsProps {
    results: ResultsResponse[];
    typeSearch: SearchBarProps["typeSearch"];
}

export interface ResultsResponse {
    id: number;
    owner: {
        login: string;
        avatar_url: string;
    };
    name: string;
    description: string;
    stargazers_count: number;
    language: string;
    login: string;
    avatar_url: string;
    html_url: string;

}