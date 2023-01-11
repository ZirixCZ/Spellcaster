import * as React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import styled from "styled-components/macro";
import Layout from "./pages/@Layout";
import Leaderboard from "./pages/leaderboard";
import Lobbies from "./pages/lobbies";
import Admin from "./pages/admin";
import Dashboard from "./pages/dashboard";
import Theme from "./components/Theme";

const App = (): JSX.Element => {

    return (
        <Theme>
        <Container>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route path="/" element={<Navigate to="/dashboard"/>}/>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="leaderboard" element={<Leaderboard/>}/>
                        <Route path="lobbies" element={<Lobbies/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                        <Route path="admin/*" element={<Admin/>}/>
                        <Route path="*" element={<Navigate to="/"/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Container>
        </Theme>
    );

}

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${({theme}) => theme.white};
  color: ${({theme}) => theme.text};
`

export default App;
