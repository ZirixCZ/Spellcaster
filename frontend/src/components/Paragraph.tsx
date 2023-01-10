import * as React from "react";
import styled from "styled-components/macro";

interface ParagraphProps {
    children?: React.ReactNode,
    size?: number,
    weight?: number,
    color?: string,
    decoration?: string,
}

const Paragraph = (props: ParagraphProps): JSX.Element => {

    return (
        <StyledParagraph {...props}>{props.children}</StyledParagraph>
    )

}

interface StyledParagraphProps {
    size?: number,
    weight?: number,
    color?: string,
    decoration?: string,
}

export const StyledParagraph = styled.p<StyledParagraphProps>`
  font-size: ${({size}) => (size ? size + "rem" : "1rem")};
  font-weight: ${({weight}) => (weight ? weight : 500)};
  color: ${({color}) => (color ? color : "black")};
`

export default  Paragraph
