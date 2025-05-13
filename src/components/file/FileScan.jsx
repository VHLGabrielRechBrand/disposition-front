import React, { useState } from 'react'
import { scanFile } from '../../service/FileService.js'
import './FileScan.css'

export default function FileScan() {
    const [file, setFile] = useState(null)
    const [scanResult, setScanResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
        setScanResult(null)
        setError('')
    }

    const handleScan = async () => {
        if (!file) return
        setLoading(true)
        try {
            const result = await scanFile(file)
            setScanResult(result)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="file-scan">
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleScan} disabled={!file || loading}>
                {loading ? 'Scanning...' : 'Scan File'}
            </button>

            {error && <p className="error">Error: {error}</p>}
            {scanResult && (
                <div className="scan-result">
                    <h2>Scan Result:</h2>
                    <pre>{JSON.stringify(scanResult, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}