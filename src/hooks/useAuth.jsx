import { createContext, useContext, useState, useEffect } from "react";
import { authenticateWithGoogle } from "../service/AuthService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("google_token");
        if (token) {
            authenticateWithGoogle(token)
                .then(res => setUser(res.user))
                .catch(() => {
                    localStorage.removeItem("google_token");
                    setUser(null);
                });
        }
    }, []);

    const login = (userInfo, token) => {
        localStorage.setItem("google_token", token);
        authenticateWithGoogle(token)
            .then(res => setUser(res.user))
            .catch(console.error);
    };

    const logout = () => {
        localStorage.removeItem("google_token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
