"use client";
import React, { useEffect, useRef } from "react";

const ClickSound = () => {
  const clickSoundRef = useRef(null);

  useEffect(() => {
    let lastPlayed = 0;
    const handleSound = () => {
      const now = Date.now();
      if (
        clickSoundRef.current &&
        clickSoundRef.current.paused &&
        now - lastPlayed > 2000
      ) {
        clickSoundRef.current.muted = false;
        clickSoundRef.current.play();
        lastPlayed = now;
      }
    };

    window.addEventListener("click", handleSound);

    return () => {
      window.removeEventListener("click", handleSound);
    };
  }, []);

  return (
    <audio
      ref={clickSoundRef}
      hidden
      src="/sounds/modern_click_sound.wav"
      muted
    ></audio>
  );
};

export default ClickSound;
