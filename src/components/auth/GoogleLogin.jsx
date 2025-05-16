import React from 'react';
import { authenticateWithGoogle } from '../../service/AuthService.js';
import { toast } from 'sonner';

export default function GoogleLoginButton({ onSuccess }) {
    const handleLogin = (response) => {
        const token = response.credential;
        authenticateWithGoogle(token)
            .then(data => {
                toast.success('Authentication successful');
                onSuccess(data.user);
            })
            .catch(err => {
                toast.error('Authentication failed: ' + err.message);
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