import * as React from "react";
import styled from "styled-components/macro";

interface InputProps {
  refer?: React.RefObject<HTMLInputElement> | null;
  placeholder?: string;
  type?: string;
  pattern?: string;
  errorMessage?: string;
}

const Input = (props: InputProps): JSX.Element => {
  return (
    <StyledInput
      ref={props.refer}
      type={props.type}
      placeholder={props.placeholder}
      pattern={props.pattern}
    />
  );
};

export const StyledInput = styled.input`
  position: relative;
  width: 100%;
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.text};
  box-sizing: border-box;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  padding-left: 1rem;
  border-radius: 3px;
  outline: none;
  border: 1px black solid;
  border-color: ${({ theme }) => theme.text};
  font-size: 1rem;
  z-index: 1;

  ::placeholder {
    opacity: 1;
  }

  :focus {
    ::placeholder {
      opacity: 0;
    }
  }
`;

export default Input;
