import * as React from "react";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import Register from "./pages/unprotected/register";
import Login from "./pages/unprotected/login";
import styled, {css} from "styled-components/macro";
import Leaderboard from "./pages/leaderboard";
import Lobbies from "./pages/lobbies";
import Admin from "./pages/admin";
import Dashboard from "./pages/dashboard";
import Theme from "./components/Theme";
import ThemeSwitcher from "./pages/theme";
import Game from "./pages/game";
import Auth from "./pages/Auth";
import Welcome from "./pages/unprotected/welcome/Welcome";
import {tablet} from "./Global";

const App = (): JSX.Element => {
    const location = useLocation();
    const [symbol, setSymbol] = React.useState("")
    const getSymbol = () => {
        const symbols = [
            "/img/symbolA.svg",
            "/img/symbolB.svg",
            "/img/symbolC.svg",
            "/img/symbolD.svg",
            "/img/symbolE.svg",
            "/img/symbolF.svg",
            "/img/symbolG.svg",
            "/img/symbolH.svg",
            "/img/symbolI.svg",
            "/img/symbolJ.svg",
            "/img/symbolK.svg",
            "/img/symbolL.svg",
            "/img/symbolM.svg",
            "/img/symbolN.svg",
            "/img/symbolO.svg",
            "/img/symbolP.svg",
            "/img/symbolR.svg",
            "/img/symbolS.svg",
            "/img/symbolT.svg",
            "/img/symbolU.svg",
            "/img/symbolV.svg",
            "/img/symbolW.svg",
            "/img/symbolX.svg",
            "/img/symbolY.svg",
            "/img/symbolZ.svg",
        ]
        return symbols[Math.floor(Math.random() * symbols.length)]
    }

    React.useEffect(() => {
        setSymbol(getSymbol())
    }, [location.pathname])

    return (
        <Theme>
            <Container>
                <SymbolWrapper>
                    <AnimatePresence>
                        <motion.div
                            key={location.pathname}
                            transition={{type: "spring", stiffness: 100, mass: 0.5}}
                            initial={{x: -500, y: 500}}
                            animate={{x: 0, y: 0}}
                        >
                            <Symbol src={symbol} alt="Image of a letter symbol"/>
                        </motion.div>
                    </AnimatePresence>
                </SymbolWrapper>

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

const SymbolWrapper = styled.div`
  position: absolute;
  top: 0;
  z-index: 0;
  pointer-events: none;
  max-width: 100%;
  max-height: 100%;
  ${tablet(css`
    display: none;
  `)}

`

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${({theme}) => theme.white};
  color: ${({theme}) => theme.text};
`;

export const Symbol = styled.img`
  height: 60em;
  max-height: 100vh;
`
export default App;
