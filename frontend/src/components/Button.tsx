import * as React from "react";
import styled from "styled-components/macro";
import { motion } from "framer-motion";

interface ButtonProps {
  children?: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  disabled?: boolean;
}

const Button = (props: ButtonProps): JSX.Element => {
  return (
    <StyledButton
      {...props}
      whileHover={{ scale: 1.025 }}
      transition={{ type: "tween", duration: 0.1, ease: "easeOut", delay: 0 }}
    >
      {props.children}
    </StyledButton>
  );
};

interface Props {
  primary?: boolean;
  secondary?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  disabled?: boolean;
}

export const StyledButton = styled(motion.button)<Props>`
  position: relative;
  background: ${({ primary, secondary, theme }) =>
    primary
      ? `linear-gradient(180deg, ${theme.primary} 0%, rgba(${
          theme.isLight ? "67,67,67,1" : "white"
        }) 100%)`
      : secondary
      ? `linear-gradient(180deg, ${theme.secondary} 0%, rgba(3,206,120,1) 100%)`
      : theme.gray};
  color: ${({ theme }) => theme.white};
  width: 100%;
  height: ${({ small, medium, large }) =>
    small ? "2.5rem" : medium ? "3.5rem" : large ? "4.5rem" : "3.5rem"};
  font-weight: 600;
  border-radius: 15px;
  border: ${({ theme, primary, secondary }) =>
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
`;

export default Button;
