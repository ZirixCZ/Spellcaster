import * as React from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import getLobbyFromURL from "../utils/getLobbyFromURL";
import { useLocation } from "react-router-dom";
import callApi from "../utils/callApi";
import { User } from "../types/Lobby";
import styled from "styled-components/macro";
import Container from "../components/Container";

interface Game {
  data: string;
}

const Lobby = (): JSX.Element => {
  const [title, setTitle] = React.useState<string | null>(null);
  const [username, setUsername] = React.useState<string | null>(null);
  const [socketUrl] = React.useState("ws://localhost:8000/ws/lobby/state");
  const [messageHistory, setMessageHistory] = React.useState<Game[]>([]);
  const [connectedUsers, setConnectedUsers] = React.useState<User[]>([]);
  const location = useLocation();

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  // listen for websocket messages
  React.useEffect(() => {
    if (lastMessage !== null) {
      console.log("incoming message", lastMessage.data);
      setConnectedUsers(JSON.parse(lastMessage.data).user);
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
    // do stuff
    sendMessage(
      JSON.stringify({
        type: "start_lobby",
        payload: { target_id: title, username: username },
      })
    );
  };

  return (
    <Container
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
      <UnorderedList>
        {connectedUsers?.map((user, i) => (
          <span key={i}>{user ? user.name : null}</span>
        ))}
      </UnorderedList>
    </Container>
  );
};

const UnorderedList = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 25%;
  flex-wrap: wrap;
`;

export default Lobby;
