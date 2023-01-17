const getToken = (): string | null => {
    if (localStorage.getItem("jwt") === null) return null

    return localStorage.getItem("jwt")
}

export default getToken
