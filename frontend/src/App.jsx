import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import styled from "styled-components";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {

    const Container = styled.div`
        height: 100vh;
        width: 100%;
    `

    return (
        <Container>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route exact path="/" element={<Dashboard/>}/>
                        <Route path="register" element={<Register/>}/>
                        <Route path="login" element={<Login/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Container>
    );

}

export default App;
