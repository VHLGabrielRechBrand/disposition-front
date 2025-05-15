import React from 'react';
import { authenticateWithGoogle } from '../../service/AuthService.js';

export default function GoogleLoginButton({ onSuccess }) {
    const handleLogin = (response) => {
        const token = response.credential;
        authenticateWithGoogle(token)
            .then(data => {
                console.log('Authenticated user:', data.user);
                onSuccess(data.user);
            })
            .catch(err => {
                console.error('Authentication failed:', err);
            });
    };

    React.useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleLogin,
        });

        google.accounts.id.renderButton(
            document.getElementById("google-signin"),
            { theme: "outline", size: "large" }
        );

        google.accounts.id.prompt();
    }, []);

    return <div id="google-signin"></div>;
}