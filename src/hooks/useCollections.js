import { useState, useEffect } from 'react'
import { listCollections } from '../service/FileService.js'
import { toast } from 'sonner'

export default function useCollections() {
    const [collections, setCollections] = useState([])
    const [selectedCollection, setSelectedCollection] = useState('')

    useEffect(() => {
        listCollections()
            .then(data => {
                const collArray = Array.isArray(data)
                    ? data
                    : Array.isArray(data.collections)
                        ? data.collections
                        : []
                setCollections(collArray)
                if (collArray.length > 0) setSelectedCollection(collArray[0])
            })
            .catch(err => {
                toast.error('Error while fetching collections: ' + err.message)
            });
    }, [])

    return { collections, selectedCollection, setSelectedCollection }
}