import * as React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import callApi from "../../utils/callApi";
import Navbar from "../../views/Navbar";
import Loader from "../../components/Loader";

const Auth = () => {
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
      }, 1000);
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

export default Auth;
