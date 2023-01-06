import * as React from "react";
import {Routes, Route} from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";

const Admin = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
        </Routes>

    )
}

export default Admin;
