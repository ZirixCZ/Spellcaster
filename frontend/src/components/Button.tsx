import * as React from "react";
import styled from "styled-components/macro";
import Theme from "./Theme";

interface ButtonProps {
  children?: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
}

const Button = (props: ButtonProps): JSX.Element => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

interface Props {
  primary?: boolean;
  secondary?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
}

export const StyledButton = styled.button<Props>`
  position: relative;
  background: ${({ primary, secondary, theme }) =>
    primary ? theme.primary : secondary ? theme.secondary : theme.gray};
  color: ${({ theme }) => theme.white};
  width: 100%;
  height: ${({small, medium, large}) =>
      small ? "2.5rem" : medium ? "3.5rem" : large ? "4.5rem" : "3.5rem"};
  font-weight: 600;
  border-radius: 15px;
  border: ${({theme, primary, secondary}) =>
      primary
          ? null
          : secondary
              ? null
              : theme.isLight
                  ? null
                  : `1px solid ${theme.text}`};
  font-size: 1.25em;
  z-index: 1;
  transition: 0.3s;
  
  &:hover {
    background: ${({ theme }) => theme.buttonHover};
  }
`;

export default Button;
