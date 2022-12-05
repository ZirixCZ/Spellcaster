const callApi = async (method: string, endpoint: RequestInfo, body: string | null) => {
    return fetch(endpoint, {method: method, body: body});
}

export default callApi;
