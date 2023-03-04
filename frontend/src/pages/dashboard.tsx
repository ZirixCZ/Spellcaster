import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledInput } from "../components/Input";
import styled, { css } from "styled-components/macro";
import callApi from "../utils/callApi";
import LeaderboardView from "../views/LeaderboardView";
import Button from "../components/Button";
import Container from "../components/Container";
import Theme from "../components/Theme";
import { mobile } from "../Global";
import { useThemeStore } from "../store/themeStore";

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
      <Container height={100}>
        {auth ? (
          <>
            <Container
              width={100}
              heightKeyword="fit-content"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              {/*<StyledThemeSwitcher*/}
              {/*  onClick={() => {*/}
              {/*    navigate("/theme");*/}
              {/*  }}*/}
              {/*>*/}
              {/*  <Button primary>settings</Button>*/}
              {/*</StyledThemeSwitcher>*/}
            </Container>
            <Container
              justifyContent="space-evenly"
              height={100}
              width={75}
            >
              <StyledHeader>
                <h1>Spellcaster</h1>
              </StyledHeader>
              <Container width={100}>
                <LeaderboardView />
              </Container>
              <Container width={100}>
                <ButtonWrapper>
                  <CodeInput placeholder="Enter code..."></CodeInput>
                </ButtonWrapper>
                <ButtonWrapper onClick={() => navigate("/lobbies")}>
                  <Button primary medium>
                    Search For Game
                  </Button>
                </ButtonWrapper>
              </Container>
            </Container>
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
  width: 100%;
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
