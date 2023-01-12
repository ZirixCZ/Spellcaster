import * as React from "react";
import {Outlet} from "react-router-dom";
import Button from "../components/Button";


const Layout = (): JSX.Element => {

    return (
        <Outlet/>
    )

}

export default Layout;
