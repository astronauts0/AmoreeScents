"use client";
import React from "react";

const SoftMusic = () => {
  return (
    <audio
      id="soft_bg_music"
      hidden
      src="/sounds/generic.ogg"
      muted
      loop
    ></audio>
  );
};
export default SoftMusic;