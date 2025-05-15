import React, { useState, useEffect } from 'react'
import {FaSearch, FaUpload, FaCog, FaBook} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import './Hotbar.css'

export default function Hotbar() {
    const [open, setOpen] = useState(false)
    const [showOverlay, setShowOverlay] = useState(false)
    const [fadeOut, setFadeOut] = useState(false)
    const navigate = useNavigate()

    const closeHotbar = () => setOpen(false)

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeHotbar()
        }

        if (open) {
            window.addEventListener('keydown', handleKeyDown)
        } else {
            window.removeEventListener('keydown', handleKeyDown)
        }

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [open])

    useEffect(() => {
        if (open) {
            setShowOverlay(true)
            setFadeOut(false)
        } else if (showOverlay) {
            setFadeOut(true)
            const timeout = setTimeout(() => setShowOverlay(false), 300)
            return () => clearTimeout(timeout)
        }
    }, [open])

    return (
        <>
            {showOverlay && (
                <div
                    className={`hotbar-overlay ${fadeOut ? 'hide' : ''}`}
                    onClick={closeHotbar}
                />
            )}

            <div className={`hotbar ${open ? 'open' : ''}`}>
                <button className="hotbar-toggle" onClick={() => setOpen(prev => !prev)}>
                    <FaCog />
                </button>
                <div className={`hotbar-actions ${open ? 'open' : ''}`}>
                    <div className="action" onClick={() => { navigate('/settings'); closeHotbar(); }}><FaCog /></div>
                    <div className="action" onClick={() => { navigate('/search'); closeHotbar(); }}><FaBook /></div>
                    <div className="action" onClick={() => { navigate('/scan'); closeHotbar(); }}><FaUpload /></div>
                </div>
            </div>
        </>
    )
}