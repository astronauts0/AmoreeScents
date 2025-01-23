import React from "react";
import dynamic from "next/dynamic";

import HomeProducts from "@/pages/Home/HomeProducts";
import Cta from "@/pages/Home/Cta";
import FeaturedProducts from "@/pages/Home/FeaturedProducts";

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
      <FeaturedProducts />
      <HomeProducts />
      <ProductModel />
      <Cta />
    </section>
  );
};

export default page;
