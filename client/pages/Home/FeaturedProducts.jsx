import React from "react";
import Link from "next/link";
import Featured from "@/config/Featured";
import Image from "next/image";

const FeaturedProducts = () => {
  return (
    <section className="h-screen overflow-hidden w-full flex relative featured_products">
      <aside className="w-[58%] md:w-1/3 bg-white absolute left-0 md:z-20 h-screen flex flex-col justify-center items-center p-4">
        <h1 className="font-bold text-2xl md:text-4xl mb-4 drop-shadow-md">
          Revolutionary Products
        </h1>
        <p className="text-sm satoshi_medium sm:text-base">
          Our revolutionary fragrance collection is crafted with precision. We
          pride ourselves on using the finest ingredients, blending pure and
          luxurious essences to create our signature scents.
          <br /> <br />
          Explore a variety of captivating fragrances, from refreshing curtsey,
          fruity & sweets notes to warm, sensual undertones, designed to
          complement every mood and occasion.
        </p>
      </aside>
      <div className="products_wrapper flex absolute z-10 top-1/2 left-2/3 transform -translate-y-1/2 justify-center gap-14">
        {Featured.map((product, i) => (
          <Link
            href={`/product/${product?.link}`}
            key={i}
            className="product__card md:w-72 h-[75vh] w-[90vw] border border_color shadow_black_1 relative"
          >
            <Image
              src={product?.src}
              fill
              className="object-cover w-full h-full"
              alt={`Revolutionary Products ${i + 1}`}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;