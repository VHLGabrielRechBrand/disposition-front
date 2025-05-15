import React from 'react';
import './CompactFile.css';
import { FaArrowPointer, FaX, FaTag } from 'react-icons/fa6';

function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default function CompactFile({ file, onAccess, onRemove, onTag }) {
    return (
        <div className="compact-file__container">
            <div className="compact-file__info">
                <span className="compact-file__name">{file.name}</span>
                <span className="compact-file__size">{formatBytes(file.size)}</span>
            </div>
            <div className="buttons">
                {onTag && (
                    <button type="button" onClick={() => onTag(file)} title="Tag File">
                        <FaTag />
                    </button>
                )}
                {onAccess && (
                    <button type="button" onClick={() => onAccess(file)} title="Open">
                        <FaArrowPointer />
                    </button>
                )}
                {onRemove && (
                    <button type="button" onClick={() => onRemove(file)} title="Remove">
                        <FaX />
                    </button>
                )}
            </div>
        </div>
    );
}