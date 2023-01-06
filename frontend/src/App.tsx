import * as React from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Register from "./pages/authentication/Register/Register";
import Login from "./pages/authentication/Login/Login";
import styled from "styled-components/macro";
import Layout from "./pages/@Layout";
import User from "./pages/user";
import Admin from "./pages/admin";

const App = (): JSX.Element => {

    return (
        <Container>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
                        <Route path="dashboard/*" element={<User/>}/>
                        <Route path="admin/*" element={<Admin/>}/>
                        <Route path="register" element={<Register/>}/>
                        <Route path="login" element={<Login/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Container>
    );

}

export const Container = styled.div`
        height: 100vh;
        width: 100%;
    `

export default App;
