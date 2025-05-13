import { Routes, Route } from 'react-router-dom'
import FileSearch from "../components/file/FileSearch.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/search" element={<FileSearch />} />
        </Routes>
    )
}
