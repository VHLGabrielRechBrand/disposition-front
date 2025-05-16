import React, { useEffect, useState } from "react";
import { getDocumentById } from "../../service/FileService";
import "./FileDetails.css";

export default function FileDetails({ collection, id }) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getDocumentById(collection, id)
            .then(setFile)
            .catch((err) => setError(err.message));
    }, [collection, id]);

    const renderField = (key, value) => {
        if (Array.isArray(value)) {
            return (
                <div key={key} className="info-block">
                    <div className="field-label">{key}:</div>
                    <ul className="field-value">
                        {value.map((item, index) => (
                            <li key={index}>
                                {typeof item === 'object' ? JSON.stringify(item, null, 2) : item}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else if (typeof value === 'object' && value !== null) {
            return (
                <div key={key} className="info-block nested-object">
                    <div className="field-label">{key}:</div>
                    <div className="field-value" style={{ paddingLeft: 16 }}>
                        {Object.entries(value).map(([subKey, subValue]) =>
                            renderField(subKey, subValue)
                        )}
                    </div>
                </div>
            );
        }
        return (
            <div key={key} className="info-block">
                <div className="field-label">{key}:</div>
                <div className="field-value">{value}</div>
            </div>
        );
    };

    if (error) {
        return <div className="text-red-600">Error: {error}</div>;
    }

    if (!file) {
        return <div className="text-gray-600">Loading...</div>;
    }

    const { fields, raw_text, filename, size, extension } = file;

    return (
        <div >
            <div className="info-block">
                <div className="section-title">File Info</div>
                <div><span className="field-label">Name:</span> <span className="field-value">{filename}</span></div>
                <div><span className="field-label">Size:</span> <span className="field-value">{size}</span></div>
                <div><span className="field-label">Extension:</span> <span className="field-value">{extension}</span></div>
                <div><span className="field-label">Scanned At:</span> <span className="field-value">{new Date(file.scanned_at).toLocaleString()}</span></div>
            </div>

            {file.tags && file.tags.length > 0 && (
                <div className="info-block">
                    <div className="section-title">Tags</div>

                    {file.tags.map((tag, idx) => (
                        <li key={idx} className="tag-item">
                            {tag}
                        </li>
                    ))}
                </div>
            )}

            <div className="info-block">
                <div className="section-title">Extracted Fields</div>
                <div className="field-grid">
                    {Object.entries(fields).map(([key, value]) => renderField(key, value))}
                </div>
            </div>

            <div className="info-block">
                <div className="section-title">Raw Text</div>
                <div className="raw-text">{raw_text}</div>
            </div>
        </div>
    );
}
