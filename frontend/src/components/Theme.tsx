import * as React from "react";
import {ThemeProvider} from "styled-components/macro";
import {darkTheme, lightTheme} from "../Global";
import {useThemeStore} from "../store/themeStore";
import {useEffect} from "react";

interface ThemeProps {
    children?: React.ReactNode,
}

const Theme = (props: ThemeProps) => {

    const theme = useThemeStore(state => state.theme);

    return (
        <ThemeProvider theme={theme ? lightTheme : darkTheme}>{props.children}</ThemeProvider>
    )

}

export default Theme;
