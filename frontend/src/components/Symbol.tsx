import * as React from "react";
import { useLocation } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { tablet, mobile } from "../Global";
import { getSymbol } from "../utils/symbol";
import { useSymbolStore } from "../store/symbolStore";
import { AnimatePresence, motion } from "framer-motion";

const Symbol = () => {
  const symbol = useSymbolStore((state) => state.symbol);
  const changeSymbol = useSymbolStore((state) => state.changeSymbol);
  const location = useLocation();

  React.useEffect(() => {
    changeSymbol(location.pathname);
  }, [location.pathname]);

  return (
    <SymbolWrapper>
      <AnimatePresence>
        <motion.div
          key={location.pathname}
          transition={{ type: "spring", stiffness: 100, mass: 0.5 }}
          initial={{ x: -500, y: 500 }}
          animate={{ x: 0, y: 0 }}
        >
          <StyledSymbol src={symbol} alt="Image of a letter symbol" />
        </motion.div>
      </AnimatePresence>
    </SymbolWrapper>
  );
};

const SymbolWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  text-align: left;
  z-index: 0;
  pointer-events: none;
  height: 100%;
  width: calc(fit-content + 100%);
  overflow: hidden;
  ${tablet(css``)}

  ${({ theme }) => theme.isLight === false && css``}
`;

const StyledSymbol = styled.img`
  height: 100vh;
  width: 100%;
  filter: brightness(2);
  filter: saturate(80%);
  filter: contrast(80%);
  opacity: 1;

  ${mobile(css`
    width: 100vw;
  `)}
`;

export default Symbol;
