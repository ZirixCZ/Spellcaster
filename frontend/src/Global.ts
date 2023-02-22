import {css} from "styled-components/macro";
import "./style/Global.css"

const size = {
    mobile: "768px",
    tablet: "1024px",
    laptop: "1366px",
    desktop: "2560px",
}

export const lightTheme = {
    isLight: true,
    primary: "#333333",
    secondary: "#A1D938",
    red: "#F95738",
    gray: "#333333",
    buttonHover: "#1F191B",
    white: "#FFFFF0",
    text: "#333333"
}

export const darkTheme = {
    isLight: false,
    primary: "#1F049AFF",
    secondary: "#5A7B00FF",
    red: "#b62509",
    gray: "#0d0a0b",
    buttonHover: "#0d0a0b",
    white: "#111323",
    text: "#FCFCFC"
}


export const mobile = (inner: any) => css`
  @media (max-width: ${size.mobile}) {
    ${inner};
  }
`;
export const tablet = (inner: any) => css`
  @media (max-width: ${size.tablet}) {
    ${inner};
  }
`;
export const desktop = (inner: any) => css`
  @media (max-width: ${size.desktop}) {
    ${inner};
  }
`;
export const laptop = (inner: any) => css`
  @media (max-width: ${size.laptop}) {
    ${inner};
  }
`;
