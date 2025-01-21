'use client'
import React from 'react'

const ButtonTextIcon = ({ Icon, Text = '', customize = '', btnType = 'button', disabled = false }) => {

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
            <button disabled={disabled} type={btnType} className={`${customize} ButtonTextIcon outline-none border border_color gap-1 `} onMouseMove={handleMouseMove}>
                <span>{Icon}</span>
                <span>{Text}</span>
            </button>
        </>
    )
}

export default ButtonTextIcon