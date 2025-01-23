import React from "react";
import dynamic from "next/dynamic";

import HomeProducts from "@/modules/Home/HomeProducts";
import Cta from "@/modules/Home/Cta";
import FeaturedProducts from "@/modules/Home/FeaturedProducts";

const Hero = dynamic(() => import("@/modules/Home/Hero"), {
  ssr: false,
});
const ProductModel = dynamic(() => import("@/modules/Home/ProductModel"), {
  ssr: false,
});

const page = () => {
  // document.body.style.filter = "invert(1)";
  // document.body.style.background = "#000";
  return (
    <section className="overflow-hidden">
      <Hero />
      <FeaturedProducts />
      <HomeProducts />
      <ProductModel />
      <Cta />
    </section>
  );
};

export default page;
