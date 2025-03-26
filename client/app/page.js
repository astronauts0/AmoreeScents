import React from "react";
import dynamic from "next/dynamic";

import HomeProducts from "@/layout/Home/HomeProducts";
import Cta from "@/pages/Home/Cta";

const Hero = dynamic(() => import("@/layout/Home/Hero"), {
  ssr: false,
});
const ProductModel = dynamic(() => import("@/pages/Home/ProductModel"), {
  ssr: false,
});

const page = () => {
  // document.body.style.filter = "invert(1)";
  // document.body.style.background = "#000";
  return (
    <section>
      <Hero />
      <HomeProducts />
      <ProductModel />
      <Cta />
    </section>
  );
};

export default page;
