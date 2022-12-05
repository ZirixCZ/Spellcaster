import React from "react";
import {GInput} from "../../globalStyle";
import styled from "styled-components";

const FormInput = (props) => {

    const Span = styled.span`
        font-size: 1em;
        color: red;
        position: absolute;
        display: block;
        visibility: hidden;
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
            <GInput ref={props.refer} type={props.type} placeholder={props.placeholder} pattern={props.pattern}/>
            <Span>{props.errorMessage}</Span>
        </InputValidator>
    )
}

export default FormInput;
