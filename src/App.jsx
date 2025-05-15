import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth.jsx";
import AppRoutes from "./config/AppRoutes.jsx";

function App() {
    return (
        <div className="app">
            <Router>
                <AuthProvider>
                    <div className="content-wrapper">
                        <AppRoutes />
                    </div>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;