import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import FormInput from "../../components/FormInput/FormInput";
import callApi from "../../scripts/callApi/callApi";

function Login() {

    const navigate = useNavigate();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        callApi("POST", "http://localhost:8080/api/user/login", JSON.stringify({
            "email": emailRef.current.value,
            "password": passwordRef.current.value
        })).then((res) => {
            if (res.ok) {
                navigate("/");
            }
        })
    }

    const Container = styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    `

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
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormInput refer={emailRef} placeholder="email" type="text" pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                           errorMessage="email invalid"/>
                <FormInput refer={passwordRef} placeholder="password" type="password"
                           pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" errorMessage="password invalid"/>
                <Button>Login</Button>
            </Form>
        </Container>
    );

}

export default Login;
