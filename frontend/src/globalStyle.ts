import styled from "styled-components/macro";
import "./assets/css/index.css"

const darkPurple = "#735CDD";
const lightGreen = "#A1D938";
const darkGray = "#1F191B";

export const GContainerFull = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  height: 50%;
  width: 100%;
`

export const GContainerFullFitContent = styled(GContainerFull)`
      height: fit-content;
  `

export const GContainerHalf = styled(GContainerFull)`
      height: 50%;
  `

export const GWrapperFullCenter = styled.div`
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        @media (min-width: 768px) {
          justify-content: center;
        }
    `

export const GInput = styled.input`
        width: 100%;
        box-sizing: border-box;
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;
        padding-left: 1rem;
        font-size: 1rem;
        ::placeholder {
          font-weight: 300;
        }
    `

export const GHeaderContainer = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-top: 2rem;
      @media (min-width: 768px) {
        padding-top: 0;
      }
  `

export const GHeaderContainerSpaceEvenly = styled(GHeaderContainer)`
    justify-content: space-evenly;
  `

interface Props {
    primary?: boolean,
    leaderboard?: boolean
    small?: boolean
    medium?: boolean
    large?: boolean
}

export const GButton = styled.button<Props>`
        background: ${({primary, leaderboard}) => (primary ? darkPurple : leaderboard ? lightGreen : darkGray)};
        color: white;
        width: 100%;
        height: ${({small, medium, large}) => (small ? "2.5rem" : medium ? "3.5rem" : large ? "4.5rem" : "3.5rem")};
        font-weight: 600;
        border-radius: 3px;
        font-size: 1.25em;
    `
