import * as React from "react";
import {FormEvent, useRef, useState} from "react";
import Button from "../../../components/Button";
import {Link, useNavigate} from "react-router-dom";
import styled, {css} from "styled-components/macro";
import FormInput from "../../../components/FormInput";
import Container from "../../../components/Container";
import Paragraph from "../../../components/Paragraph";
import {laptop, tablet} from "../../../Global";
import handleSubmit from "./services/handleSubmit";


const Login = (): JSX.Element => {

    const navigate = useNavigate();

    const userNameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const [submitSuccess, setSubmitSuccess] = React.useState<Promise<boolean>>()

    React.useEffect(() => {
        if (typeof submitSuccess !== "undefined")
            submitSuccess.then(result => {
                if (!result) return

                navigate("/")
            })
    }, [submitSuccess])

    return (
        <Container height={100} justifyContent="center" justifyContentTablet="start">
            <StyledContainer paddingTop={0} paddingTopTablet={2} alignItems="flex-start">
                <Title>Sign in</Title>
            </StyledContainer>
            <Form onSubmit={(e) => setSubmitSuccess(handleSubmit(e, userNameRef?.current?.value, passwordRef?.current?.value))}>
                <GTitleLeft>ACCOUNT INFORMATION</GTitleLeft>
                <FormInput refer={userNameRef} placeholder="Username" type="text" pattern="^[a-z0-9_.]+$"
                           errorMessage="email invalid"/>
                <FormInput refer={passwordRef} placeholder="Password" type="password"
                           pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" errorMessage="password invalid" isLast={true}/>
                <Paragraph size={1} weight={500}><Link to="/register">I don't have an account</Link></Paragraph>
                <Button primary medium>Login</Button>
            </Form>
        </Container>
    );

}

const Title = styled.h1`
    font-size: 4em;
`

const StyledContainer = styled(Container)`
    text-align: start;
`

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
  ${tablet(css`
    width: 50%;
  `)}
`

export default Login;
