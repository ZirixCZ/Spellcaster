import * as React from "react";
import {FormEvent, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import styled, {css} from "styled-components/macro";
import FormInput from "../components/FormInput";
import callApi from "../utils/callApi";
import Button from "../components/Button";
import Container from "../components/Container";
import Paragraph from "../components/Paragraph";
import {laptop, tablet} from "../Global";

const Register = (): JSX.Element => {

    const navigate = useNavigate();

    const userNameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const checkValidityRegex = () => {
        if (!userNameRef?.current?.value || !emailRef?.current?.value || !passwordRef?.current?.value) {
            return;
        }
        const validate = [
            /^[a-z0-9_.]+$/.test(userNameRef.current.value),
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRef.current.value),
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(passwordRef.current.value)
        ];

        if (validate[0] && validate[1] && validate[2]) {
            return true;
        }

        return validate;
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const handleValidation = checkValidityRegex();
        if (handleValidation === true) {
            callApi("POST", "http://localhost:8080/api/user/register", JSON.stringify({
                "userName": userNameRef?.current?.value,
                "email": emailRef?.current?.value,
                "password": passwordRef?.current?.value
            })).then((res) => {
                if (res.ok) {
                    navigate("/");
                }
            })
            return;
        }

        if (handleValidation) {
            alert(`Invalid fields: ${!handleValidation[0] ? "Username" : ""} ${!handleValidation[1] ? "Email" : ""} ${!handleValidation[2] ? "Password" : ""}`);
        }
    }

    return (
        <Container height={100} justifyContent="center" justifyContentTablet="start">
            <Container paddingTop={0} paddingTopTablet={2}>
                <h1>Register</h1>
            </Container>
            <Form onSubmit={handleSubmit}>
                <GTitleLeft>ACCOUNT INFORMATION</GTitleLeft>
                <FormInput refer={userNameRef} placeholder="Username" type="text" pattern="^[a-z0-9_.]+$"
                           errorMessage="username invalid"/>
                <FormInput refer={emailRef} placeholder="Email" type="text" pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                           errorMessage="email invalid"/>
                <FormInput refer={passwordRef} placeholder="Password" type="password"
                           pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" errorMessage="password invalid"/>
                <Button primary medium>Create an account</Button>
            </Form>
            <Container paddingTop={3} paddingTopTablet={2}>
                <Paragraph size={1} weight={500}><Link to="/login">Already have an account</Link></Paragraph>
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
export default Register;
