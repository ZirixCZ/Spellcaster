import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import styled from "styled-components/macro";
import Layout from "./pages/@Layout";
import Leaderboard from "./pages/leaderboard";
import Lobbies from "./pages/lobbies";
import Admin from "./pages/admin";
import Dashboard from "./pages/dashboard";
import Theme from "./components/Theme";
import ThemeSwitcher from "./pages/theme";
import Game from "./pages/game";

const App = (): JSX.Element => {
  return (
    <Theme>
      <Body>
        <Container>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/lobbies" element={<Lobbies />} />
              <Route path="/lobbies/:name" element={<Game />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/theme" element={<ThemeSwitcher />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </Body>
    </Theme>
  );
};

const Body = styled.body`
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.text};
`;

export const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

export default App;
