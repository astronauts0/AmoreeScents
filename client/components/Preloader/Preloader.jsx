"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PreloaderImgs } from "@/config/PreloaderImgs";
import "./preloader.css";
import CustomEase from "gsap/CustomEase";
import Flip from "gsap/Flip";
import Image from "next/image";
import getRandomString from "@/utils/functions/randomText";

const Preloader = () => {
  const imagesContainerRef = useRef(null);
  const imagesRef = useRef([]);
  const amoreeRef = useRef(null);

  useGSAP(() => {
    const preloaderCtx = gsap.context(() => {
      CustomEase.create(
        "hop",
        "M0,0 C0.355,0.022 0.448,0.079 0.5,0.5 0.542,0.846 0.615,1 1,1 "
      );

      CustomEase.create(
        "hop2",
        "M0,0 C0.078,0.617 0.114,0.716 0.255,0.828 0.373,0.922 0.561,1 1,1 "
      );

      const mainTl = gsap.timeline();
      const revealerTl = gsap.timeline();
      const scaleTl = gsap.timeline();

      const finalText = "Amorée Scents";
      if (amoreeRef.current)
        amoreeRef.current.textContent = getRandomString(finalText.length, "");

      revealerTl
        .to(amoreeRef.current, {
          opacity: 1,
          duration: 0.025,
          repeat: 50,
          onRepeat: () => {
            amoreeRef.current.textContent = getRandomString(finalText.length);
          },
          onComplete: () => {
            gsap.to(amoreeRef.current, {
              duration: 2,
              text: finalText,
              onComplete: () =>
                gsap.to(".start_div", { display: "none", opacity: 0 }),
            });
          },
        })
        .to(".r_1", {
          delay: 2,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.5,
          ease: "hop",
        })
        .to(
          ".r_2",
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            duration: 1.5,
            ease: "hop",
          },
          "<"
        );

      scaleTl.to(imagesRef.current[0], {
        scale: 1,
        duration: 2,
        ease: "power4.inOut",
      });

      imagesRef.current.slice(1).forEach((img) => {
        scaleTl
          .to(
            img,
            {
              scale: 1,
              opacity: 1,
              duration: 1.25,
              ease: "power3.inOut",
            },
            ">-0.5"
          )
          .to(".revealers", {
            display: "none",
          });
      });

      mainTl
        .add(revealerTl)
        .add(scaleTl, "-=1.25")
        .add(() => {
          imagesRef.current
            .filter((img) => !img.classList.contains("main"))
            .forEach((img) => img.remove());

          const state = Flip.getState(".main");

          imagesContainerRef.current.classList.add("stacked-container");

          imagesRef.current
            .filter((img) => img.classList.contains("main"))
            .forEach((img, i) => {
              img.classList.add("stacked");
              img.style.order = i;
              gsap.set(".preloader_img.stacked", {
                clearProps: "transform, top, left",
              });
            });

          return Flip.from(state, {
            duration: 2,
            ease: "hop",
            absolute: true,
            stagger: {
              amount: -0.3,
            },
          });
        });
    });

    return () => preloaderCtx.revert();
  }, []);

  return (
    <section className="overflow-hidden relative">
      <div className="revealers fixed top-0 left-0 w-screen h-screen z-[70] flex flex-col">
        <div className="revealer r_1" />
        <div className="revealer r_2" />
        <div className="start_div w-full absolute z-[75] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl dancing_script">
          <div className="flex items-center w-full gap-y-2 md:gap-y-0 md:gap-x-6 text-center flex-wrap justify-center">
            <Image
              src="/images/svgs/mono_black.svg"
              alt="Amorée Logo"
              width={200}
              height={200}
              className="h-1/2"
            />
            <h1 ref={amoreeRef} className="amoree text-black opacity-1"></h1>
          </div>
        </div>
      </div>
      <div
        className="preloader_images fixed md:bottom-auto z-[60] md:top-1/2 md:left-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 w-full h-full"
        ref={imagesContainerRef}
      >
        {PreloaderImgs.map((image, index) => (
          <div
            key={index}
            className={`preloader_img ${
              index >= PreloaderImgs?.length - 3 ? "main" : ""
            }`}
            ref={(el) => (imagesRef.current[index] = el)}
          >
            <Image
              fill
              src={image}
              alt={`landscape ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Preloader;
