import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Role } from "../Global";

import Container from "../components/Container";
import Button from "../components/Button";
import Input from "../components/Input";
import calculateRoundCount from "../utils/calculateRoundCount";

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
  hideControls: boolean;
  setHideControls: Dispatch<SetStateAction<boolean>>;
  hideControlsHandler: () => void;
  countdown: number;
  word: string | null;
  userCount: number;
}

const StartedLobby = ({
  sendMessage,
  title,
  username,
  role,
  roundCount,
  roundsPlayed,
  hideControls,
  setHideControls,
  hideControlsHandler,
  countdown,
  word,
  userCount,
  ...props
}: Props) => {
  const wordRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (countdown === 0) {
      hideControlsHandler();
      inputSubmit(true);
    }
  }, [countdown]);

  React.useEffect(() => {
    if (props.wordUpdate === null || role === Role.WORDMASTER) return;

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

  React.useEffect(() => {
    if (word !== null) {
      setHideControls(false);
    }
  }, [roundsPlayed]);

  function inputSubmit(
    timedout: boolean,
    e?: React.FormEvent<HTMLFormElement>
  ) {
    if (e) {
      e.preventDefault();
    }

    sendMessage(
      JSON.stringify({
        type: "input_word",
        payload: {
          target_id: title,
          username: username,
          word: wordRef.current?.value ?? "",
          timedout: timedout,
        },
      })
    );
  }

  return (
    <Container
      width={100}
      height={100}
      justifyContent="center"
      alignItems="center"
    >
      <InnerContainer>
        <Title>{role}</Title>
        {hideControls === false && (
          <StyledForm onSubmit={(e) => inputSubmit(false, e)}>
            <Description>
              {role === Role.WORDMASTER
                ? `Provide a word for others to spell. This word will be pronounced to individuals assigned the WordSpeller role.`
                : `Listen carefully to the word uttered by the WordMaster. Then try to spell it out in the input box below.`}
            </Description>
            <StyledInput refer={wordRef}></StyledInput>
            <SubmitButton>
              {role === Role.WORDMASTER ? "Cast" : "Spell"}
            </SubmitButton>
            <h3>{countdown}</h3>
          </StyledForm>
        )}
      </InnerContainer>
      <h2>
        {roundCount !== null && roundsPlayed !== null
          ? Math.ceil((roundCount - roundsPlayed) / userCount)
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
