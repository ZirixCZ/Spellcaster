import * as React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import {GContainer} from "./globalStyle";

const App = (): JSX.Element => {

    return (
        <GContainer>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="register" element={<Register/>}/>
                        <Route path="login" element={<Login/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </GContainer>
    );

}

export default App;
