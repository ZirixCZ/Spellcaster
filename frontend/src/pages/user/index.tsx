import * as React from "react";
import {Routes, Route} from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Leaderboard from "./Leaderboard/Leaderboard";

const User = () => {
    return (
        <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/leaderboard" element={<Leaderboard/>}/>
        </Routes>

    )
}

export default User;
