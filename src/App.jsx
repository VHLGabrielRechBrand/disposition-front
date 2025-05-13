import React from 'react'
import Hotbar from "./components/tools/Hotbar.jsx";
import AppRoutes from "./config/AppRoutes.jsx";
import {BrowserRouter as Router} from "react-router-dom";

function App() {
    return (
        <div className="app">
            <Router location={"/"}>
                <Hotbar />
                <AppRoutes />
            </Router>
        </div>
    )
}

export default App