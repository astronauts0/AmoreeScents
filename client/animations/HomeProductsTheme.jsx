"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HomeProductsTheme = () => {
  useGSAP(() => {
    const homeProductsCtx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".home_products",
          start: "top bottom",
          onEnter: () => {
            document.body.classList.add("theme-transition"); // Temporary class add
            document.body.setAttribute("theme", "white");
          },
          onEnterBack: () => {
            document.body.classList.add("theme-transition"); // Temporary class add
            document.body.setAttribute("theme", "white");
          },
          onLeave: () => document.body.classList.remove("theme-transition"), // Remove class after transition
          onLeaveBack: () => document.body.classList.remove("theme-transition"), // Remove class after transition
        },
      });
    });

    ScrollTrigger.refresh();

    return () => homeProductsCtx.revert();
  }, []);

  return null;
};

export default HomeProductsTheme;
