import * as React from "react";
import styled from "styled-components/macro";
import Button from "../components/Button";
import { ReadyState } from "react-use-websocket";

interface Props {
  startGame: () => void;
  roundInputRef: React.RefObject<HTMLInputElement>;
  readyState: number;
}
const LobbyMasterPanel = ({
  startGame,
  readyState,
  roundInputRef,
  ...props
}: Props) => {
  return (
    <Container>
      <ButtonWrapper onClick={() => startGame()}>
        <Button secondary disabled={readyState !== ReadyState.OPEN}>
          Start
        </Button>
      </ButtonWrapper>
      <StyledRoundInput
        type="number"
        min={"1"}
        defaultValue={"1"}
        step={1}
        ref={roundInputRef}
      />
    </Container>
  );
};

interface StyledNumberInputProps {
  primary?: boolean;
  secondary?: boolean;
}

const ButtonWrapper = styled.div`
  display: flex;
  padding-top: 3rem;
  width: 100%;
  margin-right: 1rem;
`;

const StyledRoundInput = styled.input<StyledNumberInputProps>`
  width: 3rem;
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

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 20rem;
  justify-content: space-evenly;
  align-items: end;
`;

export default LobbyMasterPanel;
