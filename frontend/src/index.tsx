import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import {createRoot} from 'react-dom/client'
import App from './App';
import './style/Global.css';

const root = document.getElementById('root');
if (!root) {
    throw Error("Root not found")
}
createRoot(root).render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

