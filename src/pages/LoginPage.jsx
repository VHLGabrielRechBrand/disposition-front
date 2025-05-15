// src/pages/LoginPage.jsx
import React from 'react';
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../hooks/useAuth.jsx';

export default function LoginPage() {
    const { login } = useAuth();

    const handleCredentialResponse = (response) => {
        const token = response.credential;
        const user = jwtDecode(token);
        login(user, token);
    };

    React.useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(
            document.getElementById("google-signin-button"),
            { theme: "outline", size: "large" }
        );
    }, []);

    return (
        <div className="login-page">
            <h2>Please log in to continue</h2>
            <div id="google-signin-button"></div>
        </div>
    );
}
