import * as React from "react";
import styled from "styled-components/macro";
import Theme from "./Theme";

interface ButtonProps {
    children?: React.ReactNode,
    primary?: boolean,
    leaderboard?: boolean
    small?: boolean
    medium?: boolean
    large?: boolean
}

const Button = (props: ButtonProps): JSX.Element => {

    return (
        <Theme>
            <StyledButton {...props}>{props.children}</StyledButton>
        </Theme>
    )

}

interface Props {
    primary?: boolean,
    leaderboard?: boolean
    small?: boolean
    medium?: boolean
    large?: boolean
}

export const StyledButton = styled.button<Props>`
  background: ${({
                   primary,
                   leaderboard,
                   theme
                 }) => (primary ? theme.primary : leaderboard ? theme.secondary : theme.gray)};
  color: white;
  width: 100%;
  height: ${({small, medium, large}) => (small ? "2.5rem" : medium ? "3.5rem" : large ? "4.5rem" : "3.5rem")};
  font-weight: 600;
  border-radius: 3px;
  font-size: 1.25em;
`

export default Button;

