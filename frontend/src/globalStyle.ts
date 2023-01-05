import styled from "styled-components";
import "./assets/css/index.css"

// TODO: naming scheme for global components

const bruh = "#735CDD";

export const GContainer = styled.div`
        height: 100vh;
        width: 100%;
    `

export const GFullCenterWrapper = styled.div`
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
      padding-top: 1.5rem;
      @media (min-width: 768px) {
        padding-top: 0;
      }
  `

export const GButton = styled.button`
        background: ${bruh};
        color: white;
        width: 100%;
        height: 3.5rem;
        font-weight: 600;
        border-radius: 3px;
        font-size: 1.25em;
    `
export const GContainerHalf = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: left;
      height: 50%;
      width: 100%;
  `

export const GContainer4rem = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: fit-content;
      width: 100%;
  `

export const GTitleLeft = styled.p`
    width: 100%;
    font-size: 0.75rem;
    font-weight: 600;
    text-align: left;
  `
