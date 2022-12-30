import * as React from "react";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {GFullCenterWrapper} from "../../globalStyle";
import callApi from "../../scripts/callApi/callApi";

const Dashboard = (): JSX.Element => {

    const navigate = useNavigate();

    const [auth, setAuth] = useState(false);

    useEffect(() => {
        callApi("GET", "http://localhost:8080/api/home", null)
            .then((res) => {
                if (res.ok) {
                    setAuth(true)
                    return
                }
                console.log("HERE")
                navigate("/login")
            })
    }, [])

    return (
        <GFullCenterWrapper>
            {auth
                ? <p>You're logged in!</p>
                : <p>You weren't authorized</p>
            }
        </GFullCenterWrapper>
    )

}

export default Dashboard;
