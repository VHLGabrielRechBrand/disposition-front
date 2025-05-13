import React, { useState } from 'react'
import { FaSearch, FaUpload, FaCog, FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import './Hotbar.css'

export default function Hotbar() {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <div className={`hotbar ${open ? 'open' : ''}`}>
            <button className="hotbar-toggle" onClick={() => setOpen(prev => !prev)}>
                <FaCog />
            </button>
            <div className={`hotbar-actions ${open ? 'open' : ''}`}>
                <div className="action" onClick={() => navigate('/search')}><FaSearch /></div>
                <div className="action" onClick={() => navigate('/upload')}><FaUpload /></div>
            </div>
        </div>
    )
}
