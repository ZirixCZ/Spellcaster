const callApi = async (method: string, endpoint: RequestInfo, body: string | null) => {
    let headers = {}
    if (localStorage.getItem("jwt")) {
        headers = {
            Authorization: "" + localStorage.getItem("jwt")
        };
    }

    return fetch(endpoint, {headers: headers, method: method, body: body});
}

export default callApi;
