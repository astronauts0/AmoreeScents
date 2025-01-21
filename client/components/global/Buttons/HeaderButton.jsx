'use client'
import React from 'react'

const HeaderButton = ({ Icon, customize }) => {

    const handleMouseMove = (e) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        button.style.setProperty("--fill-x", `${x}px`);
        button.style.setProperty("--fill-y", `${y}px`);
    };

    return (
        <>
            <button className={`animated__button border border_color ${customize}`} onMouseMove={handleMouseMove}>{Icon}</button>
        </>
    )
}

export default HeaderButton