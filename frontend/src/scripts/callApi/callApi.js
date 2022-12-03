const callApi = async (method, endpoint, body = null) => {
    return fetch(endpoint, {method: method, body: body});
}

export default callApi;
