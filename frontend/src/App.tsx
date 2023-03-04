import * as React from "react";
import {BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
import Register from "./pages/unprotected/register";
import Login from "./pages/unprotected/login";
import styled from "styled-components/macro";
import Leaderboard from "./pages/leaderboard";
import Lobbies from "./pages/lobbies";
import Admin from "./pages/admin";
import Dashboard from "./pages/dashboard";
import Theme from "./components/Theme";
import ThemeSwitcher from "./pages/theme";
import Game from "./pages/game";
import Auth from "./pages/Auth";
import Welcome from "./pages/unprotected/welcome/Welcome";

const App = (): JSX.Element => {
    const [symbol, setSymbol] = React.useState<string>();
    const location = useLocation();

    const getSymbol = () => {
        const symbols = [
            "/img/symbolA.svg",
            "/img/symbolS.svg",
            "/img/symbolY.svg"
        ]
        return symbols[Math.floor(Math.random() * symbols.length)]
    }

    const handleResize = () => {
        if (window.innerWidth < 800) {
            setSymbol("")
            return false
        }

        setSymbol(getSymbol())
        return true
    }

    React.useEffect(() => {
        setSymbol(handleResize() ? getSymbol() : "")
    }, [location.pathname])

    React.useEffect(() => {
            window.addEventListener("resize", handleResize)

            return () => window.removeEventListener("resize", handleResize)

        }, []
    )


    return (
        <Theme>
            <Container>
                <Symbol src={symbol} alt="Image of a letter symbol"/>
                <Routes>
                    <Route path="/" element={<Auth/>}>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="leaderboard" element={<Leaderboard/>}/>
                        <Route path="lobbies" element={<Lobbies/>}/>
                        <Route path="lobbies/:name" element={<Game/>}/>
                        <Route path="theme" element={<ThemeSwitcher/>}/>
                        <Route path="admin/*" element={<Admin/>}/>
                    </Route>
                    <Route path="/welcome" element={<Welcome/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </Container>
        </Theme>
    );
};

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${({theme}) => theme.white};
  color: ${({theme}) => theme.text};
`;

export const Symbol = styled.img`
  position: absolute;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`
export default App;
