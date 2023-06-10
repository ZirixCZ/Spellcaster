import getToken from "./getToken";

const callApi = async (
  method: string,
  endpoint: RequestInfo,
  body: string | null
) => {
  let headers = {};
  headers = {
    Authorization: "" + getToken(),
  };

  let uri =
    (process.env.REACT_APP_API_URL ?? "http://localhost:8000") + endpoint;

  return fetch(uri, { headers: headers, method: method, body: body });
};

export default callApi;
