import * as React from "react";
import {ThemeProvider} from "styled-components/macro";
import {whiteTheme, darkTheme} from "../Global";

interface ThemeProps {
    children?: React.ReactNode,
}

const Theme = (props: ThemeProps) => (
    <ThemeProvider theme={whiteTheme}>{props.children}</ThemeProvider>
)

export default Theme;
