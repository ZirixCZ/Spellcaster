import getToken from "./getToken";
import generateUri from "./generateUri";

const callApi = async (
  method: string,
  endpoint: RequestInfo,
  body: string | null
) => {
  let headers = {};
  headers = {
    Authorization: "" + getToken(),
  };

  let uri = generateUri() + endpoint;

  return fetch(uri, { headers: headers, method: method, body: body });
};

export default callApi;
