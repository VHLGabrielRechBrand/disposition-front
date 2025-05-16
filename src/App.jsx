import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth.jsx";
import AppRoutes from "./config/AppRoutes.jsx";
import { Toaster } from 'sonner';

function App() {
    return (
        <div className="app">
            <Router>
                <AuthProvider>
                    <div className="content-wrapper">
                        <AppRoutes />
                        <Toaster richColors position="top-right" /> {}
                    </div>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;