import * as React from "react";
import styled, { css } from "styled-components";
import { User } from "../types/Lobby";
import { mobile, tablet } from "../Global";

interface Props {
  data: User[] | null;
}

const SummaryMenu = ({ data }: Props) => {
  const [rankings, setRankings] = React.useState<User[] | null>(null);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    if (!data) return;

    setRankings(data.slice(0, 3));
  }, [data]);

  React.useEffect(() => {
    if (!rankings) return;

    setCurrentUser(rankings[0]);
  }, [rankings]);

  const handleNext = () => {
    if (!rankings) return;

    const newRankings = [...rankings];
    const firstUser = newRankings.shift();
    newRankings.push(firstUser!);
    setRankings(newRankings);
    setCurrentUser(newRankings[0]);
  };

  return (
    <StyledSummaryMenu>
      <SummaryRank placement={currentUser?.placement}>{`${
        currentUser?.placement ?? "1"
      }. place`}</SummaryRank>
      <SummaryUsername>{currentUser?.name}</SummaryUsername>
      <SummaryNext onClick={handleNext}>Next</SummaryNext>
    </StyledSummaryMenu>
  );
};

const StyledSummaryMenu = styled.div`
  background: ${({ theme }) => theme.white};
  z-index: 1;
  border: 0.2rem solid ${({ theme }) => theme.black};
  width: 90%;
  max-width: 30rem;
  height: 20rem;
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

interface SummaryRankInterface {
  placement: number | undefined;
}

const SummaryRank = styled.p<SummaryRankInterface>`
  font-size: 2rem;
  font-weight: 700;
  font-style: italic;
  margin: 0;
  padding: 0;
  padding-top: 2rem;

  color: ${({ theme, placement }) =>
    !placement
      ? theme.blue
      : placement === 1
      ? theme.blue
      : placement === 2
      ? theme.red
      : theme.yellow};
`;

const SummaryUsername = styled.p`
  font-size: 2.6rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

const SummaryNext = styled.a`
  font-size: 1.5rem;
  font-weight: 400;
  padding-bottom: 2rem;
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

export default SummaryMenu;
