import * as React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components/macro";
import Button from "../components/Button";
import Container from "../components/Container";

const LeaderboardSmall = (): JSX.Element => {

    const navigate = useNavigate();

    const data = {
        user1: {
            placement: "1",
            username: "user1",
            score: "10",
        },
        user2: {
            placement: "2",
            username: "user2",
            score: "8",
        },
        user3: {
            placement: "3",
            username: "me",
            score: "6",
        },
        user4: {
            placement: "4",
            username: "user4",
            score: "6",
        },
        user5: {
            placement: "5",
            username: "user5",
            score: "6",
        }
    }

    return (
        <Container width={100}>
            <LeaderboardButtonWrapper>
                <Leaderboard>
                    {Object.values(data).map(user => {
                        return (
                            <StyledTableRow>
                                <TableData {...user}/>
                            </StyledTableRow>
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
    let c: number = -1

    return (
        <>
            {Object.values(props).map(prop => {
                c++
                return (
                    <StyledTableData isStrong={isStrong} textAlign={c === 0 ? "left" : c === 1 ? "center" : c === 2 ? "right" : "justify"}>{prop}</StyledTableData>
                    )
            })}
        </>
    )

}

interface StyledTableDataProps {
    isStrong?: boolean,
    textAlign?: string,
}

export const StyledTableData = styled.td<StyledTableDataProps>`
    font-weight: ${({isStrong}) => (isStrong ? "700" : "500")};
    width: 100%;
    text-align: ${({textAlign}) => (textAlign)};
`

export const StyledTableRow = styled.tr`
  display: flex;
  justify-content: space-around;
  text-align: left;
`

export const Leaderboard = styled.table`
      width: 50%;
    `

export const LeaderboardButtonWrapper = styled.div`
      height: fit-content;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
  width: 100%;
    `

export const ButtonWrapper = styled.div`
      display: flex;
      padding-top: 3rem;
      width: 50%;
    `

export default LeaderboardSmall;
