// components/FileSearch.jsx
import React, {useEffect, useState} from 'react'
import CompactFileGrid from './CompactFileGrid.jsx'
import useCollections from '../../hooks/useCollections.js'
import useDocuments from '../../hooks/useDocuments.js'
import {deleteDocument} from '../../service/FileService.js'

export default function FileSearch() {
    const { collections, selectedCollection, setSelectedCollection } = useCollections()
    const docs = useDocuments(selectedCollection)
    const [documents, setDocuments] = useState([])

    useEffect(() => {
        setDocuments(docs)
    }, [docs])

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
            <label htmlFor="collection-select">Select collection:</label>
            <select
                id="collection-select"
                value={selectedCollection}
                onChange={e => setSelectedCollection(e.target.value)}
            >
                {collections.length > 0 ? (
                    collections.map(name => (
                        <option key={name} value={name}>{name}</option>
                    ))
                ) : (
                    <option disabled>No collections available</option>
                )}
            </select>

            <CompactFileGrid
                documents={documents}
                onRemove={handleRemove}
            />
        </div>
    )
}