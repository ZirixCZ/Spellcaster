import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    GContainerFullFitContent,
    GWrapperFullCenter,
    GHeaderContainerSpaceEvenly
} from "../../../constants";
import {StyledInput} from "../../../components/Input";
import styled from "styled-components/macro";
import callApi from "../../../utils/callApi";
import LeaderboardSmall from "../../../parts/LeaderboardSmall";
import Button from "../../../components/Button";

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
        <GWrapperFullCenter>
            {auth
                ?
                <Container>
                    <GHeaderContainerSpaceEvenly>
                        <h1>Spellcaster</h1>
                    </GHeaderContainerSpaceEvenly>
                    <GContainerFullFitContent>
                        <LeaderboardSmall></LeaderboardSmall>
                    </GContainerFullFitContent>
                    <GContainerFullFitContent>
                        <ButtonWrapper>
                            <CodeInput placeholder="Enter code..."></CodeInput>
                        </ButtonWrapper>
                        <ButtonWrapper>
                            <Button primary medium>Search For Game</Button>
                        </ButtonWrapper>
                    </GContainerFullFitContent>
                </Container>
                : <p>You weren't authorized</p>
            }
        </GWrapperFullCenter>
    )

}

export const Container = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      width: 25%;
      height: 100%;
      @media (max-width: 1366px) {
        width: 35%;
      }
      @media (max-width: 1080px) {
        width: 50%;
      }
      @media (max-width: 768px) {
        width: 75%;
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
