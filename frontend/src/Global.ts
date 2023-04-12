import { css } from "styled-components/macro";
import "./style/Global.css";

const size = {
  mobile: "768px",
  tablet: "1366px",
  laptop: "1800px",
  desktop: "4560px",
};

export const lightTheme = {
  isLight: true,
  primary: "#333333",
  secondary: "#03CE60",
  red: "#F95738",
  gray: "#333333",
  buttonHover: "#1F191B",
  white: "#FFFFF0",
  whiteTransparent: "rgba(255, 255, 240, 0.6)",
  text: "#333333",
};

export const darkTheme = {
  isLight: false,
  primary: "#333333",
  secondary: "#03CE60",
  red: "#F95738",
  gray: "#333333",
  buttonHover: "#1F191B",
  white: "#FFFFF0",
  whiteTransparent: "rgba(255, 255, 240, 0.6)",
  text: "#333333",
};

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
