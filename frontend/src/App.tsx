import * as React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
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
    return (
        <Theme>
            <Container>
                    <Routes>
                        <Route path="/" element={<Auth/>}>
                            <Route path="dashboard" element={<Dashboard/>}/>
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
`
export default App;
