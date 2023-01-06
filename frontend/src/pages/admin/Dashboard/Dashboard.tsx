import * as React from "react";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {GWrapperFullCenter} from "../../../constants";
import callApi from "../../../utils/callApi";

const Dashboard = (): JSX.Element => {

    const navigate = useNavigate();

    const [auth, setAuth] = useState(false);

    useEffect(() => {
        callApi("GET", "http://localhost:8080/api/admin", null)
            .then((res) => {
                if (res.ok) {
                    setAuth(true)
                    return
                }
                navigate("/")
            })
    }, [])

    return (
        <GWrapperFullCenter>
            {auth
                ? <p>ADMIN: You're an Admin!</p>
                : <p>ADMIN: You weren't authorized</p>
            }
        </GWrapperFullCenter>
    )

}

export default Dashboard;
