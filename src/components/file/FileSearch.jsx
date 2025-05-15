import './FileSearch.css'
import React, { useEffect, useState } from 'react'
import CompactFileGrid from './CompactFileGrid.jsx'
import useCollections from '../../hooks/useCollections.js'
import useDocuments from '../../hooks/useDocuments.js'
import { deleteDocument } from '../../service/FileService.js'
import { formatCollectionName } from '../../utils/utils.js'
import FileDetails from "./FileDetails.jsx";

export default function FileSearch() {
    const { collections, selectedCollection, setSelectedCollection } = useCollections()
    const docs = useDocuments(selectedCollection)
    const [documents, setDocuments] = useState([])
    const [selectedFile, setSelectedFile] = useState(null)

    useEffect(() => {
        setDocuments(docs)
    }, [docs])

    useEffect(() => {
        setSelectedFile(null);
    }, [selectedCollection]);


    const handleClick = (file) => {
        setSelectedFile(file)
    }

    const handleRemove = (fileToRemove) => {
        const updatedDocuments = documents.filter(doc => doc.id !== fileToRemove.id)
        setDocuments(updatedDocuments)

        deleteDocument(selectedCollection, fileToRemove.id)
            .then(() => {
                console.log(`File ${fileToRemove.name} removed successfully`)
            })
            .catch(err => {
                console.error(`Error removing file ${fileToRemove.name}:`, err)
            })
    }

    return (
        <div className="file-search">
            <h1>Search</h1>
            <select
                id="collection-select"
                value={selectedCollection}
                onChange={e => setSelectedCollection(e.target.value)}>
                {collections.length > 0 ? (
                    collections.map(name => (
                        <option key={name} value={name}>
                            {formatCollectionName(name)} {}
                        </option>
                    ))
                ) : (
                    <option disabled>No collections available</option>
                )}
            </select>

            {selectedFile ? (
                <FileDetails collection={selectedCollection} id={selectedFile.id} />
            ) : (
                <CompactFileGrid
                    documents={documents}
                    onAccess={handleClick}
                    onRemove={handleRemove}
                />
            )}
        </div>
    )
}
