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
      <Container>
            <StyledParagraph {...props}>{props.children}</StyledParagraph>
      </Container>
    )

}

interface StyledParagraphProps {
    size?: number,
    weight?: number,
    color?: string,
    decoration?: string,
}

const Container = styled.div`
  width: 100%;
  text-align: start;
`

export const StyledParagraph = styled.p<StyledParagraphProps>`
  font-size: ${({size}) => (size ? size + "rem" : "1rem")};
  font-weight: ${({weight}) => (weight ? weight : 500)};
  text-decoration: underline;
  padding-bottom: 1.5em;
  font-weight: 700;

  * {
    color: ${({color, theme}) => (color ? color : theme.primary)};
  }
`

export default Paragraph
