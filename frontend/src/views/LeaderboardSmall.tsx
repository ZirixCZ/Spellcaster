import * as React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components/macro";
import Button from "../components/Button";
import Container from "../components/Container";

const LeaderboardSmall = (): JSX.Element => {

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
            username: "me",
            score: "6",
            placement: "3"
        },
        user4: {
            username: "user4",
            score: "6",
            placement: "4"
        },
        user5: {
            username: "user5",
            score: "6",
            placement: "5"
        }
    }

    return (
        <Container>
            <LeaderboardButtonWrapper>
                <Leaderboard>
                    {Object.values(data).map(user => {
                        return (
                            <tr>
                                <TableData {...user}/>
                            </tr>
                        )
                    })}
                </Leaderboard>
                <ButtonWrapper onClick={() => {
                    navigate("/leaderboard")
                }
                }>
                    <Button leaderboard small>Leaderboard</Button>
                </ButtonWrapper>
            </LeaderboardButtonWrapper>
        </Container>

    )

}

interface TableDataProps {
    username?: any | undefined,
    placement?: any | undefined,
    score?: any | undefined
}

export const TableData = (props: TableDataProps): JSX.Element => {

    let {username} = props

    // TODO: get the username from global state
    let myUsername = "me"

    let isStrong = myUsername === username

    return (
        <>
            {Object.values(props).map(prop => {
                return (
                    <StyledTableData isStrong={isStrong}>{prop}</StyledTableData>
                    )
            })}
        </>
    )

}

interface StyledTableDataProps {
    isStrong?: boolean,
}

export const StyledTableData = styled.td<StyledTableDataProps>`
    font-weight: ${({isStrong}) => (isStrong ? "700" : "500")};
`

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
