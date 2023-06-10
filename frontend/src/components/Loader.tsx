import * as React from "react";
import styled from "styled-components";

import { useSymbolStore } from "../store/symbolStore";
import Symbol from "./Symbol";

const Loader = () => {
  const symbol = useSymbolStore((state) => state.symbol);
  const changeSymbol = useSymbolStore((state) => state.changeSymbol);

  return (
    <Container>
      <StyledLoader>
        <StyledSymbol src={symbol} role="none" />
      </StyledLoader>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(6px);
`;

const StyledSymbol = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledLoader = styled.div`
  width: 10rem;
  height: 10rem;
  animation: spin 0.75s linear infinite;
  -webkit-transform-origin: 50% 50%;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
