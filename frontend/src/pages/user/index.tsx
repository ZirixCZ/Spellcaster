import * as React from "react";
import {Routes, Route} from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Leaderboard from "./Leaderboard/Leaderboard";
import Lobbies from "./Lobbies/Lobbies";

const User = (): JSX.Element => {

    return (
        <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/leaderboard" element={<Leaderboard/>}/>
                <Route path="/lobbies" element={<Lobbies/>}/>
        </Routes>

    )

}

export default User;
