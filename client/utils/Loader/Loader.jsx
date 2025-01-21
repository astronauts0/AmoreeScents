'use client'
import React from 'react'

const Loader = ({ height = "h-screen" }) => {
    return (
        <>
            <div className={`loader flex items-center justify-center ${height}`}>
                <div className="spinner"></div>
            </div>
        </>
    )
}

export default Loader