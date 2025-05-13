import { useState, useEffect } from 'react'
import { listCollections } from '../service/FileService.js'

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
            .catch(err => console.error('Error listing collections:', err))
    }, [])

    return { collections, selectedCollection, setSelectedCollection }
}