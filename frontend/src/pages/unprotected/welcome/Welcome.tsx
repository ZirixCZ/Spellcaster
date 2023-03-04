import * as React from "react";
import {useNavigate} from "react-router-dom";
import styled, {css} from "styled-components/macro";
import Button from "../../../components/Button";
import {mobile} from "../../../Global";

export default (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Container>
            <Wrapper>
                <TextWrapper>
                    <Title>Spellcaster</Title>
                    <Subtitle>
                        spelling application that&nbsp;combines&nbsp;the&nbsp;act
                        <br/>
                        of&nbsp;learning&nbsp;English
                    </Subtitle>
                    <Subtitle>
                        with the excitement and&nbsp;engagement&nbsp;of
                        <br/>
                        playing&nbsp;a&nbsp;game
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
  
  ${mobile(css`
    font-size: 0.75em;
  `)}
`;

const Wrapper = styled.div`
  width: 31.5rem;
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
  align-items: flex-start;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  margin-top: 2rem;
`;

const Title = styled.h1`
  font-size: 4em;
  text-align: left;
  margin-top: 0;
  margin-bottom: 1rem;
  padding: 0;
`;

const Subtitle = styled.h3`
  font-size: 1.5em;
  margin: 0 0 1rem 0;
`;
