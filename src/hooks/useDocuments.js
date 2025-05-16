import { useState, useEffect } from 'react'
import { listDocuments } from '../service/FileService.js'
import { toast } from 'sonner';

export default function useDocuments(selectedCollection) {
    const [documents, setDocuments] = useState([])

    useEffect(() => {
        if (!selectedCollection) return
        listDocuments(selectedCollection)
            .then(raw => {
                const docsArray = Array.isArray(raw)
                    ? raw
                    : Array.isArray(raw.documents)
                        ? raw.documents
                        : []
                const normalized = docsArray.map(doc => ({
                    id: doc.id || doc._id,
                    name: doc.name || doc.filename || 'Sem nome',
                    size: typeof doc.size === 'number'
                        ? doc.size
                        : typeof doc.sizeBytes === 'number'
                            ? doc.sizeBytes
                            : 0
                }))
                setDocuments(normalized)
            })
            .catch(err => {
                toast.error('Error while fetching documents: ' + err.message)
            })
    }, [selectedCollection])

    return documents
}