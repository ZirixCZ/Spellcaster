import * as React from "react";
import styled from "styled-components/macro";
import Button from "../components/Button";
import { ReadyState } from "react-use-websocket";

interface Props {
  startGame: () => void;
  roundInputRef: React.RefObject<HTMLInputElement>;
  timerInputRef: React.RefObject<HTMLInputElement>;
  readyState: number;
}
const LobbyMasterPanel = ({
  startGame,
  readyState,
  roundInputRef,
  timerInputRef,
  ...props
}: Props) => {
  return (
    <Wrapper>
      <Container>
        <ButtonWrapper onClick={() => startGame()}>
          <Button secondary disabled={readyState !== ReadyState.OPEN}>
            Start
          </Button>
        </ButtonWrapper>
      </Container>
      <ControlsWrapper>
        <ControlContainer>
          <h4>Rounds</h4>
          <StyledRoundInput
            isTimer={true}
            type="number"
            min={"1"}
            max={"99"}
            defaultValue={"1"}
            step={1}
            ref={roundInputRef}
          />
        </ControlContainer>
        <ControlContainer>
          <h4>Timer</h4>
          <StyledRoundInput
            isTimer={true}
            type="number"
            min={"5"}
            max={"999"}
            defaultValue={"30"}
            step={5}
            ref={timerInputRef}
          />
        </ControlContainer>
      </ControlsWrapper>
    </Wrapper>
  );
};

interface StyledNumberInputProps {
  primary?: boolean;
  secondary?: boolean;
  isTimer?: boolean;
}

const ButtonWrapper = styled.div`
  display: flex;
  padding-top: 3rem;
  padding-bottom: 1rem;
  width: 100%;
  margin-right: 1rem;
`;

const StyledRoundInput = styled.input<StyledNumberInputProps>`
  width: ${({ isTimer }) => (isTimer ? "5rem" : "4rem")};
  z-index: 0;
  height: 3.5rem;
  border-radius: 15px;
  border: none;
  background: ${({ theme }) => theme.gray};
  color: ${({ theme }) => theme.white};
  font-size: 1.25em;
  font-weight: 600;
  padding: 0 1em;
  text-align: center;
  ::placeholder {
    color: ${({ theme }) => theme.white};
  }
`;

const ControlsWrapper = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 20rem;
  justify-content: space-evenly;
  align-items: end;
`;

const ControlContainer = styled(Container)`
  align-items: center;
`;

const Wrapper = styled(Container)`
  flex-direction: column;
`;

export default LobbyMasterPanel;
