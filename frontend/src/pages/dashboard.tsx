import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {StyledInput} from "../components/Input";
import styled from "styled-components/macro";
import callApi from "../utils/callApi";
import LeaderboardSmall from "../views/LeaderboardSmall";
import Button from "../components/Button";
import Container from "../components/Container";

const Dashboard = (): JSX.Element => {

    const navigate = useNavigate();

    const [auth, setAuth] = useState(false);

    useEffect(() => {
        callApi("GET", "http://localhost:8080/api/home", null)
            .then((res) => {
                if (res.ok) {
                    setAuth(true)
                    return
                }
            })
    }, [])

    return (
        <Container height={100}>
            {auth
                ?
                <Container justifyContent="space-evenly" height={100} widthMobile={75} widthTablet={60} widthLaptop={45} widthDesktop={25}>
                    <StyledHeader>
                        <h1>Spellcaster</h1>
                    </StyledHeader>
                    <Container width={100}>
                        <LeaderboardSmall/>
                    </Container>
                    <Container width={100}>
                        <ButtonWrapper>
                            <CodeInput placeholder="Enter code..."></CodeInput>
                        </ButtonWrapper>
                        <ButtonWrapper>
                            <Button primary medium>Search For Game</Button>
                        </ButtonWrapper>
                    </Container>
                </Container>
                : <p>You weren't authorized</p>
            }
        </Container>
    )

}

export const StyledHeader = styled.div`
  padding-top: 2rem;
  @media (min-width: 768px) {
    padding-top: 0;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
  margin-top: 1rem;
  width: 100%;
`

export const CodeInput = styled(StyledInput)`
  background-color: #1F191B;
  color: white;
  text-align: center;
  font-size: 1.25em;
  font-weight: 600;
  height: 3.5rem;
`

export default Dashboard;
