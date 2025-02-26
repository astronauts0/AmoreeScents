"use client";
import React, { useRef } from "react";
import ButtonTextIcon from "../../components/global/Buttons/ButtonTextIcon";
import Link from "next/link";
import { ArrowRightAlt } from "@mui/icons-material";
import { useLenis } from "lenis/dist/lenis-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import WheelSvg from "@/components/svgs/WheelSvg";
import FlowerSvg from "@/components/svgs/FlowerSvg";
import PriceSvg from "@/components/svgs/PriceSvg";
import StarStrokeSvg from "@/components/svgs/StarStrokeSvg";
import SmileEmoji from "../../components/svgs/SmileEmoji";
import { SplitText } from "@/utils/functions/SplitText";

const Cta = () => {
  const lenis = useLenis();
  const handleTop = () => lenis?.scrollTo(0, { duration: 8 });

  const thanksRef = useRef(null);
  const thanksTextRef = useRef(null);
  const ctaWrapperRef = useRef(null);
  const ctaRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const thanksText = SplitText(thanksTextRef.current, { type: "words" });

      gsap.to(thanksText.chars, {
        color: "black",
        stagger: 0.3,
        duration: .7,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: thanksRef.current,
          start: "top 50%",
          end: "bottom 70%",
          scrub: true,
          // markers: true,
        },
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 30%",
            end: "bottom bottom",
            // markers: true,
            scrub: true,
          },
        })
        .from(
          ".ctaLine",
          {
            yPercent: -100,
            duration: 0.5,
            ease: "elastic.out",
          },
          "cta"
        )
        .from(
          ".ctaText",
          {
            yPercent: -300,
            duration: 0.5,
            ease: "elastic.out",
          },
          "cta"
        );
    }, ctaWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ctaWrapperRef} className="overflow-hidden">
      <section
        ref={thanksRef}
        className="overflow-hidden w-screen h-screen flex items-center justify-center relative"
      >
        <h1
          ref={thanksTextRef}
          className="text-[25vw] leading-[25vw] sm:text-[15vw] sm:leading-[15vw] font-black w-full text-center text_stroke text_stroke_color"
        >
          <span className="neue_machina_light">Thanks</span>{" "}
          <span className="Havelock_Medium">for</span> <span>YOUR</span>{" "}
          <span className="dancing_script">Visit!</span>
        </h1>
      </section>
      <section
        ref={ctaRef}
        className="overflow-hidden w-full flex flex-col items-center justify-center h-screen relative"
      >
        <div className="text-center">
          <div className="ctaLine bg-black w-[3px] h-[50vh] absolute top-0 left-1/2 -z-10 -translate-x-1/2" />

          <h1 className="ctaText text-9xl font-bold bg-black text-white block w-full">
            Let's Talk
          </h1>

          <div className="mt-8 flex justify-center items-center gap-5 flex-wrap text-lg">
            <Link href="/" rel="noopener noreferrer">
              <ButtonTextIcon
                Text="Contact"
                Icon={<ArrowRightAlt />}
                customize="px-4 py-2 transition-all duration-1000 hover:rounded-full"
              />
            </Link>
            <div onClick={handleTop}>
              <ButtonTextIcon
                Text="Back To Top"
                Icon={<i className="ri-arrow-up-line font-thin stroke-0"></i>}
                customize="px-4 py-2 transition-all duration-1000 hover:rounded-full"
              />
            </div>
            <div className="animate-spin duration-1000">
              <SmileEmoji />
            </div>
          </div>
        </div>
      </section>
      <div>
        <div className="absolute animate-spin duration-1000 top-4 left-4 z-30">
          <WheelSvg width="30" fill={""} />
        </div>
        <div className="absolute animate-spin duration-1000 top-4 right-4 z-30">
          <StarStrokeSvg width="40" fill={""} />
        </div>
        <div className="absolute animate-spin duration-1000 bottom-4 left-4 z-30">
          <FlowerSvg width="30" fill={""} />
        </div>
        <div className="absolute animate-spin duration-1000 bottom-4 right-4 z-30">
          <PriceSvg width="30" fill={""} />
        </div>
      </div>
    </section>
  );
};

export default Cta;
