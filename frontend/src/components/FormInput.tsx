import * as React from "react";
import styled from "styled-components";
import Input from "./Input";

type AppProps = {
    refer: React.RefObject<HTMLInputElement> | null,
    placeholder: string,
    type: string,
    pattern: string,
    errorMessage: string
};

const FormInput = (props: AppProps): JSX.Element => {

    return (
        <InputValidator>
            <Input refer={props.refer} type={props.type} placeholder={props.placeholder} pattern={props.pattern}/>
            <Span>{props.errorMessage}</Span>
        </InputValidator>
    )
}

export const Span = styled.span`
  font-size: 1em;
  color: red;
  position: absolute;
  display: block;
  visibility: hidden;
`

export const InputValidator = styled.div`
  width: 100%;
  padding-bottom: 1.75rem;

  &:invalid ${Span} {
    visibility: visible;
  }
`

export default FormInput;
