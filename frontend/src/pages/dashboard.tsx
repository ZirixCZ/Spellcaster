import * as React from "react";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { StyledInput } from "../components/Input";
import styled, { css } from "styled-components/macro";
import callApi from "../utils/callApi";
import LeaderboardView from "../views/LeaderboardView";
import Button from "../components/Button";
import Container from "../components/Container";
import Theme from "../components/Theme";
import { mobile } from "../Global";
import { useThemeStore } from "../store/themeStore";
import localStorage from "../utils/localStorageRemove";
import localStorageRemove from "../utils/localStorageRemove";

const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    callApi("GET", "/api/home", null).then((res) => {
      if (res.ok) {
        setAuth(true);
        return;
      }
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    });
  }, []);

  return (
    <Container height={100} width={100}>
      {auth ? (
        <>
          <Container
            width={100}
            heightKeyword="fit-content"
            justifyContent="flex-end"
            alignItems="flex-end"
          ></Container>
          <Container
            justifyContent="space-evenly"
            height={100}
            width={25}
            widthMobile={75}
          >
            <StyledHeader>
              <h1>Spellcaster</h1>
            </StyledHeader>
            <StyledContainer width={100}>
              <LeaderboardView withButton={true} />
            </StyledContainer>
            <Container width={100}>
              <ButtonWrapper onClick={() => navigate("/lobbies")}>
                <Button secondary medium>
                  Search For Game
                </Button>
              </ButtonWrapper>
            </Container>
          </Container>
          <LogOutContainer
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
            <LogOutButton>Log Out</LogOutButton>
          </LogOutContainer>
        </>
      ) : (
        <Container justifyContent="center" alignItems="center" height={100}>
          <p>You weren't authorized</p>
        </Container>
      )}
    </Container>
  );
};

export const StyledThemeSwitcher = styled.div`
  width: fit-content;
  height: fit-content;
`;

const StyledContainer = styled(Container)``;

const LogOutContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  bottom: 0;
  right: 0;
  width: 100%;
  height: fit-content;
  ${mobile(css`
    justify-content: center;
  `)}
`;

const LogOutButton = styled.button`
  background-color: ${({ theme }) => theme.red};
  color: white;
  border: none;
  border-radius: 15px;
  padding: 1rem;
  margin-right: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  width: 7rem;
  height: 3.5rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  z-index: 1;
  ${mobile(css`
    margin-right: 0;
  `)}
`;

export const StyledHeader = styled.div`
  font-size: 2rem;
  padding-top: 0;
  ${mobile(css`
    padding-top: 2rem;
    font-size: 1.5rem;
  `)}
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
  margin-top: 1rem;
  width: 14rem;
`;

export const CodeInput = styled(StyledInput)`
  background-color: ${({ theme }) => theme.gray};
  color: white;
  text-align: center;
  font-size: 1.25em;
  font-weight: 600;
  height: 3.5rem;
  border: 1px solid white;
  border-radius: 15px;
`;

export default Dashboard;
