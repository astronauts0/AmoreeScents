"use client";
import React from "react";

import WheelSvg from "@/components/svgs/WheelSvg";
import FlowerSvg from "@/components/svgs/FlowerSvg";
import PriceSvg from "@/components/svgs/PriceSvg";
import WheelStrokeSvg from "@/components/svgs/StarStrokeSvg";

const Dedicate = ({ dedicateRef }) => {
  return (
    <section
      ref={dedicateRef}
      className="dedicate__section relative h-[70vh] md:h-screen w-full overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 transform z-[-1] -translate-x-1/2 -translate-y-1/2 w-[96%] md:w-2/3">
        <div className="text-4xl md:text-7xl font-bold uppercase text-center dedicate__text">
          <h1 className="block">We aren't a</h1>
          <h1 className="dancing_script block">perfume factory,</h1>
          <h1 className="obviously block -translate-y-2">We focus on</h1>
          <h1 className="Havelock_Medium block">quality.</h1>
        </div>
        <div>
          <div className="absolute animate-spin duration-1000 top-0 left-0 z-[60]">
            <WheelSvg width="30" fill={""} />
          </div>
          <div className="absolute animate-spin duration-1000 top-0 right-0 z-[60]">
            <WheelStrokeSvg width="40" fill={""} />
          </div>
          <div className="absolute animate-spin duration-1000 bottom-0 left-0 z-[60]">
            <FlowerSvg width="30" fill={""} />
          </div>
          <div className="absolute animate-spin duration-1000 bottom-0 right-0 z-[60]">
            <PriceSvg width="30" fill={""} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dedicate;
