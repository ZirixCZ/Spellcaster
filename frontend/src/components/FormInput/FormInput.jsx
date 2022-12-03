import React from "react";
import styled from "styled-components";

const FormInput = (props) => {

    const Span = styled.span`
        font-size: 1em;
        color: red;
        position: absolute;
        display: block;
        visibility: hidden;
    `

    const Input = styled.input`
        width: 100%;
        box-sizing: border-box;
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;
        padding-left: 1rem;
        font-size: 1rem;
    `

    const InputValidator = styled.form`
        width: 100%;
        padding-bottom: 1.75rem;
        &:invalid ${Span} {
            visibility: visible;
        }
    `

    return (
        <InputValidator>
            <Input ref={props.refer} type={props.type} placeholder={props.placeholder} pattern={props.pattern}/>
            <Span>{props.errorMessage}</Span>
        </InputValidator>
    )
}

export default FormInput;
