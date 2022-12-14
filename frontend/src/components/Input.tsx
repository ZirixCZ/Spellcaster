import * as React from "react";
import styled from "styled-components/macro";

interface InputProps {
    refer?: React.RefObject<HTMLInputElement> | null,
    placeholder?: string,
    type?: string,
    pattern?: string,
    errorMessage?: string
}

const Input = (props: InputProps): JSX.Element => {

    return (
        <StyledInput ref={props.refer} type={props.type} placeholder={props.placeholder} pattern={props.pattern}/>
    )

}

export const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  padding-left: 1rem;
  border-radius: 3px;
  outline: none;
  border: 1px black solid;
  font-size: 1rem;

  ::placeholder {
    opacity: 1;
  }

  :focus {
    ::placeholder {
      opacity: 0;
    }
  }
`

export default Input;
