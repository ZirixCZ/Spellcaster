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
  const [lobbiesLoading, setLobbiesLoading] = React.useState(true);
  const startedLobbiesRef = React.useRef<LobbyInterface[]>([]);
  const [scrollAmount, setScrollAmount] = React.useState(0);
  const [displayBottomArrow, setDisplayBottomArrow] = React.useState(false);

  const lobbyContainerRef = React.useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  // fetch lobbies
  React.useEffect(() => {
    callApi("GET", "/api/lobby", null).then((res) => {
      res.json().then((json) => {
        setLobbies(json);
        setLobbiesLoading(false);
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

  const bottomArrowVisibility = () => {
    if (!lobbyContainerRef.current) {
      console.log("hree");
      if (lobbies && lobbies.length > 3) return true;
      console.log("a");
      return false;
    }

    return scrollAmount < lobbyContainerRef.current.scrollHeight - 500;
  };

  React.useEffect(() => {
    console.log(bottomArrowVisibility());
    setDisplayBottomArrow(bottomArrowVisibility());
  }, [lobbiesLoading, scrollAmount]);

  return (
    <Container heightKeyword="fit-content" width={100}>
      <ButtonWrapper onClick={() => navigate("/")}>
        <Button>Go back</Button>
      </ButtonWrapper>{" "}
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
        {(!lobbies ||
          lobbies.reduce(
            (acc, obj) => (obj.isStarted === false ? acc + 1 : acc),
            0
          ) <= 0) &&
        !lobbiesLoading ? (
          <LobbiesNotFoundTitle>No lobbies found</LobbiesNotFoundTitle>
        ) : (
          lobbies &&
          lobbies.map((item, i) => {
            if (checkIfStarted(item)) {
              return null;
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
      </StyledLobbies>
      <Arrow
        src="/img/arrow.svg"
        alt="arrow"
        isVisible={displayBottomArrow}
        onClick={() => {
          const lobbyContainer = lobbyContainerRef.current;
          if (lobbyContainer) {
            const newScrollTop = lobbyContainer.scrollTop + 200;
            lobbyContainer.scrollTo({ top: newScrollTop, behavior: "smooth" });
          }
        }}
      />
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
  filter: ${({ theme }) => (theme.isLight ? "" : "invert(100%)")};
`;

const ArrowUp = styled(Arrow)`
  transform: rotate(180deg);
  margin-top: 0;
  margin-bottom: 2rem;
`;

const LobbiesNotFoundTitle = styled.h2`
  font-size: 3rem;

  ${tablet(css`
    font-size: 2rem;
  `)}
`;

const StyledLobbies = styled(motion.div)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2em;
  justify-content: center;
  width: 50%;
  margin-bottom: 2.5em;
  overflow-y: scroll;
  max-height: 50vh;
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
  width: 15%;
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

  ${(props) => {
    if (props.isStarted) {
      return css`
        background: rgba(232, 56, 73);

        &:hover {
          background: rgba(232, 56, 73);
        }
      `;
    } else {
      return css`
        cursor: pointer;
        background-color: rgba(37, 37, 37);

        &:hover {
          background: rgba(37, 37, 37);
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
