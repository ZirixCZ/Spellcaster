import {FormEvent} from "react";
import callApi from "../../../utils/callApi";

const handleSubmit = async (e: FormEvent, userName: string | undefined, password: string | undefined) => {
    if (!userName || !password) {
        return false;
    }

    e.preventDefault();

    let success = await callApi("POST", "/api/user/login", JSON.stringify({
        "userName": userName,
        "password": password
    })).then((res) => {
        if (res.ok) {
            res.json().then(json => {
                const token = json.jwt
                if (!token) {
                    return
                }

                localStorage.setItem("jwt", token)
            })
            return true
        }
        return false
    })

    return success.valueOf()
}

export default handleSubmit
