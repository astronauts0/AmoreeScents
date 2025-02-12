import React from "react";
import dynamic from "next/dynamic";

import HomeProducts from "@/components/Home/HomeProducts";
import Cta from "@/pages/Home/Cta";
import ZoomText from "@/components/Home/ZoomText";

const Hero = dynamic(() => import("@/pages/Home/Hero"), {
  ssr: false,
});
const ProductModel = dynamic(() => import("@/pages/Home/ProductModel"), {
  ssr: false,
});

const page = () => {
  // document.body.style.filter = "invert(1)";
  // document.body.style.background = "#000";
  return (
    <section className="overflow-hidden">
      <Hero />
      <ZoomText/>
      <HomeProducts />
      <ProductModel />
      <Cta />
    </section>
  );
};

export default page;
