import * as React from "react";
import styled from "styled-components/macro";
import Theme from "./Theme";

interface ParagraphProps {
    children?: React.ReactNode,
    size?: number,
    weight?: number,
    color?: string,
    decoration?: string,
}

const Paragraph = (props: ParagraphProps): JSX.Element => {

    return (
        <Theme>
            <StyledParagraph {...props}>{props.children}</StyledParagraph>
        </Theme>
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

  * {
    color: ${({color, theme}) => (color ? color : theme.primary)};
  }
`

export default Paragraph
