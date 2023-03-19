import * as React from "react";
import {useLocation} from "react-router-dom";
import styled, {css} from "styled-components/macro";
import {tablet} from "../Global";
import {AnimatePresence, motion} from "framer-motion";

const Symbol = () => {
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
        <SymbolWrapper>
            <AnimatePresence>
                <motion.div
                    key={location.pathname}
                    transition={{type: "spring", stiffness: 100, mass: 0.5}}
                    initial={{x: -500, y: 500}}
                    animate={{x: 0, y: 0}}
                >
                    <StyledSymbol src={symbol} alt="Image of a letter symbol"/>
                </motion.div>
            </AnimatePresence>
        </SymbolWrapper>
    )
}

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

const StyledSymbol = styled.img`
  height: 60em;
  max-height: 100vh;
`

export default Symbol