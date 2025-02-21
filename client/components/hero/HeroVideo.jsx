import React from "react";
import WheelSvg from "@/components/svgs/WheelSvg";
import { isMobile } from "@/config/Variables";
const HeroVideo = () => {
  return (
    <div
      style={{ "--clip": "100%" }}
      className="vid_cont w-full h-screen absolute top-0 left-0 z-20"
    >
      <video
        src="https://res.cloudinary.com/ddrd0vxzq/video/upload/v1737568078/Hero_Main_xke04x.mp4"
        autoPlay
        loop
        muted
        className="w-full h-full object-cover object-center"
      ></video>
      <div className="amoree__hero absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-[16vw] leading-[13vw] font-bold uppercase mt-0.5 flex items-center">
          <span>A</span>
          <span>m</span>
          <span className="mx-1.5 amoree_O_icon_animation">
            <WheelSvg width={isMobile ? 80 : 220} />
          </span>
          <span>r</span>
          <span>é</span>
          <span>e</span>
        </h1>
        <h2 className="text-xl md:text-4xl text_stroke text_stroke_color mt-1 dancing_script font-normal uppercase text-end scale-0 opacity-0">
          Scents
        </h2>
      </div>
      <div className="absolute sm:bottom-10 bottom-7 satoshi_medium left-10 hero_main_title">
        We create timeless fragrances. <br /> Perfumes. Scents. Memories. <br />{" "}
        For real people, real <br /> moments.
      </div>
    </div>
  );
};

export default HeroVideo;
