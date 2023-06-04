import * as React from "react";
import styled from "styled-components/macro";
import Swal from "sweetalert2";

import useWebSocket, { ReadyState } from "react-use-websocket";
import getLobbyFromURL from "../utils/getLobbyFromURL";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import callApi from "../utils/callApi";
import Container from "../components/Container";
import StartedLobby from "./startedLobby";
import { arraysMatch } from "../utils/arraysMatch";
import LobbyMasterPanel from "../views/LobbyMasterPanel";
import { LobbyInterface } from "../types/Lobby";
import useCountdown from "../utils/useCountdown";
import { Role } from "../Global";

interface Game {
  data: string;
}

const Lobby = (): JSX.Element => {
  const [title, setTitle] = React.useState<string | null>(null);
  const [username, setUsername] = React.useState<string | null>(null);
  const [socketUrl] = React.useState("ws://localhost:8000/ws/lobby/state");
  const [messageHistory, setMessageHistory] = React.useState<Game[]>([]);
  const [connectedUsers, setConnectedUsers] = React.useState<string[]>([]);
  const [isStarted, setIsStarted] = React.useState<boolean>(false);
  const [roundCount, setRoundCount] = React.useState<number>(1);
  const [roundsPlayed, setRoundsPlayed] = React.useState<number | null>(null);
  const RoundInputRef = React.useRef<HTMLInputElement | null>(null);
  const [word, setWord] = React.useState<string | null>(null);
  const [role, setRole] = React.useState<Role | null>(null);
  const [isMaster, setIsMaster] = React.useState<boolean>(false);
  const [hideControls, setHideControls] = React.useState<boolean>(false);

  const countdown = useCountdown(30, roundsPlayed, word, role);

  React.useEffect(() => {
    setWord(null);
  }, [roundsPlayed]);

  React.useEffect(() => {
    if (role === Role.WORDSPELLER && !word) {
      setHideControls(true);
      return;
    }

    if (role === Role.WORDSPELLER && word) {
      setHideControls(false);
    }
  }, [word, role]);

  const location = useLocation();
  const navigate = useNavigate();

  const { name } = useParams();

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  const FetchConnectedUsers = () => {
    const joinLobby = {
      type: "fetch_users",
      payload: {
        target_id: title,
      },
    };
    sendMessage(JSON.stringify(joinLobby));
  };

  // listen for websocket messages
  React.useEffect(() => {
    if (lastMessage === null) return;

    const message = JSON.parse(lastMessage.data);
    if (message.type === "lobby_error") {
      navigate("/lobbies");
    } else if (message.type === "word_error") {
      Swal.fire({
        title: "Error",
        text: `${message.payload.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      if (role === Role.WORDSPELLER) {
        setHideControls(true);
      }
    } else if (message.type === "fetch_users") {
      if (arraysMatch(message.payload.usernames, connectedUsers)) return;
      setConnectedUsers(message.payload.usernames);
    } else if (message.type === "join_lobby") {
      setIsMaster(message.payload.master_username === username);
      setConnectedUsers(message.payload.usernames);
      setInterval(FetchConnectedUsers, 4000);
    } else if (message.type === "start_lobby") {
      setIsStarted(true);
      setRoundCount(message.payload.rounds_count);
    } else if (message.type === "roles") {
      setRoundsPlayed(message.payload.rounds_played);
      setRole(message.payload.role);
    } else if (message.type === "input_word") {
      setWord(message.payload.word);
      if (role === Role.WORDMASTER) {
        setHideControls(true);
      }
    } else if (message.type === "success") {
      Swal.fire({
        title: "Success",
        text: `${message.payload.message}`,
        icon: "success",
        confirmButtonText: "Ok",
      });
    } else if (message.type === "end_game") {
      navigate(
        { pathname: `/lobbies/${name}/summary`, search: `?name=${name}` },
        {
          state: { username: username },
        }
      );
    }
  }, [lastMessage, setMessageHistory]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Connected",
    [ReadyState.CLOSING]: "Disconnecting",
    [ReadyState.CLOSED]: "Disconnected",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  React.useEffect(() => {
    setTitle(getLobbyFromURL(location.pathname));
  }, [location.pathname]);

  React.useEffect(() => {
    if (!title || !username) return;
    const joinLobby = {
      type: "join_lobby",
      payload: {
        target_id: title,
        username: username,
      },
    };
    sendMessage(JSON.stringify(joinLobby));
  }, [title, username]);

  React.useEffect(() => {
    if (!isStarted || !isMaster) return;

    const getRoles = {
      type: "roles",
      payload: {
        target_id: title,
        username: username,
      },
    };
    sendMessage(JSON.stringify(getRoles));
  }, [isStarted]);

  React.useEffect(() => {
    if (readyState !== ReadyState.OPEN) return;
    callApi("GET", "/api/user/verifyusername", null).then((res) => {
      res.json().then((data) => {
        setUsername(data.userName);
      });
    });
  }, [readyState]);

  const startGame = () => {
    sendMessage(
      JSON.stringify({
        type: "start_lobby",
        payload: {
          target_id: title,
          username: username,
          rounds_count: parseInt(RoundInputRef.current?.value ?? "1"),
        },
      })
    );
  };

  return isStarted ? (
    <>
      <StartedLobby
        roundCount={roundCount}
        roundsPlayed={roundsPlayed}
        wordUpdate={word}
        sendMessage={sendMessage}
        title={title}
        username={username}
        role={role}
        hideControls={hideControls}
        setHideControls={setHideControls}
        countdown={countdown}
        word={word}
      />
    </>
  ) : (
    <StyledContainer
      width={100}
      height={100}
      justifyContent="center"
      alignItems="center"
    >
      <h1>{title}</h1>
      <p>
        {connectionStatus}{" "}
        {readyState === ReadyState.OPEN && username ? `as ${username}` : null}
      </p>
      {isMaster && (
        <LobbyMasterPanel
          startGame={startGame}
          readyState={readyState}
          roundInputRef={RoundInputRef}
        />
      )}
      <UsersTitle>Connected Users</UsersTitle>
      <UnorderedList>
        {connectedUsers?.map((user, i) => (
          <span key={i}>{user}</span>
        ))}
      </UnorderedList>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  font-size: 1.5rem;
`;

const UsersTitle = styled.h3`
  margin-top: 5rem;
  margin-bottom: 0;
  width: 20rem;
  text-align: center;
  font-size: 1.5rem;
`;

const UnorderedList = styled.ul`
  padding-top: 1rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 23rem;
  flex-wrap: wrap;
  padding-left: 0;
  margin-left: 0;
  justify-content: space-evenly;
`;

export default Lobby;
