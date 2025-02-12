"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HomeProductsTheme = () => {
  useGSAP(() => {
    const homeProductsCtx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".home_products",
          start: "top bottom",
          onEnter: () => document.body.setAttribute("theme", "cyan"),
          onEnterBack: () => document.body.setAttribute("theme", "cyan"),
        },
      });
    });

    return () => {
      homeProductsCtx.revert();
    };
  }, []);
  return;
};

export default HomeProductsTheme;
