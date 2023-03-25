import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { tablet, mobile } from "../Global";
import { useSymbolStore } from "../store/symbolStore";

interface Props {
  children?: React.ReactNode;
}

const Navbar = (props: Props) => {
  const symbol = useSymbolStore((state) => state.symbol);
  const changeSymbol = useSymbolStore((state) => state.changeSymbol);

  const navigate = useNavigate();

  return (
    <StyledNavbar>
      <StyledContainer>
        <Item onClick={() => navigate("/")}>Dashboard</Item>
        <Item onClick={() => navigate("/leaderboard")}>Leaderboard</Item>
        <Item onClick={() => navigate("/lobbies")}>Lobbies</Item>
      </StyledContainer>
    </StyledNavbar>
  );
};

const Item = styled.a`
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5rem;
  width: fit-content;
  height: 100%;

  &:first-child {
    padding-left: 5rem;

    ${tablet(css`
      padding-left: 4em;
    `)}

    ${mobile(css`
      padding-left: 1em;
    `)}
  }

  ${tablet(css`
    gap: 2em;
  `)}

  ${mobile(css`
    gap: 0.75em;
  `)}
`;

const StyledNavbar = styled.div`
  height: 4rem;
  width: 100%;
  position: absolute;
  z-index: 1;
  background-color: ${({ theme }) => theme.white};
  top: 0;
  border-bottom-width: 4px;
  border-bottom-style: solid;
  border-bottom-image: linear-gradient(to right, darkblue, darkorchid) 1;
`;

export default Navbar;
