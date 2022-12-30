import * as React from "react";
import {FormEvent, useRef} from "react";
import {json, useNavigate} from "react-router-dom";
import styled from "styled-components";
import FormInput from "../../components/FormInput/FormInput";
import callApi from "../../scripts/callApi/callApi";
import {GFullCenterWrapper} from "../../globalStyle";

const Login = (): JSX.Element => {

    const navigate = useNavigate();

    const userNameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e: FormEvent) => {
        if (!userNameRef?.current?.value || !passwordRef?.current?.value) {
            return;
        }

        e.preventDefault();
        callApi("POST", "http://localhost:8080/api/user/login", JSON.stringify({
            "userName": userNameRef.current.value,
            "password": passwordRef.current.value
        })).then((res) => {
            if (res.ok) {
                res.json().then(json => {
                    const token = json.jwt
                    if (!token)
                        return

                    localStorage.setItem("jwt", token)
                    navigate("/")
                })
            }
        })
    }

    const Form = styled.form`
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        @media (max-width: 1366px) {
            width: 35%;
        }
        @media (max-width: 1080px) {
            width: 50%;
        }
        @media (max-width: 768px) {
            width: 75%;
        }
    `

    const Button = styled.button`
        width: 50%;
        padding: 1rem;
        background-color: white;
        cursor: pointer;
    `

    return (
        <GFullCenterWrapper>
            <Form onSubmit={handleSubmit}>
                <FormInput refer={userNameRef} placeholder="username" type="text" pattern="^[a-z0-9_.]+$"
                           errorMessage="email invalid"/>
                <FormInput refer={passwordRef} placeholder="password" type="password"
                           pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" errorMessage="password invalid"/>
                <Button>Login</Button>
            </Form>
        </GFullCenterWrapper>
    );

}

export default Login;
