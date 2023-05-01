import * as React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

import Container from "../components/Container";
import Button from "../components/Button";
import Input from "../components/Input";

interface Props {
  sendMessage: (
    message: string | ArrayBuffer | SharedArrayBuffer | Blob | ArrayBufferView,
    keep?: boolean
  ) => void;
  title: string | null;
  username: string | null;
  wordUpdate: string | null;
}

const StartedLobby = ({ sendMessage, title, username, ...props }: Props) => {
  const wordRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (props.wordUpdate === null) return;

    if ("speechSynthesis" in window) {
      const msg = new SpeechSynthesisUtterance(props.wordUpdate);
      window.speechSynthesis.speak(msg);
    } else {
      Swal.fire({
        title: "Error",
        text: `Your browser doesn't support text to speech`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

    Swal.fire({
      title: "Incoming Word!",
      text: `The word is: ${props.wordUpdate}`,
      icon: "success",
      confirmButtonText: "Ok",
    });
  }, [props.wordUpdate]);

  const inputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendMessage(
      JSON.stringify({
        type: "input_word",
        payload: {
          target_id: title,
          username: username,
          word: wordRef.current?.value,
        },
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
      <StyledForm onSubmit={(e) => inputSubmit(e)}>
        <h1>Input a word</h1>
        <StyledInput refer={wordRef}></StyledInput>
        <SubmitButton>Submit</SubmitButton>
      </StyledForm>
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

export default StartedLobby;
