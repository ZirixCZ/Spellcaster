import * as React from "react";
import styled from "styled-components/macro";

import useWebSocket, { ReadyState } from "react-use-websocket";
import getLobbyFromURL from "../utils/getLobbyFromURL";
import { useLocation, useNavigate } from "react-router-dom";
import callApi from "../utils/callApi";
import { User } from "../types/Lobby";
import Button from "../components/Button";
import Input from "../components/Input";
import Paragraph from "../components/Paragraph";
import Container from "../components/Container";

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
  const location = useLocation();
  const navigate = useNavigate();

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  // listen for websocket messages
  React.useEffect(() => {
    if (lastMessage === null) return;

    const message = JSON.parse(lastMessage.data);
    if (message.type === "error") {
      navigate("/lobbies");
    }
    if (message.type === "join_lobby") {
      setConnectedUsers(message.payload.usernames);
    } else if (message.type === "start_lobby") {
      setIsStarted(true);
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

  const inputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return isStarted ? (
    <Container
      width={100}
      height={100}
      justifyContent="center"
      alignItems="center"
    >
      <StyledForm onSubmit={(e) => inputSubmit(e)}>
        <h1>Input a word</h1>
        <StyledInput></StyledInput>
        <SubmitButton>Submit</SubmitButton>
      </StyledForm>
    </Container>
  ) : (
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
      <UsersTitle>Connected Users</UsersTitle>
      <UnorderedList>
        {connectedUsers?.map((user, i) => (
          <span key={i}>{user}</span>
        ))}
      </UnorderedList>
    </Container>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const SubmitButton = styled(Button)`
  width: 50%;
`;

const StyledInput = styled(Input)``;

const UsersTitle = styled.h3`
  margin-top: 5rem;
  margin-bottom: 0;
  width: 20rem;
  text-align: center;
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
