"use client";
import React, {  useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroVideo from "@/components/hero/HeroVideo";
import HeroOverlay from "@/components/hero/HeroOverlay";
import SplitType from "split-type";
import { isMobile } from "@/config/Variables";
import Image from "next/image";

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
            end: "250%",
            scrub: 3,
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
          { opacity: 0, stagger: 0.02, delay: 0.04 },
          "a"
        )
        .to(
          ".hero_row_lft",
          {
            translateX: isMobile ? "40%" : "20%",
            duration: 3,
            ease: "power4",
            stagger: 0.08,
          },
          "b"
        )
        .to(
          ".hero_row_rgt",
          {
            translateX: isMobile ? "-100%" : "-40%",
            duration: 3,
            ease: "power4",
            stagger: 0.08,
          },
          "b"
        )
        .to(".hero_main_title", { opacity: 0, duration: 0.5 }, "b");
    }, headerRef);

    const proCtx = gsap.context(() => {
      let scrollingElement = document.querySelector(".products_wrapper");
      let pinWrapWidth = scrollingElement?.offsetWidth;

      // Main timeline for horizontal scroll
      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".featured_products",
          start: "top top",
          end: `${pinWrapWidth} bottom`,
          scrub: 2,
          pin: true,
          // markers: true,
          onEnter: () => document.body.setAttribute("theme", "cyan"),
          onEnterBack: () => document.body.setAttribute("theme", "cyan"),
        },
      });

      // Horizontal scroll animation
      t1.to(scrollingElement, {
        x: isMobile ? -pinWrapWidth - 250 : -pinWrapWidth,
        ease: "none",
      });

      // Animate each product card individually
      const proCard = gsap.utils.toArray(".featured_products .product__card");

      proCard.forEach((card) => {
        gsap.fromTo(
          card,
          {
            filter: "grayscale(100%) blur(2px)",
            // rotate: 180,
            scaleY: 0.7,
          },
          {
            filter: "grayscale(0%) blur(0px)",
            // rotate: 0,
            scaleY: 1,
            ease: "power4",
            scrollTrigger: {
              trigger: card,
              start: "top 65%",
              end: "top 45%",
              containerAnimation: t1,
              scrub: true,
              // markers: true,
            },
          }
        );
      });
    });

    return () => {
      heroCtx.revert();
      proCtx.revert();
    };
  }, []);

  return (
    <section
      ref={headerRef}
      className="w-full h-screen relative overflow-hidden"
    >
      <div className="scroll_banner flex items-center w-fit absolute top-1/2 capitalize left-full transform -translate-y-1/2 z-40">
        <Image src="/images/train.png" width={180} height={180} alt="train" />
        <h1 className="bg-black rounded px-3 text-7xl font-bold whitespace-nowrap text-center">
          Scroll to View & get discount
        </h1>
      </div>
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
