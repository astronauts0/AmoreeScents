"use client";
import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/dist/lenis-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import CustomEase from "gsap/CustomEase";

import "./lenis.css";

gsap.registerPlugin(
  ScrollTrigger,
  TextPlugin,
  MotionPathPlugin,
  ScrollToPlugin,
  CustomEase
);

const Lenis = ({ children }) => {
  const lenis = useLenis();

  useEffect(() => {
    lenis?.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis?.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis?.raf);
      lenis?.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);
  return (
    <ReactLenis
      root
      options={{
        // lerp: 0.0275,
        lerp: 0.01,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default Lenis;
