import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import callApi from "../../../utils/callApi";
import Container from "../../../components/Container";

const Dashboard = (): JSX.Element => {

    const navigate = useNavigate();

    const [auth, setAuth] = useState(false);

    useEffect(() => {
        callApi("GET", "/api/admin", null)
            .then((res) => {
                if (res.ok) {
                    setAuth(true)
                    return
                }
                navigate("/")
            })
    }, [])

    return (
        <Container height={100} justifyContentTablet="start" justifyContent="center">
            {auth
                ? <p>ADMIN: You're an Admin!</p>
                : <p>ADMIN: You weren't authorized</p>
            }
        </Container>
    )

}

export default Dashboard;
