import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { tablet, mobile } from "../Global";
import { StyledThemeSwitcher } from "../pages/dashboard";
import { useSymbolStore } from "../store/symbolStore";

interface Props {
  children?: React.ReactNode;
}

const Navbar = (props: Props) => {
  const symbol = useSymbolStore((state) => state.symbol);
  const changeSymbol = useSymbolStore((state) => state.changeSymbol);

  const navigate = useNavigate();

  const [symbolState, setSymbolState] = React.useState<string>("");

  const parseSymbol = (symbol: string) => {
    let parse = symbol.split(".")[0];
    return parse[parse.length - 1];
  };

  React.useEffect(() => {
    setSymbolState(parseSymbol(symbol));
  }, [symbol]);

  return (
    <StyledNavbar symbol={symbolState}>
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
  font-weight: 500;
  cursor: pointer;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5rem;
  width: fit-content;
  height: 100%;
  box-sizing: border-box;

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

interface StyledNavbarInterface {
  symbol: string;
}

const StyledNavbar = styled.div<StyledNavbarInterface>`
  height: 4rem;
  width: 100%;
  position: absolute;
  z-index: 1;
  box-sizing: border-box;
  backdrop-filter: blur(13px);

  background-color: ${({ theme }) => theme.whiteTransparent};
  top: 0;
  border-bottom-width: 1.5px;
  border-top-width: 0;
  border-style: solid;
  border-left: 0;
  border-right: 0;
  border-image: ${({ symbol }) =>
    `linear-gradient(to right, ${
      symbol === "K"
        ? "#24da24"
        : symbol === "A"
        ? "#22cc11"
        : symbol === "B"
        ? "#3fbf3f"
        : symbol === "C"
        ? "#00ff2a"
        : symbol === "D"
        ? "#ff8c00"
        : symbol === "E"
        ? "#ff8c00"
        : symbol === "F"
        ? "#1c54c6"
        : symbol === "G"
        ? "#2aaaff"
        : symbol === "H"
        ? "#00aad4"
        : symbol === "I"
        ? "#00b0fe"
        : symbol === "J"
        ? "#00b0fe"
        : symbol === "L"
        ? "#33e519"
        : symbol === "M"
        ? "#df005f"
        : symbol === "N"
        ? "#df005f"
        : symbol === "O"
        ? "#aa00ff"
        : symbol === "P"
        ? "#ff0000"
        : symbol === "Q"
        ? "#ff8c00"
        : symbol === "R"
        ? "#006ae9"
        : symbol === "S"
        ? "#6600cc"
        : symbol === "T"
        ? "#00c8ec"
        : symbol === "U"
        ? "#0073e7"
        : symbol === "V"
        ? "#1c8dc6"
        : symbol === "W"
        ? "#00bfff"
        : symbol === "X"
        ? "#8d38c6"
        : symbol === "Y"
        ? "#9f5fbf"
        : symbol === "Z"
        ? "#1966cc"
        : "black"
    }, ${
      symbol === "K"
        ? "#4600fe"
        : symbol === "A"
        ? "#f00e00"
        : symbol === "B"
        ? "#000ef0"
        : symbol === "C"
        ? "#ff8c00"
        : symbol === "D"
        ? "#0045d0"
        : symbol === "E"
        ? "#ff8c00"
        : symbol === "F"
        ? "#a50f78"
        : symbol === "G"
        ? "#d400fe"
        : symbol === "H"
        ? "#d22d5a"
        : symbol === "I"
        ? "#b42d69"
        : symbol === "J"
        ? "#b42d69"
        : symbol === "L"
        ? "#3c3cc3"
        : symbol === "M"
        ? "#c600f0"
        : symbol === "N"
        ? "#c600f0"
        : symbol === "O"
        ? "#1f0fff"
        : symbol === "P"
        ? "#c600e2"
        : symbol === "Q"
        ? "#ff8c00"
        : symbol === "R"
        ? "#7faf7f"
        : symbol === "S"
        ? "#b4005a"
        : symbol === "T"
        ? "#f09b0e"
        : symbol === "U"
        ? "#c30fff"
        : symbol === "V"
        ? "#8f2fff"
        : symbol === "W"
        ? "#00eb75"
        : symbol === "X"
        ? "#ef006f"
        : symbol === "Y"
        ? "#ff8c00"
        : symbol === "Z"
        ? "#71fe00"
        : "black"
    }) 1`};
`;

export default Navbar;
