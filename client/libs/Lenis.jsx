"use client";
import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/dist/lenis-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { Flip, ToastContainer } from "react-toastify";

import "./lenis.css";
import "react-toastify/dist/ReactToastify.css";

gsap.registerPlugin(
  ScrollTrigger,
  TextPlugin,
  MotionPathPlugin,
  ScrollToPlugin
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
        lerp: 0.0275,
        smoothWheel: true,
        smooth: true,
        smoothTouch: false,
        syncTouch: true,
        syncTouchLerp: 0.04,
      }}
    >
      {children}
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
    </ReactLenis>
  );
};

export default Lenis;
