import * as React from "react";
import {FormEvent, useRef} from "react";
import Button from "../components/Button";
import {Link, useNavigate} from "react-router-dom";
import styled, {css} from "styled-components/macro";
import FormInput from "../components/FormInput";
import callApi from "../utils/callApi";
import Container from "../components/Container";
import Paragraph from "../components/Paragraph";
import {purple, tablet, laptop} from "../Global";


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
        <Container height={100} justifyContent="center" justifyContentTablet="start">
            <Container paddingTop={0} paddingTopTablet={2}>
                <h1>Welcome back</h1>
            </Container>
            <Form onSubmit={handleSubmit}>
                <GTitleLeft>ACCOUNT INFORMATION</GTitleLeft>
                <FormInput refer={userNameRef} placeholder="Username" type="text" pattern="^[a-z0-9_.]+$"
                           errorMessage="email invalid"/>
                <FormInput refer={passwordRef} placeholder="Password" type="password"
                           pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" errorMessage="password invalid"/>
                <Button primary medium>Login</Button>
            </Form>
            <Container paddingTop={3} paddingTopTablet={2}>
                <Paragraph size={1} weight={400} color={purple}><Link to="/register">Create an account</Link></Paragraph>
            </Container>
        </Container>
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
  ${laptop(css`
    width: 50%;
  `)}
  ${tablet(css`
    width: 75%;
  `)}
`

export default Login;
