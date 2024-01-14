import axios, { AxiosRequestConfig } from "axios";

export const helpHttp = () => {
  // request config for axios library
  const customFetch = (endpoint: string, options: AxiosRequestConfig): Promise<any> => {
    const defaultHeader = {
      accept: "application/json",
    };

    /* const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || "GET"; */
    options.headers = /* options.headers
      ? { ...defaultHeader, ...options.headers }
      : */ defaultHeader;

    // setTimeout(() => controller.abort(), 3000);
    return axios
      .get(endpoint, options)
      .then((res) =>
        res.status === 200
          ? res.data
          : Promise.reject({
            err: true,
            status: res.status,
            statusText: res.statusText,
          })

      )
      .catch((err) => err);
  };
  // return customFetch function to use in the app 
  const get = (url: string, options = {}) => customFetch(url, options);
  return {
    get,
  };
};
