import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import Button from "../../../components/Button";
import { mobile } from "../../../Global";

export default (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        <TextWrapper>
          <Title>Spellcaster</Title>
          <Subtitle>
            spelling application that combines the act of learning English with
            the excitement and&nbsp;engagement of playing&nbsp;a game
          </Subtitle>
        </TextWrapper>
        <ButtonContainer>
          <ButtonWrapper onClick={() => navigate("/register")}>
            <Button secondary>Register</Button>
          </ButtonWrapper>
          <ButtonWrapper onClick={() => navigate("/login")}>
            <Button>Login</Button>
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

  ${mobile(css`
    font-size: 0.75em;
  `)}
`;

const Wrapper = styled.div`
  width: 35.5rem;
  height: fit-content;

  ${mobile(css`
    width: 75%;
  `)}
`;

const ButtonWrapper = styled.div`
  width: 11rem;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 2rem;
`;

const Title = styled.h1`
  font-size: 4em;
  margin-top: 0;
  margin-bottom: 1rem;
  padding: 0;
`;

const Subtitle = styled.h3`
  font-size: 1.5em;
  margin: 0 0 1rem 0;
  font-weight: 550;
  text-align: center;
  text-align: left;
  ${mobile(css`
    font-size: 1em;
    margin: 1.5em 0 1.5rem 0;
  `)}
`;
