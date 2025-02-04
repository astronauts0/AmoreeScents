import React from "react";
import ProductCard from "@/components/Products/ProductCard";
import fetchProducts from "@/modules/backend/fetchProducts";

const HomeProducts = async () => {
  let products = await fetchProducts();
  const categories = [
    { title: "Our Perfume Collections", subCategory: ["perfume"] },
    { title: "Our Attar Collections", subCategory: ["attar", "attr","ittr","ittar"] },
    // { title: "Our Tester Collections", subCategory: "tester" },
  ];

  return (
    <section className="relative my-14 px-6 sm:px-8 space-y-12 home_products overflow-hidden">
      {categories.map((category, index) => (
        <div key={index}>
          <h1 className="text-center text-3xl mb-14">{category.title}</h1>
          <div className="flex flex-wrap gap-y-4 sm:gap-4">
            {products
              ?.filter((product) =>
                category.subCategory.includes(product?.subCategory)
              )
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default HomeProducts;