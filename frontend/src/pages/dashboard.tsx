import * as React from "react";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { StyledInput } from "../components/Input";
import FormInput from "../components/FormInput";
import styled, { css } from "styled-components/macro";
import callApi from "../utils/callApi";
import LeaderboardView from "../views/LeaderboardView";
import Button from "../components/Button";
import Container from "../components/Container";
import Theme from "../components/Theme";
import { mobile, tablet } from "../Global";
import { useThemeStore } from "../store/themeStore";
import localStorage from "../utils/localStorageRemove";
import localStorageRemove from "../utils/localStorageRemove";
import { generateLobbyCode } from "../utils/generateLobbyCode";
import { LobbyInterface } from "../types/Lobby";

const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const lobbyCodeRef = React.useRef<HTMLInputElement | null>(null);
  const [lobbies, setLobbies] = React.useState<LobbyInterface[] | null>(null);

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

  // fetch lobbies
  React.useEffect(() => {
    callApi("GET", "/api/lobby", null).then((res) => {
      res.json().then((json) => {
        setLobbies(json);
      });
    });
  }, []);

  // create a new lobby
  const onFormSubmit = (e: React.FormEvent) => {
    let name = generateLobbyCode();
    while (lobbies && lobbies.find((item) => item.name === name)) {
      name = generateLobbyCode();
    }

    e.preventDefault();
    callApi(
      "POST",
      "/api/lobby",
      JSON.stringify({
        name: name,
      })
    ).then(() => {
      navigate(`/lobbies/${name}`);
    });
  };

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
            justifyContent="center"
            height={100}
            width={25}
            widthMobile={75}
          >
            <StyledHeader>
              <Title>Spellcaster</Title>
            </StyledHeader>
            <Container width={100}>
              <ButtonWrapper onClick={() => navigate("/lobbies")}>
                <Button secondary medium>
                  Browse lobbies
                </Button>
              </ButtonWrapper>
            </Container>
            <Form onSubmit={(e) => onFormSubmit(e)}>
              <Button secondary medium>
                Create lobby
              </Button>
            </Form>

            <Form
              onSubmit={(e) => {
                e.preventDefault();
                if (!lobbyCodeRef.current?.value) return;

                navigate(`/lobbies/${lobbyCodeRef.current?.value}`);
              }}
            >
              <div>
                <TitleLeft>JOIN EXISTING</TitleLeft>
                <FormInput
                  refer={lobbyCodeRef}
                  placeholder="Enter Lobby Code"
                  type="text"
                  pattern="*"
                  errorMessage="email invalid"
                  autoComplete="username"
                />
              </div>
              <FormButtonWrapper>
                <Button secondary medium>
                  Join
                </Button>
              </FormButtonWrapper>
            </Form>
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

export const Form = styled.form`
  width: 22rem;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;

  ${mobile(css`
    width: 14rem;
    flex-direction: column;
    & > div > div {
      padding: 0;
    }
  `)}
`;

const Title = styled.h1`
  padding-bottom: 2rem;
`;

export const TitleLeft = styled.p`
  width: 100%;
  font-size: 0.75rem;
  font-weight: 600;
  text-align: left;
`;

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

const FormButtonWrapper = styled.div`
  height: 100%;
  width: 35%;
  display: flex;
  align-items: center;
  & > button {
    margin-top: 0.75rem;
    padding: 0;
  }

  ${mobile(css`
    width: 100%;
  `)}
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
  margin-top: 1rem;
  width: 22rem;

  ${mobile(css`
    width: 14rem;
  `)}
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
