"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ZoomText = () => {
  const zoomTextRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.set(".enter_amoree", { scale: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: zoomTextRef.current,
            start: "top top",
            end: "bottom -100%",
            scrub: true,
            // markers: true,
            pin: true,
            onEnter: () => document.body.setAttribute("theme", "white"),
            onEnterBack: () => document.body.setAttribute("theme", "white"),
          },
        })
        .to(
          ".enter_extra_text",
          {
            delay: -2,
            duration: 4.5,
            ease: "power4.inOut",
            scale: 0,
          },
          "ent"
        )
        .to(
          ".enter_amoree",
          { scale: 50, duration: 4.5, ease: "power4.inOut" },
          "ent"
        )
        .to(
          ".enter_amoree .enter_t",
          {
            delay: .2,
            color: "#aedee0",
            duration: 2,
            ease: "power4.inOut",
          },
          "ent"
        );
    }, zoomTextRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={zoomTextRef}
      className="overflow-hidden w-full h-screen relative flex justify-center items-center border-t border-black"
    >
      <div
        style={{ wordSpacing: "-0.05em" }}
        className="text-5xl text-center sm:text-left sm:text-7xl obviously tracking-tighter font-black uppercase w-full"
      >
        <h1 className="absolute left-1/2 transform sm:translate-x-0 w-full -translate-x-1/2 top-5 sm:left-7 enter_extra_text sm:h-40">
          We craft <br />
          <span className="text-[#aedee0]">scents for you</span>
        </h1>
        <h1 className="absolute left-1/2 transform sm:translate-x-0 w-full -translate-x-1/2 bottom-5 sm:right-7 enter_extra_text sm:h-20">
          As it should be
        </h1>
      </div>

      <h1 className="enter_amoree text-[25vw] leading-[25vw] sm:text-[26vw] sm:leading-[26vw] font-black w-full text-center uppercase">
        én<span className="enter_t">t</span>er
      </h1>
    </section>
  );
};

export default ZoomText;
