import * as React from "react";
import styled, {css} from "styled-components/macro";
import {mobile, tablet, laptop, desktop} from "../Global";

interface Props {
    children?: React.ReactNode,
    height?: number,
    heightKeyword?: string,
    width?: number,
    widthMobile?: number,
    widthTablet?: number,
    widthLaptop?: number,
    widthDesktop?: number,
    widthKeyword?: string,
    justifyContent?: string,
    justifyContentTablet?: string,
    paddingTop?: number,
    paddingTopTablet?: number,
}

const Container = (props: Props) => {

    return (
        <StyledContainer {...props}>{props.children}</StyledContainer>
    )

}

interface Props {
    height?: number,
    heightKeyword?: string,
    width?: number,
    widthMobile?: number,
    widthTablet?: number,
    widthLaptop?: number,
    widthDesktop?: number,
    widthKeyword?: string,
    justifyContent?: string,
    justifyContentTablet?: string,
    paddingTop?: number,
    paddingTopTablet?: number,
}

export const StyledContainer = styled.div<Props>`
  display: flex;
  flex-direction: column;
  justify-content: ${({justifyContent}) => justifyContent !== undefined ? justifyContent : null};
  align-items: center;
  text-align: left;
  height: ${({height, heightKeyword}) => height ? height + "%" : heightKeyword ? heightKeyword : null};
  width: ${({width}) => width + "%"};
  padding-top: ${({paddingTop}) => paddingTop !== undefined ? paddingTop + "rem" : null};
  
  ${({widthDesktop}) => desktop(css`
    width: ${widthDesktop + "%"};
  `)}
  
  ${({widthLaptop}) => laptop(css`
    width: ${widthLaptop + "%"};
  `)}
  
  ${({widthTablet, justifyContentTablet, paddingTopTablet}) => tablet(css`
    justify-content: ${justifyContentTablet !== undefined ? justifyContentTablet : null};
    padding-top: ${paddingTopTablet !== undefined ? paddingTopTablet + "rem" : null};
    width: ${widthTablet + "%"};
  `)}
  
  ${({widthMobile}) => mobile(css`
    width: ${widthMobile + "%"};
  `)}
`

export default Container;
