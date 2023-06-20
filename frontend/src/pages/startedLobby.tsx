import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Role } from "../Global";

import Container from "../components/Container";
import Button from "../components/Button";
import Input from "../components/Input";
import calculateRoundCount from "../utils/calculateRoundCount";
import { ButtonWrapper } from "./dashboard";

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
  const [replay, setReplay] = React.useState<boolean>(false);
  const [isFinished, setIsFinished] = React.useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

  React.useEffect(() => {
    // if countdown reaches zero &
    //      if is wordmaster & word is not null, do not send timedout
    //      if is wordmaster & word is null, send timedout
    //      if is not wordmaster, send timedout
    //      if submitted is true & is wordmaster, send timedout
    if (countdown <= 0 && !isSubmitted) {
      if (role === Role.WORDMASTER && word) return;

      hideControlsHandler();
      inputSubmit(true);
      return;
    }

    // TODO: handle temedout, prevent unwanted sends of input with (true) [indicated timedout]

    // if (countdown <= 0 && isSubmitted && role === Role.WORDMASTER) {
    //   hideControlsHandler();
    //   inputSubmit(true);
    //   return;
    // }
  }, [countdown]);

  React.useEffect(() => {
    setIsSubmitted(false);
  }, [word]);

  function speakAndWait(msg: SpeechSynthesisUtterance, speechSynthesis: any) {
    return new Promise((resolve, reject) => {
      msg.onend = resolve;
      msg.onerror = reject;
      speechSynthesis.speak(msg);
    });
  }

  const callSynthesis = async (word: string) => {
    const msg = new SpeechSynthesisUtterance(word);
    const speechSynthesis = window.speechSynthesis;

    try {
      await speakAndWait(msg, speechSynthesis);
      setIsFinished(true);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (props.wordUpdate === null || role === Role.WORDMASTER) return;
    if (!isFinished) return;

    setIsFinished(false);

    if ("speechSynthesis" in window) {
      callSynthesis(props.wordUpdate);
    } else {
      Swal.fire({
        title: "Error",
        text: `Your browser doesn't support text to speech`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  }, [props.wordUpdate, replay]);

  React.useEffect(() => {
    if (word !== null) {
      setIsSubmitted(false);
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

    setIsSubmitted(true);
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
          <>
            <StyledForm onSubmit={(e) => inputSubmit(false, e)}>
              <Description>
                {role === Role.WORDMASTER
                  ? `Provide a word for others to spell. This word will be pronounced to individuals assigned the WordSpeller role.`
                  : `Listen carefully to the word uttered by the WordMaster. Then try to spell it out in the input box below.`}
              </Description>
              <StyledInput refer={wordRef}></StyledInput>
              <SubmitButton secondary>
                {role === Role.WORDMASTER ? "Cast" : "Spell"}
              </SubmitButton>

              <h3>{countdown} seconds remaining</h3>
            </StyledForm>
            {role === Role.WORDSPELLER ? (
              <ReplayButtonWrapper onClick={() => setReplay(!replay)}>
                <Button>replay word</Button>
              </ReplayButtonWrapper>
            ) : (
              <></>
            )}
          </>
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

const ReplayButtonWrapper = styled(ButtonWrapper)`
  width: 10rem;
`;

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
