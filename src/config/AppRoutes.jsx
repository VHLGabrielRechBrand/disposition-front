import { Routes, Route } from 'react-router-dom'
import FileSearch from "../components/file/FileSearch.jsx";
import FileScan from "../components/file/FileScan.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/search" element={<FileSearch />} />
            <Route path="/scan" element={<FileScan />} />
        </Routes>
    )
}
