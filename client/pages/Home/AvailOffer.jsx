"use client";
import SalesBanner from "@/components/global/sales/SalesBanner";
import { SplitText } from "@/utils/functions/SplitText";
import gsap from "gsap";
import { useLenis } from "lenis/dist/lenis-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

const AvailOffer = () => {
  const lenis = useLenis();
  const enterRef = useRef(null);
  const availOfferRef = useRef(null);
  const pathname = usePathname();

  const heroMainTitle = SplitText(".hero_main_title", {
    type: "words",
  });

  const handleMouseMove = (e) => {
    if (enterRef.current) {
      gsap.to(enterRef.current, {
        top: 0,
        left: 0,
        ease: "power4",
        duration: 7,
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleClick = () => {
    let bgMusic = document.getElementById("soft_bg_music");
    if (bgMusic && bgMusic.paused) {
      bgMusic.muted = false;
      bgMusic.play();
    }

    const preTl = gsap.timeline();

    preTl
      .to(
        ".sale_banner",
        {
          display: "none",
          ease: "power4.inOut",
          duration: 1,
        },
        "sm"
      )
      .to(
        availOfferRef?.current,
        {
          filter: "blur(5px)",
          duration: 0.5,
          top: "-100%",
          opacity: 0,
          onComplete: () => {
            gsap.set(availOfferRef?.current, { display: "none" });
          },
        },
        "sm"
      );

    lenis?.start();

    if (pathname == "/") {
      preTl
        .from(
          ".amoree__hero h1 span",
          {
            opacity: 0,
            y: -200,
            duration: 1,
            stagger: 0.13,
            ease: "bounce",
          },
          "txt1"
        )
        .to(
          ".amoree__hero h2",
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "expo.in",
          },
          "txt1"
        )
        .from(heroMainTitle?.chars, {
          opacity: 0,
          x: -10,
          stagger: 0.02,
          duration: 0.1,
          ease: "power2",
        });
    }
  };

  useEffect(() => {
    lenis?.stop();
  }, [lenis]);

  return (
    <section
      ref={availOfferRef}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className="h-screen w-full text-black bg-white flex justify-center items-center fixed top-0 left-0 z-50"
    >
      <div className="sale_banner">
        <SalesBanner />
      </div>
      <h1 className="text-center text-[22vw] leading-[22vw] sm:text-[12vw] sm:leading-[12vw]">
        <span>Click</span> <span className="Havelock_Medium">to</span> <br />{" "}
        <span className="dancing_script">20%</span>{" "}
        <span className="neue_machina_light">Off!</span>
      </h1>
      <div
        ref={enterRef}
        className="absolute backdrop-blur-lg rounded-full z-50 flex justify-center items-center top-20 left-[40%] md:left-[45%] "
      >
        <div className="enter_avail_offer"></div>
        <span className="absolute text-sm z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 dancing_script">
          Enter
        </span>
      </div>
    </section>
  );
};

export default AvailOffer;
