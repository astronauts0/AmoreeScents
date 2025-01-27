"use client";
import React from "react";

const IconButton = ({ Icon, customize = "" }) => {
  const handleMouseMove = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty("--fill-x", `${x}px`);
    button.style.setProperty("--fill-y", `${y}px`);
  };

  return (
    <button
      className={`${customize} ButtonTextIcon outline-none border border_color`}
      onMouseMove={handleMouseMove}
    >
      <span>{Icon}</span>
    </button>
  );
};

export default IconButton;
