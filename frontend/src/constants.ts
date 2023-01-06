import styled from "styled-components/macro";
import "./style/Global.css"

export const darkPurple = "#735CDD";
export const lightGreen = "#A1D938";
export const darkGray = "#1F191B";

export const GContainerFull = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  height: 100%;
  width: 100%;
`

export const GContainerFullFitContent = styled(GContainerFull)`
  height: fit-content;
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
