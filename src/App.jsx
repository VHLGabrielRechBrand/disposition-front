import React from 'react'
import Hotbar from "./components/tools/Hotbar.jsx";
import AppRoutes from "./config/AppRoutes.jsx";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
    return (
        <div className="app">
            <Router>
                <div className="content-wrapper">
                    <Hotbar />
                    <div className="route-container">
                        <AppRoutes />
                    </div>
                </div>
            </Router>
        </div>
    );
}

export default App;