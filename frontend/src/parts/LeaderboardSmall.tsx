import * as React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components/macro";
import {GContainerFullFitContent} from "../constants";
import Button from "../components/Button";

const LeaderboardSmall = () => {

    const navigate = useNavigate();

    const data = {
        user1: {
            username: "user1",
            score: "10",
            placement: "1"
        },
        user2: {
            username: "user2",
            score: "8",
            placement: "2"
        },
        user3: {
            username: "user3",
            score: "6",
            placement: "3"
        }
    }

    return (
        <GContainerFullFitContent>
            <LeaderboardButtonWrapper>
                <Leaderboard>
                    {Object.values(data).map(user => {
                        return (
                            <tr>
                                <td>{user.placement}</td>
                                <td>{user.username}</td>
                                <td>{user.score}</td>
                            </tr>
                        )
                    })}
                </Leaderboard>
                <ButtonWrapper onClick={() => {
                    navigate("/dashboard/leaderboard")
                }
                }>
                    <Button leaderboard small>Leaderboard</Button>
                </ButtonWrapper>
            </LeaderboardButtonWrapper>
        </GContainerFullFitContent>

    )
}

export const Leaderboard = styled.table`
      text-align: justify;
      width: 100%;
    `

export const LeaderboardButtonWrapper = styled.div`
      height: fit-content;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
    `

export const ButtonWrapper = styled.div`
      display: flex;
      padding-top: 3rem;
    `

export default LeaderboardSmall;
