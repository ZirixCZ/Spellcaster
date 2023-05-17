import * as React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

import Container from "../components/Container";
import Button from "../components/Button";
import Input from "../components/Input";
import { Role } from "../Global";

interface Props {
  sendMessage: (
    message: string | ArrayBuffer | SharedArrayBuffer | Blob | ArrayBufferView,
    keep?: boolean
  ) => void;
  title: string | null;
  username: string | null;
  role: string | null;
  wordUpdate: string | null;
  roundCount: number | null;
  roundsPlayed: number | null;
}

const StartedLobby = ({
  sendMessage,
  title,
  username,
  role,
  roundCount,
  roundsPlayed,
  ...props
}: Props) => {
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
      <InnerContainer>
        <Title>{role}</Title>
        <StyledForm onSubmit={(e) => inputSubmit(e)}>
          <Description>
            {role === Role.WORDMASTER
              ? `Provide a word for others to spell. This word will be pronounced to individuals assigned the WordSpeller role.`
              : `Listen carefully to the word uttered by the WordMaster. Then try to spell it out in the input box below.`}
          </Description>
          <StyledInput refer={wordRef}></StyledInput>
          <SubmitButton>
            {role === Role.WORDMASTER ? "Cast" : "Spell"}
          </SubmitButton>
        </StyledForm>
      </InnerContainer>
      <h2>
        {roundCount !== null && roundsPlayed !== null
          ? roundCount - roundsPlayed
          : "a few"}{" "}
        remaining rounds
      </h2>
    </Container>
  );
};

const Title = styled.h1`
  font-size: 3rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding-bottom: 2rem;
`;

const Description = styled.p`
  font-size: 1rem;
  text-align: center;
  max-width: 20rem;
  margin: 0;
  padding: 0;
`;

const SubmitButton = styled(Button)`
  width: 50%;
`;

const StyledInput = styled(Input)``;

export default StartedLobby;
