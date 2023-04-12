import * as React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import callApi from "../../utils/callApi";
import Navbar from "../../views/Navbar";

export default () => {
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState(false);

  React.useEffect(() => {
    callApi("GET", "/api/home", null).then((res) => {
      if (res.ok) {
        setAuth(true);
        return;
      }
      setTimeout(() => {
        navigate("/welcome");
      }, 2000);
    });
  }, []);

  return (
    <Container>
      {auth ? (
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        <Loader />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Loader = styled.div`
  border: 16px solid #333333;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 3em;
  height: 3em;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
