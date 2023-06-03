import * as React from "react";
import styled, { css } from "styled-components/macro";
import Swal from "sweetalert2";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { User } from "../types/Lobby";
import callApi from "../utils/callApi";
import Button from "../components/Button";
import { mobile, tablet } from "../Global";
import SummaryMenu from "../views/SummaryMenu";

const LobbySummary = () => {
  const [rankings, setRankings] = React.useState<User[] | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [scrollAmount, setScrollAmount] = React.useState(0);
  const [username, setUsername] = React.useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { name } = useParams();

  React.useEffect(() => {
    if (!location.state) window.location.replace("/");

    setUsername(location.state.username);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollAmount(containerRef?.current?.scrollTop ?? 0);
    };

    containerRef?.current?.addEventListener("scroll", handleScroll);

    return () => {
      containerRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    if (rankings) return;

    callApi("GET", `/api/lobby/summary?name=${name}`, null).then((res) => {
      if (!res.ok) {
        Swal.fire({
          title: "Error",
          text: "Could not get lobby summary.",
          icon: "error",
        });
        return;
      }
      res.json().then((json) => {
        console.log(json);
        setRankings(json);
      });
    });
  }, []);

  const currentPlayerScore = () => {
    return rankings?.find((user) => user.name === username)?.score;
  };

  return (
    <StyledSummary>
      <Content>
        <PersonalSummary>
          <PersonalSummaryTitle>You did well!</PersonalSummaryTitle>
          <PersonalSummaryParagraph>{`Your score: ${currentPlayerScore()}`}</PersonalSummaryParagraph>
        </PersonalSummary>
        <Summary>
          <Title>Summary</Title>

          <SummaryMenu data={rankings} />

          <ButtonWrapper onClick={() => navigate("/")}>
            <Button>Continue</Button>
          </ButtonWrapper>
        </Summary>
        <Leaderboard>
          <ArrowUp
            src="/img/arrow.svg"
            alt="arrow"
            isVisible={scrollAmount > 20}
            onClick={() => {
              containerRef?.current?.scrollBy({
                top:
                  containerRef.current?.scrollTop -
                  containerRef.current?.scrollTop -
                  50,
                behavior: "smooth",
              });
            }}
          />
          <Container ref={containerRef}>
            {rankings &&
              rankings.map((user: User, i) => {
                return (
                  <Wrapper count={i}>
                    <Rank>{i + 1}.</Rank>
                    <Username>
                      {user.name.length > 10
                        ? user.name.substring(0, 10) + "..."
                        : user.name}
                    </Username>
                    <Score>{user.score}</Score>
                  </Wrapper>
                );
              })}
          </Container>
          <Arrow
            src="/img/arrow.svg"
            alt="arrow"
            isVisible={
              containerRef?.current && rankings
                ? scrollAmount <
                    containerRef.current.scrollHeight - scrollAmount &&
                  rankings.length > 5
                : true
            }
            onClick={() => {
              if (!containerRef.current) return;
              const container = containerRef.current;
              if (container) {
                const newScrollTop = container.scrollTop + 50;
                container.scrollTo({
                  top: newScrollTop,
                  behavior: "smooth",
                });
              }
            }}
          />
        </Leaderboard>
      </Content>
    </StyledSummary>
  );
};

const PersonalSummary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${tablet(css`
    display: none;
  `)}
`;

const PersonalSummaryTitle = styled.h2`
  font-size: 2rem;
  margin: 0;
`;

const PersonalSummaryParagraph = styled.p`
  font-size: 1.5rem;
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Leaderboard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  & > div {
    flex: 1;
  }

  ${tablet(css`
    flex-direction: column;
  `)}
`;

interface ArrowInterface {
  isVisible: boolean;
}

const Arrow = styled.img<ArrowInterface>`
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  width: 1.5em;
  filter: invert(20%);
  cursor: pointer;
  margin: 2rem;
  filter: ${({ theme }) => (theme.isLight ? "" : "invert(100%)")};
`;

const ArrowUp = styled(Arrow)`
  transform: rotate(180deg);
`;

const ButtonWrapper = styled.div`
  padding-top: 3rem;
  width: 20rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  ${tablet(css`
    display: none;
  `)};
`;

const StyledSummary = styled.div`
  width: 100%;
  height: fit-content;
  max-height: max-content;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  overflow: scroll;
  background-color: ${({ theme }) => theme.white};
  ${tablet(css``)}
`;

const Rank = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  width: 15%;
`;

const Username = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
`;

const Score = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  margin-left: auto;
  padding-right: 1rem;
`;

interface WrapperInterface {
  count: number;
}

const Wrapper = styled.div<WrapperInterface>`
  width: 100%;
  scroll-snap-align: start;
  height: max-content;
  display: flex;
  flex-direction: row;
  gap: 2rem;

  p {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const Container = styled.div`
  width: 20rem;
  max-height: 20rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  scroll-snap-type: y mandatory;
`;

export default LobbySummary;