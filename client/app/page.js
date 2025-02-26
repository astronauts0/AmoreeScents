import React from "react";
import dynamic from "next/dynamic";

import HomeProducts from "@/layout/Home/HomeProducts";
import Cta from "@/layout/Home/Cta";

const Hero = dynamic(() => import("@/layout/Home/Hero"), {
  ssr: false,
});
const ProductModel = dynamic(() => import("@/layout/Home/ProductModel"), {
  ssr: false,
});

const page = () => {
  // document.body.style.filter = "invert(1)";
  // document.body.style.background = "#000";
  return (
    <section className="overflow-hidden">
      <Hero />
      <HomeProducts />
      <ProductModel />
      <Cta />
    </section>
  );
};

export default page;
