import * as React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import callApi from "../utils/callApi";
import styled, { css } from "styled-components/macro";
import { tablet, mobile } from "../Global";
import localStorageRemove from "../utils/localStorageRemove";
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
  const [username, setUsername] = React.useState<string | null>(null);

  const parseSymbol = (symbol: string) => {
    let parse = symbol.split(".")[0];
    return parse[parse.length - 1];
  };

  React.useEffect(() => {
    setSymbolState(parseSymbol(symbol));
  }, [symbol]);

  React.useEffect(() => {
    callApi("GET", "/api/user/verifyusername", null).then((res) => {
      res.json().then((data) => {
        setUsername(data.userName);
      });
    });
  }, []);

  return (
    <StyledNavbar symbol={symbolState}>
      <StyledContainer>
        <Item onClick={() => navigate("/")}>
          <Logo src="/img/logo.png" />
        </Item>
        <Item>{username}</Item>
      </StyledContainer>
      <LogoutButton
        onClick={() => {
          if (localStorageRemove("jwt")) {
            navigate("/welcome");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        }}
      >
        <img src="/img/logout.svg" alt="logout button" />
      </LogoutButton>
    </StyledNavbar>
  );
};

const LogoutButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.75rem;
  margin-right: 5rem;
  border: none;
  font-size: 2rem;
  max-width: 2.5rem;
  border-radius: 100%;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  z-index: 99;

  & > img {
    width: 2rem;
    filter: ${({ theme }) => !theme.isLight && "invert(1)"};
  }
`;

const Logo = styled.img`
  width: 2rem;
  background-color: transparent;
  margin-top: 0.25rem;
`;

const Item = styled.a`
  font-size: 1.25rem;
  font-weight: 500;
  cursor: pointer;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2.5rem;
  width: fit-content;
  height: 100%;
  box-sizing: border-box;

  &:first-child {
    padding-left: 2rem;

    ${tablet(css`
      padding-left: 4em;
    `)}

    ${mobile(css`
      padding-left: 1em;
    `)}
  }

  ${tablet(css`
    gap: 2.5em;
  `)}

  ${mobile(css`
    gap: 1em;
  `)}
`;

interface StyledNavbarInterface {
  symbol: string;
}

const StyledNavbar = styled.div<StyledNavbarInterface>`
  height: 4rem;
  width: 100%;
  position: absolute;
  z-index: 2;
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
