import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import FormInput from "../../components/FormInput/FormInput";
import callApi from "../../scripts/callApi/callApi";

function Register() {

    const navigate = useNavigate();

    const userNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const checkValidityRegex = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const handleValidation = checkValidityRegex();
        if (handleValidation === true) {
            callApi("POST", "http://localhost:8080/api/user/register", JSON.stringify({
                "userName": userNameRef.current.value,
                "email": emailRef.current.value,
                "password": passwordRef.current.value
            })).then((res) => {
                if (res.ok) {
                    navigate("/");
                }
            })
            return;
        }

        alert(`Invalid fields: ${!handleValidation[0] ? "Username" : ""} ${!handleValidation[1] ? "Email" : ""} ${!handleValidation[2] ? "Password" : ""}`);
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
                <FormInput refer={userNameRef} placeholder="user name" type="text" pattern="^[a-z0-9_.]+$"
                           errorMessage="username invalid"/>
                <FormInput refer={emailRef} placeholder="email" type="text" pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                           errorMessage="email invalid"/>
                <FormInput refer={passwordRef} placeholder="password" type="password"
                           pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" errorMessage="password invalid"/>
                <Button>Register</Button>
            </Form>
        </Container>
    );

}

export default Register;
