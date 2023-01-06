import * as React from "react";
import {FormEvent, useRef} from "react";
import Button from "../../../components/Button";
import {useNavigate} from "react-router-dom";
import styled from "styled-components/macro";
import FormInput from "../../../components/FormInput";
import callApi from "../../../utils/callApi";
import {
    GWrapperFullCenter,
    GHeaderContainer
} from "../../../constants";

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

    return (
        <GWrapperFullCenter>
            <GHeaderContainer>
                <h1>Welcome back</h1>
            </GHeaderContainer>
            <Form onSubmit={handleSubmit}>
                    <GTitleLeft>ACCOUNT INFORMATION</GTitleLeft>
                    <FormInput refer={userNameRef} placeholder="Username" type="text" pattern="^[a-z0-9_.]+$"
                               errorMessage="email invalid"/>
                    <FormInput refer={passwordRef} placeholder="Password" type="password"
                               pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" errorMessage="password invalid"/>
                    <Button primary medium>Login</Button>
            </Form>
        </GWrapperFullCenter>
    );

}

export const GTitleLeft = styled.p`
    width: 100%;
    font-size: 0.75rem;
    font-weight: 600;
    text-align: left;
  `

export const Form = styled.form`
        width: 25%;
        height: fit-content;
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

export default Login;
