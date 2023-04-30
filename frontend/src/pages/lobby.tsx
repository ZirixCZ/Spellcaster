import * as React from "react";
import styled from "styled-components/macro";

import useWebSocket, { ReadyState } from "react-use-websocket";
import getLobbyFromURL from "../utils/getLobbyFromURL";
import { useLocation, useNavigate } from "react-router-dom";
import callApi from "../utils/callApi";
import Container from "../components/Container";
import StartedLobby from "./startedLobby";

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
  const [word, setWord] = React.useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

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
    if (message.type === "error") {
      navigate("/lobbies");
    } else if (message.type === "fetch_users") {
      setConnectedUsers(message.payload.usernames);
    } else if (message.type === "join_lobby") {
      setConnectedUsers(message.payload.usernames);
      setInterval(FetchConnectedUsers, 4000);
    } else if (message.type === "start_lobby") {
      setIsStarted(true);
    } else if (message.type === "input_word") {
      setWord(message.payload.word);
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
        payload: { target_id: title, username: username },
      })
    );
  };

  return isStarted ? (
    <StartedLobby
      wordUpdate={word}
      sendMessage={sendMessage}
      title={title}
      username={username}
    />
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

      <button
        onClick={() => startGame()}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click to start
      </button>
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
  width: 20rem;
  flex-wrap: wrap;
  padding-left: 0;
  margin-left: 0;
  justify-content: space-evenly;
`;

export default Lobby;
