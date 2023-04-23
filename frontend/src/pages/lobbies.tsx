import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Container from "../components/Container";
import FormInput from "../components/FormInput";
import { Form, GTitleLeft } from "./unprotected/register";
import Button from "../components/Button";
import callApi from "../utils/callApi";
import { tablet, mobile } from "../Global";
import Theme from "../components/Theme";
import { motion } from "framer-motion";
import { LobbyInterface } from "../types/Lobby";
import lobby from "./lobby";
import { generateLobbyCode } from "../utils/generateLobbyCode";

const Lobbies = (): JSX.Element => {
  const newLobby = React.useRef<HTMLInputElement | null>(null);
  const [lobbies, setLobbies] = React.useState<LobbyInterface[] | null>(null);
  const startedLobbiesRef = React.useRef<LobbyInterface[]>([]);
  const [scrollAmount, setScrollAmount] = React.useState(0);

  const lobbyContainerRef = React.useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

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

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollAmount(lobbyContainerRef?.current?.scrollTop ?? 0);
    };

    lobbyContainerRef?.current?.addEventListener("scroll", handleScroll);

    return () => {
      lobbyContainerRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const checkIfStarted = (lobby: LobbyInterface): boolean => {
    if (!lobby) return false;

    if (lobby.isStarted) {
      if (!startedLobbiesRef.current.includes(lobby))
        startedLobbiesRef.current.push(lobby);

      return true;
    }

    return false;
  };

  return (
    <Container heightKeyword="fit-content" width={100}>
      <ArrowUp
        src="/img/arrow.svg"
        alt="arrow"
        isVisible={scrollAmount > 100}
        onClick={() => {
          lobbyContainerRef?.current?.scrollBy({
            top:
              lobbyContainerRef.current?.scrollTop -
              lobbyContainerRef.current?.scrollTop -
              200,
            behavior: "smooth",
          });
        }}
      />
      <StyledLobbies
        variants={container}
        initial="hidden"
        animate="visible"
        ref={lobbyContainerRef}
      >
        {!lobbies ? (
          <></>
        ) : (
          lobbies.map((item, i) => {
            if (checkIfStarted(item)) {
              return <></>;
            }

            return (
              <Lobby
                isStarted={item.isStarted}
                whileHover={{
                  scale: 1.025,
                  transition: { duration: 0.25 },
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate(`/lobbies/${item.name ?? null}`)}
                key={i}
              >
                <Title weight={800}>{item.name ? item.name : "noname"}</Title>
                <Text>
                  {item.masterUsername ? item.masterUsername : "error"}
                </Text>
              </Lobby>
            );
          })
        )}
        {startedLobbiesRef.current.length <= 0 ? (
          <></>
        ) : (
          startedLobbiesRef.current.map((item, i) => {
            return (
              <Lobby
                isStarted={item.isStarted}
                whileHover={{
                  scale: 1.025,
                  transition: { duration: 0.25 },
                }}
                whileTap={{ scale: 0.9 }}
                key={i}
              >
                <Title weight={800}>{item.name ? item.name : "noname"}</Title>
                <Text>{item.playerCount ? item.playerCount : "0"} players</Text>
                <Text>
                  {item.masterUsername ? item.masterUsername : "error"}
                </Text>
              </Lobby>
            );
          })
        )}
      </StyledLobbies>
      <Arrow
        src="/img/arrow.svg"
        alt="arrow"
        isVisible={
          lobbyContainerRef?.current
            ? scrollAmount <
              lobbyContainerRef.current.scrollHeight - scrollAmount + 500
            : true
        }
        onClick={() => {
          const lobbyContainer = lobbyContainerRef.current;
          if (lobbyContainer) {
            const newScrollTop = lobbyContainer.scrollTop + 200;
            lobbyContainer.scrollTo({ top: newScrollTop, behavior: "smooth" });
          }
        }}
      />
      <Form onSubmit={(e) => onFormSubmit(e)}>
        <GTitleLeft>CREATE A NEW LOBBY</GTitleLeft>
        <Button secondary medium>
          Create
        </Button>
      </Form>
    </Container>
  );
};

interface ArrowInterface {
  isVisible: boolean;
}

const Arrow = styled.img<ArrowInterface>`
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  width: 2em;
  filter: invert(20%);
  cursor: pointer;
  margin: 0.25rem;
`;

const ArrowUp = styled(Arrow)`
  transform: rotate(180deg);
`;

const StyledLobbies = styled(motion.div)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2em;
  justify-content: center;
  width: 50%;
  margin-bottom: 2.5em;
  overflow: scroll;
  max-height: 50vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ${tablet(css`
    width: 100%;
  `)}
  ${mobile(css`
    justify-content: center;
    width: 150%;
  `)}
`;

const ButtonWrapper = styled.div`
  width: 25%;
  ${tablet(css`
    width: 50%;
  `)}
  margin: 5em;
`;

interface LobbyButtonInterface {
  isStarted: boolean;
}

const Lobby = styled(motion.div)<LobbyButtonInterface>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: start;
  width: 50%;
  height: 7em;
  border-radius: 15px;
  scroll-snap-align: start;

  ${(props) => {
    if (props.isStarted) {
      return css`
        background: rgba(232, 56, 73, 0.8);

        &:hover {
          background: rgba(232, 56, 73, 0.9);
        }
      `;
    } else {
      return css`
        cursor: pointer;
        background-color: rgba(37, 37, 37, 0.8);

        &:hover {
          background: rgba(37, 37, 37, 0.9);
        }
      `;
    }
  }}

  color: white;
  z-index: 1;
  position: relative;
  transition: 0.3s;

  &:first-child {
    margin-top: 2em;
  }
`;

interface TextInterface {
  weight?: number;
}

const Text = styled.p`
  margin: 0;
  margin-left: 1.5rem;
  height: fit-content;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight: ${(props: TextInterface) => props.weight ?? 400};
`;

const Title = styled(Text)`
  font-size: 1.5rem;
  user-select: none;
`;

export default Lobbies;
