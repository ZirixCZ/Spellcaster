import * as React from "react";
import { useLocation } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { tablet } from "../Global";
import { getSymbol } from "../utils/symbol";
import { AnimatePresence, motion } from "framer-motion";

const Symbol = () => {
  const location = useLocation();
  const [symbol, setSymbol] = React.useState("");

  React.useEffect(() => {
    setSymbol(getSymbol());
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
  z-index: 0;
  pointer-events: none;
  max-width: 100%;
  max-height: 100%;
  ${tablet(css`
    display: none;
  `)}
`;

const StyledSymbol = styled.img`
  height: 60em;
  max-height: 100vh;
`;

export default Symbol;
