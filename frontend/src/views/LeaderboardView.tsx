import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import Button from "../components/Button";
import Container from "../components/Container";
import Leaderboard from "../components/Leaderboard";

interface Props {
  withButton?: boolean;
}

const LeaderboardView = (props: Props): JSX.Element => {
  const navigate = useNavigate();

  const data = {
    user1: {
      placement: "1",
      username: "user1",
      score: "10",
    },
    user2: {
      placement: "2",
      username: "user2",
      score: "8",
    },
    user3: {
      placement: "3",
      username: "me",
      score: "6",
    },
    user4: {
      placement: "4",
      username: "user4",
      score: "6",
    },
    user5: {
      placement: "5",
      username: "user5",
      score: "6",
    },
  };

  return (
    <Container width={100}>
      <LeaderboardButtonWrapper>
        <StyledLeaderboard>
          {Object.values(data).map((user) => {
            return <Leaderboard {...user} />;
          })}
        </StyledLeaderboard>
        {props.withButton ? (
          <ButtonWrapper
            onClick={() => {
              navigate("/leaderboard");
            }}
          >
            <Button primary small>
              Leaderboard
            </Button>
          </ButtonWrapper>
        ) : null}
      </LeaderboardButtonWrapper>
    </Container>
  );
};

export const StyledLeaderboard = styled.table`
  width: 14rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

export const LeaderboardButtonWrapper = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  padding-top: 3rem;
  width: 14rem;
`;

export default LeaderboardView;
