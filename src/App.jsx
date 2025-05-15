import React from 'react';
import Hotbar from "./components/tools/Hotbar.jsx";
import AppRoutes from "./config/AppRoutes.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth.jsx";

function App() {
    return (
        <div className="app">
            <Router>
                <AuthProvider>
                    <div className="content-wrapper">
                        <Hotbar />
                        <div className="route-container">
                            <AppRoutes />
                        </div>
                    </div>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;