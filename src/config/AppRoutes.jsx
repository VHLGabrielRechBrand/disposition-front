import { Routes, Route, Navigate } from 'react-router-dom';
import FileSearch from "../components/file/FileSearch.jsx";
import FileScan from "../components/file/FileScan.jsx";
import Settings from "../components/settings/Settings.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import { useAuth } from "../hooks/useAuth.jsx";

export default function AppRoutes() {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route
                path="/login"
                element={
                    isAuthenticated ? (
                        <Navigate to="/search" replace />
                    ) : (
                        <LoginPage />
                    )
                }
            />

            {isAuthenticated ? (
                <>
                    <Route path="/search" element={<FileSearch />} />
                    <Route path="/scan" element={<FileScan />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<Navigate to="/search" replace />} />
                </>
            ) : (
                <Route path="*" element={<Navigate to="/login" replace />} />
            )}
        </Routes>
    );
}