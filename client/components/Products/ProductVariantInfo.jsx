"use client";
import React, { useEffect, useState } from "react";
import FormatPrice from "@/utils/functions/FormatPrice";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import AddToCart from "@/components/Products/AddToCart";
import Link from "next/link";

const ProductVariantInfo = ({ variants, product }) => {
  const colors = product?.attributes?.colors
    ? [...new Set(product.attributes.colors.split(","))]
    : [];

  // Agar colors array empty hai, toh selectedColor undefined hoga.
  const [selectedColor, setSelectedColor] = useState(
    colors.length ? colors[0] : undefined
  );

  const [selectedVariant, setSelectedVariant] = useState(() => {
    if (typeof window !== "undefined" && variants && variants.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const variantIdFromUrl = params.get("variant");
      if (variantIdFromUrl) {
        const foundVariant = variants.find((v) => v._id === variantIdFromUrl);
        if (foundVariant) return foundVariant;
      }
    }
    return variants[0];
  });

  useEffect(() => {
    if (selectedVariant) {
      const url = new URL(window.location.href);
      url.searchParams.set("variant", selectedVariant._id);
      window.history.replaceState({}, "", url.toString());
    }
  }, [selectedVariant]);

  return (
    <div>
      <div className="flex items-center flex-wrap gap-3 text-lg obviously">
        <span>
          <FormatPrice price={selectedVariant?.price} />
        </span>
        <del>
          <FormatPrice price={selectedVariant?.originalPrice} />
        </del>
        <span className="color__red">
          Save{" "}
          <FormatPrice
            price={selectedVariant?.originalPrice - selectedVariant?.price}
          />
        </span>
      </div>
      <small className="neue_machina_light text-xs">
        <Link className="underline" href="/policies/shipping-policy">
          Shipping
        </Link>{" "}
        calculated at checkout.
      </small>

      {/* Variant selector using toggle buttons */}
      <div className="my-4 space-y-4">
        {Object.keys(selectedVariant?.attributes || {}).map((key) => (
          <div key={key} className="flex items-center gap-4 flex-wrap">
            <label className="font-bold text-lg block satoshi_medium">
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
            <div className="flex flex-wrap gap-2 neue_machina_regular">
              {variants.map((variant) => (
                <button
                  key={variant._id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`border outline-none py-1.5 px-4 rounded transition-all duration-200 
                  ${
                    selectedVariant?._id === variant._id
                      ? "border-[#00796b] bg-[#00796b] text-white"
                      : ""
                  }`}
                >
                  {variant.attributes[key]}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="my-4 space-y-4">
        {Object.keys(product?.attributes || {})
          .filter((key) => key !== "colors")
          .map((key) => (
            <div key={key} className="flex items-center gap-4 flex-wrap">
              <label className="font-bold text-lg block satoshi_medium">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </label>
              <div className="flex flex-wrap gap-2 neue_machina_regular">
                <button
                  className={`border outline-none py-1.5 px-4 rounded transition-all duration-200`}
                >
                  {product?.attributes?.[key]}
                </button>
              </div>
            </div>
          ))}
      </div>

      {colors && colors[0] && (
        <div className="mb-4 space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <label className="font-bold text-lg block satoshi_medium">
              Colors:
            </label>
            <div className="flex flex-wrap gap-2 neue_machina_regular">
              {colors.map((color, index) => (
                <button
                  onClick={() => setSelectedColor(color)}
                  key={index}
                  style={{ backgroundColor: color }}
                  className={`border border-black rounded-full w-7 h-7 outline-none`}
                >
                  {selectedColor === color && (
                    <i class="ri-check-line flex justify-center items-center text-xl text-indigo-500"></i>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <ul className="space-y-2 border_color border-t py-4 neue_machina_light tracking-wide">
        <li className="space-x-3">
          <CardGiftcardOutlinedIcon />{" "}
          <span>FREE gift packing with every order</span>
        </li>
        {/* {selectedVariant &&
        selectedVariant?.attributes?.BottleType === "Simple" &&
        selectedVariant?.attributes?.Size === "6ml" ? (
          ""
        ) : (
          <li className="space-x-3">
            <ColorizeIcon /> <span>1ml Tester free</span>
          </li>
        )} */}
        <li className="space-x-3">
          <LanguageOutlinedIcon /> <span>14 Days easy return</span>
        </li>
        <li className="space-x-3 pl-1">
          {selectedVariant?.stock > 0 ? (
            <div className="flex items-center gap-x-5">
              <span className="relative flex size-3 ml-1">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
              </span>
              <span>In stock, ready to ship</span>
            </div>
          ) : (
            <div className="flex items-center gap-x-5">
              <span className="relative flex size-3 ml-1">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
              </span>
              <span>Out of stock</span>
            </div>
          )}
        </li>
      </ul>

      <AddToCart
        slug={product.slug}
        stock={selectedVariant?.stock}
        variantId={selectedVariant?._id}
        color={selectedColor}
        id={product._id}
      />
    </div>
  );
};

export default ProductVariantInfo;
