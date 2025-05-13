// File: App.jsx
import React, { useState, useEffect } from 'react'
import CompactFileGrid from './components/CompactFileGrid.jsx'
import { listCollections, listDocuments } from './service/FileService.js'

function App() {
    const [collections, setCollections] = useState([])
    const [selectedCollection, setSelectedCollection] = useState('')
    const [documents, setDocuments] = useState([])

    // Carrega a lista de collections ao montar
    useEffect(() => {
        listCollections()
            .then(cols => {
                const collArray = Array.isArray(cols)
                    ? cols
                    : Array.isArray(cols.collections)
                        ? cols.collections
                        : []
                setCollections(collArray)
                if (collArray.length > 0) {
                    setSelectedCollection(collArray[0])
                }
            })
            .catch(err => console.error('Erro ao listar collections:', err))
    }, [])

    // Quando a coleção selecionada muda, busca os documentos
    useEffect(() => {
        if (!selectedCollection) return
        listDocuments(selectedCollection)
            .then(rawDocs => {
                // Normalize os documentos para { name, size }
                const docsArray = Array.isArray(rawDocs)
                    ? rawDocs
                    : Array.isArray(rawDocs.documents)
                        ? rawDocs.documents
                        : []

                const normalized = docsArray.map(doc => ({
                    name: doc.name || doc.filename || 'Sem nome',
                    size: typeof doc.size === 'number'
                        ? doc.size
                        : typeof doc.sizeBytes === 'number'
                            ? doc.sizeBytes
                            : 0
                }))
                setDocuments(normalized)
            })
            .catch(err => console.error(`Erro ao listar documentos de ${selectedCollection}:`, err))
    }, [selectedCollection])

    const handleCollectionChange = (e) => {
        setSelectedCollection(e.target.value)
    }

    const handleRemove = (fileToRemove) => {
        setDocuments(prev => prev.filter(file => file !== fileToRemove))
    }

    return (
        <div className="app">
            <h1>Files</h1>
            <label htmlFor="collection-select">Selecione a coleção:</label>
            <select
                id="collection-select"
                value={selectedCollection}
                onChange={handleCollectionChange}
            >
                {collections.length > 0 ? (
                    collections.map(name => (
                        <option key={name} value={name}>{name}</option>
                    ))
                ) : (
                    <option disabled>Sem coleções disponíveis</option>
                )}
            </select>

            <CompactFileGrid
                documents={documents}
                onRemove={handleRemove}
            />
        </div>
    )
}

export default App
