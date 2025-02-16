import React from "react";
import fetchProducts from "@/modules/backend/fetchProducts";
import ProductCard from "./ProductCard";
const RelatedProducts = async ({ subCategory = "perfume", slug }) => {
  const products = await fetchProducts(`subCategory=${subCategory}`);
  return (
    <div>
      <h1 className="text-3xl mb-10 text-center">Related Products</h1>
      <div className="grid grid-cols-2 sm:flex justify-center sm:flex-wrap gap-x-2.5 gap-y-6 sm:gap-4">
        {products
          .filter(
            (item) => item?.slug.trim() !== slug?.split("%20").join(" ").trim()
          )
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
