import * as React from "react";
import getLobbyFromURL from "../utils/getLobbyFromURL";
import { useLocation } from "react-router-dom";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import callApi from "../utils/callApi";

interface Game {
  data: string
}

export default (): JSX.Element => {
  const [title, setTitle] = React.useState<string | null>(null);
  const [username, setUsername] = React.useState<string | null>(null);
  const [socketUrl] = React.useState('ws://localhost:8000/ws/lobby');
  const [messageHistory, setMessageHistory] = React.useState<Game[]>([]);
  const location = useLocation();

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  React.useEffect(() => {
    if (lastMessage !== null) {
      // @ts-ignore
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);


  const handleClickSendMessage = React.useCallback(() => sendMessage('Hello'), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Connected',
    [ReadyState.CLOSING]: 'Disconnecting',
    [ReadyState.CLOSED]: 'Disconnected',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  React.useEffect(() => {
    setTitle(getLobbyFromURL(location.pathname));
  }, []);

  // TODO: fetch information about lobby depending on name
  React.useEffect(() => {
    if (!title) return;
    return
  }, [title]);

  React.useEffect(() => {
   if (readyState !== ReadyState.OPEN) return;
   callApi('GET', '/api/user/verifyusername', null).then((res) => {
     res.json().then((data) => {
         setUsername(data.userName)
         sendMessage(JSON.stringify({username: data.userName}))
     })
   })
  }, [readyState])

  return (
    <div>
      <h1>{title}</h1>
      <p>{connectionStatus} {readyState === ReadyState.OPEN && username  ? `as ${username}` : null}</p>

      <div>
        <button
            onClick={handleClickSendMessage}
            disabled={readyState !== ReadyState.OPEN}
        >
          Click Me to send 'Hello'
        </button>
        {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
        <ul>
          {messageHistory.map((message, i) => (
              <span key={i}>{message ? message.data : null}</span>
          ))}
        </ul>
      </div>
    </div>
  );
};
