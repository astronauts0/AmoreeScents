"use client";
import { isBrowser } from "@/config/Variables";
import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const ConfettiRain = ({ recycle = true, numberOfPieces = 500 }) => {
  const { width, height } = useWindowSize();
  const adjustedHeight = Math.max(
    height,
    isBrowser && document.body.scrollHeight
  );
  return (
    <Confetti
      width={width - 20}
      height={adjustedHeight}
      numberOfPieces={numberOfPieces}
      gravity={0.2}
      recycle={recycle}
    />
  );
};
export default ConfettiRain;
