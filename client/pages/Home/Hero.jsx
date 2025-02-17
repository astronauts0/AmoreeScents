"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroVideo from "@/components/hero/HeroVideo";
import HeroOverlay from "@/components/hero/HeroOverlay";
import SplitType from "split-type";
import { isMobile } from "@/config/Variables";

const Hero = () => {
  const headerRef = useRef(null);

  useGSAP(() => {
    const heroCtx = gsap.context(() => {
      const dedicateText = new SplitType(".hero_overlay_title", {
        type: "words",
      });

      gsap.set(".hero_rows", { scale: 20 });

      gsap
        .timeline({
          ease: "power2",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top top",
            end: "200%",
            scrub: 2,
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
          { opacity: 0, stagger: 0.017, delay: 0.03 },
          "a"
        )
        .to(
          ".hero_row_lft",
          {
            translateX: isMobile ? "40%" : "20%",
            duration: 1,
            ease: "power4",
            stagger: 0.03,
          },
          "b"
        )
        .to(
          ".hero_row_rgt",
          {
            translateX: isMobile ? "-100%" : "-40%",
            duration: 1,
            ease: "power4",
            stagger: 0.03,
          },
          "b"
        )
        .to(".hero_main_title", { opacity: 0 }, "b");
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
      <div className="absolute sm:bottom-10 bottom-7 satoshi_medium z-30 left-10 hero_main_title">
        We create timeless fragrances. <br /> Perfumes. Scents. Memories. <br />{" "}
        For real people, real <br /> moments.
      </div>

      <HeroOverlay />
    </section>
  );
};

export default Hero;
