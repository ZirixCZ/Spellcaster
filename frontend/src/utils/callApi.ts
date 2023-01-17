import getToken from "./getToken";

const callApi = async (method: string, endpoint: RequestInfo, body: string | null) => {
    let headers = {}
        headers = {
            Authorization: "" + getToken()
        };

    // TODO: .env
    let uri = "http://localhost:8080" + endpoint

    return fetch(uri, {headers: headers, method: method, body: body});
}

export default callApi;
