import * as React from "react";
import styled from "styled-components";
import Input from "./Input";

type AppProps = {
  refer: React.RefObject<HTMLInputElement> | null;
  placeholder: string;
  type: string;
  pattern: string;
  errorMessage: string;
  isLast?: boolean;
};

const FormInput = (props: AppProps): JSX.Element => {
  return (
    <InputValidator isLast={props.isLast}>
      <Input
        refer={props.refer}
        type={props.type}
        placeholder={props.placeholder}
        pattern={props.pattern}
      />
      <Span>{props.errorMessage}</Span>
    </InputValidator>
  );
};

export const Span = styled.span`
  font-size: 1em;
  color: red;
  position: absolute;
  display: block;
  visibility: hidden;
`;

interface InputValidatorInterface {
  isLast?: boolean;
}

export const InputValidator = styled.div<InputValidatorInterface>`
  width: 100%;
  padding-bottom: ${({ isLast }) => isLast ? 0 : 1.75}rem;

  &:invalid ${Span} {
    visibility: visible;
  }
`;

export default FormInput;
