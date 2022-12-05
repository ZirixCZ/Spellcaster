import * as React from "react";
import {createRoot} from 'react-dom/client'
import App from './App';
import './assets/css/index.css';

const root = document.getElementById('root');
if (!root) {
    throw Error("Root not found")
}
createRoot(root).render(
    <App/>
);

