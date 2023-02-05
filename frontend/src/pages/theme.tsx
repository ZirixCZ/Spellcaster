import * as React from "react";
import {useEffect} from "react";
import styled from "styled-components/macro";
import {useNavigate} from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import {useThemeStore} from "../store/themeStore";
import {ButtonWrapper} from "./dashboard";

const ThemeSwitcher = (): JSX.Element => {

    const theme = useThemeStore(state => state.theme);
    const changeTheme = useThemeStore(state => state.changeTheme);

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("theme", theme ? "light" : "dark");
    }, [theme])

    return (
        <Container height={100}>
            <Container width={100} height={100} justifyContent="space-evenly">
                <Container widthMobile={75} widthTablet={60} widthLaptop={45} widthDesktop={25} justifyContent="center"
                           alignItems="center">
                    <StyledThemeSwitcher onClick={() => {
                        changeTheme(!theme)
                    }}><Button primary>{theme ? "light" : "dark"}</Button></StyledThemeSwitcher>
                </Container>
                <Container widthMobile={75} widthTablet={60} widthLaptop={45} widthDesktop={25}>
                    <ButtonWrapper onClick={() => {
                        navigate("/");
                    }}>
                        <Button>Dashboard</Button>
                    </ButtonWrapper>
                </Container>
            </Container>
        </Container>
    )

}

export const StyledThemeSwitcher = styled.div`
  width: fit-content;
  height: fit-content;
  width: 100%;
`

export default ThemeSwitcher;
