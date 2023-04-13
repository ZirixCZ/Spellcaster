import * as React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Register from "./pages/unprotected/register";
import Login from "./pages/unprotected/login";
import styled, { css } from "styled-components/macro";
import Leaderboard from "./pages/leaderboard";
import Lobbies from "./pages/lobbies";
import Admin from "./pages/admin";
import Dashboard from "./pages/dashboard";
import Theme from "./components/Theme";
import ThemeSwitcher from "./pages/theme";
import Lobby from "./pages/lobby";
import Auth from "./pages/Auth";
import Welcome from "./pages/unprotected/welcome/Welcome";
import { tablet } from "./Global";
import Symbol from "./components/Symbol";

const App = (): JSX.Element => {
  return (
    <Theme>
      <Container>
        <Symbol />
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="lobbies" element={<Lobbies />} />
            <Route path="lobbies/:name" element={<Lobby />} />
            <Route path="theme" element={<ThemeSwitcher />} />
            <Route path="admin/*" element={<Admin />} />
          </Route>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Theme>
  );
};

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.text};
`;

export default App;
