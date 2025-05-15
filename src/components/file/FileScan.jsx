import React, { useState } from 'react'
import { scanFile } from '../../service/FileService.js'
import './FileScan.css'

export default function FileScan() {
    const [file, setFile] = useState(null)
    const [prompt, setPrompt] = useState('')
    const [scanResult, setScanResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [dragActive, setDragActive] = useState(false)

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
        setScanResult(null)
        setError('')
    }

    const handlePromptChange = (e) => {
        setPrompt(e.target.value)
        setScanResult(null)
        setError('')
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0])
            setScanResult(null)
            setError('')
        }
    }

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleScan = async () => {
        if (!file) return
        setLoading(true)
        try {
            const result = await scanFile(file, prompt)
            setScanResult(result)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className={`file-scan ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            {dragActive && <div className="drag-overlay">📁 Drop file here to scan</div>}

            <input type="file" onChange={handleFileChange} />

            <textarea
                placeholder="Enter the prompt to guide the OCR/AI extraction..."
                value={prompt}
                onChange={handlePromptChange}
                rows={4}
                style={{ resize: 'vertical', marginTop: '8px', padding: '8px' }}
            />

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
