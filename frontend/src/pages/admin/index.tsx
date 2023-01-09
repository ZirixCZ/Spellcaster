import * as React from "react";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";

const Admin = (): JSX.Element => {

    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
        </Routes>

    )
}

export default Admin;
