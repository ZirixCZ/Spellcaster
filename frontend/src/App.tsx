import * as React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminPage from "./pages/AdminPage/AdminPage";
import styled from "styled-components/macro";

const App = (): JSX.Element => {

    return (
        <Container>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/admin" element={<AdminPage/>}/>
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
