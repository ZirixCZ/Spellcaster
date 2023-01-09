import * as React from "react";
import {Routes, Route} from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";

const Admin = (): JSX.Element => {

    return (
        <Routes>
            <Route path="dashboard" element={<Dashboard/>}/>
        </Routes>

    )
}

export default Admin;
