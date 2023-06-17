import * as React from "react";
import { ButtonWrapper, StyledHeader } from "./dashboard";
import styled, { css } from "styled-components/macro";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import LeaderboardView from "../views/LeaderboardView";
import { mobile } from "../Global";

const Leaderboard = (): JSX.Element => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/");
  }, []);

  return (
    <Container height={100} width={100}>
      <Container
        height={100}
        width={25}
        widthMobile={75}
        justifyContent="space-evenly"
      >
        <StyledHeader>
          <h1>Leaderboard</h1>
        </StyledHeader>
        <LeaderboardView />
      </Container>
    </Container>
  );
};

export default Leaderboard;
