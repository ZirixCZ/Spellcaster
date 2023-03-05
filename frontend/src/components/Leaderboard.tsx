import * as React from "react";
import styled from "styled-components/macro";

interface LeaderboardProps {
    username?: string,
    placement?: string,
    score?: string,
}

const Leaderboard = (props: LeaderboardProps): JSX.Element => {
    return (
        <StyledLeaderboard>
            <StyledTableRow>
                <TableData {...props}/>
            </StyledTableRow>
        </StyledLeaderboard>
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
                    <StyledTableData isStrong={isStrong}
                                     textAlign={c === 0 ? "left" : c === 1 ? "left" : c === 2 ? "right" : "justify"}>{prop}</StyledTableData>
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

export const StyledLeaderboard = styled.table`
  width: 50%;
`

export default Leaderboard;
