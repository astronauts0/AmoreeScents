import React from "react";
import ProductCard from "@/components/Products/ProductCard";
import fetchProducts from "@/modules/backend/fetchProducts";
import HomeProductsTheme from "@/animations/HomeProductsTheme";

const HomeProducts = async () => {
  let products = await fetchProducts();
  const categories = [
    { title: "Our Perfume Collections", subCategory: ["perfume"] },
    {
      title: "Our Attar Collections",
      subCategory: ["attar", "attr"],
    },
    // { title: "Our Purses Collections", subCategory: ["purse", "purses"] },
    // { title: "Our Tester Collections", subCategory: "tester" },
  ];

  return (
    <section className="relative my-14 px-2 sm:px-8 space-y-12 home_products overflow-hidden">
      <HomeProductsTheme />
      {categories.map((category, index) => (
        <div
          key={index}
          className={category.subCategory.includes("attar") && 'pb-4' }
        >
          <h1 className="text-center text-3xl my-10">{category.title}</h1>
          <div className="grid grid-cols-2 sm:flex justify-center sm:flex-wrap gap-x-2.5 gap-y-6 sm:gap-4">
            {products
              ?.filter(
                (product) =>
                  category.subCategory.includes(product?.subCategory) &&
                  product?.featured === true
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
