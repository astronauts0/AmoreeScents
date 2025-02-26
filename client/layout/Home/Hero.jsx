"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroVideo from "@/components/hero/HeroVideo";
import HeroOverlay from "@/components/hero/HeroOverlay";
import { SplitText } from "@/utils/functions/SplitText";

const Hero = () => {
  const headerRef = useRef(null);

  useGSAP(() => {
    const heroCtx = gsap.context(() => {
      const dedicateText = SplitText(".hero_overlay_title", { type: "words" });

      gsap.set(".hero_rows", { scale: 20 });

      gsap
        .timeline({
          ease: "power2",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top top",
            end: "75%",
            scrub: 1,
            pin: true,
            onEnter: () => {
              document.body.setAttribute("theme", "black");
            },
            onEnterBack: () => {
              document.body.setAttribute("theme", "black");
            },
          },
        })
        .to(".vid_cont", { "--clip": "0%" }, "a")
        .to(".hero_rows", { scale: 1, translateY: "-33%" }, "a")
        .from(
          dedicateText.chars,
          { opacity: 0, stagger: 0.01, delay: 0.008 },
          "a"
        )
    }, headerRef);

    return () => {
      heroCtx.revert();
    };
  }, []);

  return (
    <section
      ref={headerRef}
      className="w-full h-screen relative overflow-hidden"
    >
      <HeroVideo />
      <HeroOverlay />
    </section>
  );
};

export default Hero;
