import { css } from "styled-components/macro";
import "./style/Global.css";

export enum Role {
  WORDSPELLER = "WordSpeller",
  WORDMASTER = "WordMaster",
}

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
  whiteTransparent: "rgba(255, 255, 255, 0.3)",
  text: "#333333",
  yellow: "#FEE826",
  blue: "#26B0FE",
  silver: "#C0C0C0",
  bronze: "#CD7F32",
};

export const darkTheme = {
  isLight: false,
  primary: "rgb(167, 185, 242)",
  secondary: "rgb(115, 235, 125)",
  red: "#F95738",
  gray: "#FFFFFF",
  buttonHover: "#1F191B",
  white: "rgb(30, 30, 40)",
  whiteTransparent: "rgba(30, 30, 40, 0.5)",
  text: "#FFFFFF",
  yellow: "#FEE826",
  blue: "#7CD0FF",
  silver: "#C0C0C0",
  bronze: "#CD7F32",
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
