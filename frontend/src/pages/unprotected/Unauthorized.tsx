import * as React from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import callApi from "../../utils/callApi";
import Navbar from "../../views/Navbar";
import Loader from "../../components/Loader";
import { tablet, mobile } from "../../Global";

const Unauthorized = () => {
  return (
    <Container>
      <SafeArea>
        <Outlet />
      </SafeArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: 100%;
  height: 100%;
`;

const SafeArea = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 4rem;
`;

export default Unauthorized;
