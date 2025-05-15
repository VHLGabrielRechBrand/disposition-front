import React from 'react'
import CompactFile from './CompactFile.jsx'
import './CompactFileGrid.css'

export default function CompactFileGrid({ documents, onAccess, onRemove, onTag }) {
    return (
        <div className="compact-file-grid__container">
            {documents.map((document, index) => (
                <CompactFile
                    key={index}
                    file={document}
                    onAccess={onAccess}
                    onRemove={onRemove}
                    onTag={onTag}
                />
            ))}
        </div>
    )
}