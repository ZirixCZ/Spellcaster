import styled, {css} from "styled-components/macro";
import "./style/Global.css"

const size = {
    mobile: "320px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "2560px",
}

export const purple = "#735CDD";
export const green = "#A1D938";
export const gray = "#1F191B";
export const red = "#F95738";
export const white = "#FCFCFC";

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
