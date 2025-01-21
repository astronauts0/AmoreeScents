import React from "react";
import {
  LinesData1,
  LinesData2,
  LinesData3,
  LinesData4,
} from "@/config/LinesData";
import HeroLine from "./HeroLine";
import WheelSvg from "@/components/svgs/WheelSvg";
import FlowerSvg from "@/components/svgs/FlowerSvg";
import PriceSvg from "@/components/svgs/PriceSvg";
import StarStrokeSvg from "@/components/svgs/StarStrokeSvg";

const HeroOverlay = () => {
  return (
    <section className="hero_overlay border-b border_color h-screen w-full relative overflow-hidden -z-10">
      <div className="absolute top-[16%] text-2xl text-center left-1/2 -translate-x-1/2 w-full">
        <div className="hero_overlay_title satoshi_medium">
          We craft fragrances <br /> that resonate with emotions:
        </div>
      </div>

      <div className="hero_rows absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[77%] w-[90%] ">
        <div className="hero_row hero_row_lft -translate-x-1/2 w-full flex items-center gap-7 whitespace-nowrap">
          {LinesData1.map((line) => {
            return <HeroLine key={line.id} {...line} />;
          })}
        </div>
        <div className="hero_row hero_row_rgt -translate-x-[23%] w-full flex items-center gap-7 whitespace-nowrap">
          {LinesData2.map((line) => {
            return <HeroLine key={line.id} {...line} />;
          })}
        </div>
        <div className="hero_row hero_row_lft -translate-x-1/2 w-full flex items-center gap-7 whitespace-nowrap">
          {LinesData3.map((line) => {
            return <HeroLine key={line.id} {...line} />;
          })}
        </div>
        <div className="hero_row hero_row_rgt -translate-x-[23%] w-full flex items-center gap-7 whitespace-nowrap">
          {LinesData4.map((line) => {
            return <HeroLine key={line.id} {...line} />;
          })}
        </div>
      </div>

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

export default HeroOverlay;
