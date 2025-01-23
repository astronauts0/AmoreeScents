"use client";
import React, { useRef } from "react";
import Dedicate from "@/modules/Home/Dedicate";
import Purchased from "@/modules/Home/Purchased";
import Marquee from "@/modules/Home/Marquee";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import Image from "next/image";
import ModelSound from "@/components/global/audio/ModelSound";
import { isMobile } from "@/config/Variables";

const ProductModel = () => {
  const marqueeRef = useRef(null);
  const dedicateRef = useRef(null);
  const purchasedRef = useRef(null);
  const modelRef = useRef(null);

  const beepRef = useRef(null);
  const billScannerRef = useRef(null);
  const billScannerFullRef = useRef(null);
  const modelSize = isMobile ? 400 : 200;

  const handleSounds = (soundRef) => {
    if (soundRef.current && soundRef.current.paused) {
      soundRef.current.muted = false;
      soundRef.current.play();
    }
  };

  useGSAP(() => {
    gsap.to(modelRef.current, {
      scale: 1,
      opacity: 1,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: marqueeRef.current,
        start: "top top",
        scrub: 2,
        pin: true,
        // markers: true,
      },
    });

    const marqueeCtx = gsap.context(() => {
      const elements = marqueeRef.current.querySelectorAll("[data-scroll]");
      elements.forEach((el) => {
        const speed = el.getAttribute("data-scroll-speed") || 1;
        const direction =
          el.getAttribute("data-scroll-direction") || "vertical";

        gsap.to(el, {
          x: direction === "horizontal" ? `${speed * 100}px` : 0,
          y: direction === "vertical" ? `${speed * 100}px` : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom top",
            scrub: 2,
            // markers: true,
          },
        });
      });
    }, marqueeRef);

    const dedicateCtx = gsap.context(() => {
      const dedicateText = new SplitType(".dedicate__text h1", {
        type: "words,chars",
      });
      gsap.from(dedicateText.chars, {
        opacity: 0,
        rotationX: 180,
        scale: 0,
        y: 80,
        transformOrigin: "0% 50% -50",
        ease: "Back.easeOut",
        stagger: {
          amount: 1.7,
          each: 1.7,
          grid: "auto",
          from: "center",
          axis: "y",
        },
        scrollTrigger: {
          trigger: ".dedicate__text",
          start: "top 60%",
          end: "bottom 70%",
          scrub: 2,
          // markers: true,
          onEnter: () => document.body.setAttribute("theme", "cyan"),
          onEnterBack: () => document.body.setAttribute("theme", "cyan"),
        },
      });
    }, dedicateRef);

    const purchasedCtx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: purchasedRef.current,
            start: "top top",
            end: "bottom top",
            // markers: true,
            scrub: 2,
            pin: true,
            onEnter: () => document.body.setAttribute("theme", "white"),
            onEnterBack: () => document.body.setAttribute("theme", "white"),
          },
          ease: "power4.inOut",
          duration: 1.5,
        })
        .to(".purchased__card", {
          height: "75vh",
          width: window.innerWidth > 700 ? "18rem" : "85%",
        })
        .to(".purchased__card__bill", {
          ease: "steps(6)",
          duration: 4,
          bottom: window.innerWidth > 700 ? "-32%" : "-40%",
          onComplete: () => handleSounds(billScannerRef),
        })
        .from(
          ".purchased__card .bar__code",
          {
            scaleX: 0,
            rotateY: 0,
            duration: 3,
            opacity: 0,
          },
          "spec"
        )
        .from(
          ".purchased__card__spec div",
          {
            xPercent: -100,
            stagger: 0.1,
            opacity: 0,
          },
          "spec"
        )
        .from(
          ".purchased__card .purchased",
          {
            xPercent: 130,
            opacity: 0,
          },
          "spec"
        )
        .from(
          ".purchased__card__dets li",
          {
            xPercent: 130,
            stagger: 0.1,
            opacity: 0,
          },
          "spec"
        )
        .to(".purchased__card .purchased div", {
          width: "100%",
        })
        .to(
          ".purchased__card .purchased div h1",
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            color: "#ef4444",
          },
          "prc_dn"
        )
        .to(
          ".purchasedLine",
          {
            width: "100%",
            opacity: 1,
            duration: 0.4,
            onStart: () => handleSounds(beepRef),
          },
          "prc_dn"
        )
        .to(
          ".purchased__card .purchased div",
          {
            borderColor: "#ef4444",
            duration: 0.1,
          },
          "prc_dn"
        )
        .to(modelRef.current, {
          rotateY: 360,
          duration: 4,
        })
        .to(".purchased__card__bill", {
          duration: 6,
          bottom: "1%",
          ease: "steps(15)",
          onStart: () => handleSounds(billScannerFullRef),
        })
        .to(modelRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.1,
          ease: "power2.out",
        });
    }, purchasedRef);

    return () => {
      marqueeCtx.revert();
      dedicateCtx.revert();
      purchasedCtx.revert();
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <ModelSound
        beepRef={beepRef}
        billScannerRef={billScannerRef}
        billScannerFullRef={billScannerFullRef}
      />
      <div
        ref={modelRef}
        className="w-fit fixed perfume_model z-40 top-36 md:top-11 scale-0 opacity-0 left-1/2 transform -translate-x-1/2"
      >
        <Image
          priority
          src="/images/svgs/zynor.svg"
          alt="model"
          width={modelSize}
          height={modelSize}
        />
      </div>
      <Marquee marqueeRef={marqueeRef} />
      <Dedicate dedicateRef={dedicateRef} />
      <Purchased purchasedRef={purchasedRef} />
    </div>
  );
};

export default ProductModel;
