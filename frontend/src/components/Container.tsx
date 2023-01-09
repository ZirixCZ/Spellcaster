import * as React from "react";
import styled, {css} from "styled-components/macro";
import {tablet} from "../Global";

interface Props {
    children?: React.ReactNode,
    height?: number,
    heightKeyword?: string,
    justifyContent?: string,
    justifyContentTablet?: string,
}

const Container = (props: Props) => {

    return (
        <StyledContainer {...props}>{props.children}</StyledContainer>
    )

}

interface Props {
    height?: number,
    heightKeyword?: string,
    justifyContent?: string,
    justifyContentTablet?: string,
}

export const StyledContainer = styled.div<Props>`
  display: flex;
  flex-direction: column;
  justify-content: ${({justifyContent}) => justifyContent !== undefined ? justifyContent : null};
  align-items: center;
  text-align: left;
  height: ${({height}) => height + "%"};
  height: ${({height, heightKeyword}) => height !== undefined ? null : heightKeyword};
  width: 100%;
  ${({justifyContentTablet}) => tablet(css`
    justify-content: ${justifyContentTablet !== undefined ? justifyContentTablet : null};
  `)}

`

export default Container;
