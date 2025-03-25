"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import getRandomString from "@/utils/functions/randomText";
import SplitType from "split-type";
import { usePathname } from "next/navigation";

const Preloader = () => {
  const amoreeRef = useRef(null);
  const pathname = usePathname();

  useGSAP(() => {
    const preloaderCtx = gsap.context(() => {
      const revealerTl = gsap.timeline();

      const finalText = "Amorée Scents";
      if (amoreeRef.current)
        amoreeRef.current.textContent = getRandomString(finalText.length);

      revealerTl
        .to(amoreeRef.current, {
          opacity: 1,
          duration: 0.023,
          repeat: 45,
          onRepeat: () => {
            amoreeRef.current.textContent = getRandomString(finalText.length);
          },
          onComplete: () => {
            gsap.to(amoreeRef.current, {
              duration: 1.75,
              text: finalText,
              onComplete: () =>
                gsap.to(".start_div", { display: "none", opacity: 0 }),
            });
          },
        })
        .to(".r_1", {
          delay: 2,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.35,
          ease: "expo.inOut",
        })
        .to(
          ".r_2",
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            duration: 1.35,
            ease: "expo.inOut",
          },
          "<"
        )
        .to(".revealers", {
          display: "none",
        });

      if (pathname == "/") {
        revealerTl
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
          .from(new SplitType(".hero_main_title", { type: "words" })?.chars, {
            opacity: 0,
            x: -10,
            stagger: 0.02,
            duration: 0.1,
            ease: "power2",
          });
      }
    });

    return () => preloaderCtx.revert();
  }, []);

  return (
    <section className="overflow-hidden relative">
      <div className="revealers fixed top-0 left-0 w-screen h-screen z-[70] flex flex-col">
        <div className="revealer r_1" />
        <div className="revealer r_2" />
        <div className="start_div w-full absolute z-[75] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl dancing_script">
          <div className="flex items-center w-full gap-y-5 md:gap-y-0 md:gap-x-6 text-center flex-wrap justify-center">
            <Image
              src="/images/svgs/mono_black.svg"
              alt="Amorée Logo"
              width={200}
              height={200}
              className="h-1/2"
            />
            <h1
              ref={amoreeRef}
              className="amoree text-black opacity-1 break-all leading-[1.1] md:leading-none md:break-normal"
            ></h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preloader;
