import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import Button from "../../../components/Button";

export default (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        <TextWrapper>
          <Title>Spellcaster</Title>
          <Subtitle>
            spelling application that combines the act
            <br />
            of learning English
          </Subtitle>
          <Subtitle>
            with the excitement and engagement of
            <br />
            playing a game
          </Subtitle>
        </TextWrapper>
        <ButtonContainer>
          <ButtonWrapper onClick={() => navigate("/login")}>
            <Button>Login</Button>
          </ButtonWrapper>
          <ButtonWrapper onClick={() => navigate("/register")}>
            <Button>Register</Button>
          </ButtonWrapper>
        </ButtonContainer>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: 0;
`;

const Wrapper = styled.div`
  width: 31.5rem;
  height: fit-content;
`;

const ButtonWrapper = styled.div`
  width: 11rem;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  text-align: left;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
`;
