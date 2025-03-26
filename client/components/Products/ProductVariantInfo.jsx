"use client";
import React, { useEffect, useState } from "react";
import FormatPrice from "@/utils/functions/FormatPrice";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import AddToCart from "@/components/Products/AddToCart";
import Link from "next/link";

const ProductVariantInfo = ({ variants, product }) => {
  const colors =
    product?.attributes?.colors || product?.attributes?.color
      ? [
          ...new Set(
            (product.attributes.colors || product.attributes.color).split(",")
          ),
        ]
      : [];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && variants.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const foundVariant = variants.find(
        (v) => v._id === params.get("variant")
      );
      setSelectedVariant(foundVariant || variants[0]);
    }
  }, [variants]);

  useEffect(() => {
    if (selectedVariant) {
      const url = new URL(window.location.href);
      url.searchParams.set("variant", selectedVariant._id);
      window.history.replaceState({}, "", url.toString());
    }
  }, [selectedVariant]);

  const renderAttributeButtons = (key) => (
    <div key={key} className="flex items-center gap-4 flex-wrap">
      <label className="font-bold text-lg satoshi_medium">
        {key.charAt(0).toUpperCase() + key.slice(1)}:
      </label>
      <div className="flex flex-wrap gap-2 neue_machina_regular">
        {variants
          .filter((variant) => variant.attributes[key])
          .map((variant) => (
            <button
              key={variant._id}
              onClick={() => setSelectedVariant(variant)}
              className={`border py-1.5 px-4 rounded transition-all duration-200 ${
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
  );

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

      {variants.length > 0 && (
        <div className="my-4 space-y-4">
          {["size", "bottleType"].map(
            (key) =>
              variants.some((variant) => variant.attributes[key]) &&
              renderAttributeButtons(key)
          )}
        </div>
      )}

      {selectedVariant?.attributes && (
        <div className="my-4 space-y-4">
          {Object.entries(selectedVariant.attributes)
            .filter(
              ([key]) =>
                !["size", "bottleType", "colors", "color"].includes(key)
            )
            .map(([key, value]) => (
              <div key={key} className="flex items-center gap-4 flex-wrap">
                <label className="font-bold text-lg satoshi_medium">
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </label>
                <div className="flex flex-wrap gap-2 neue_machina_regular">
                  <button className="border py-1.5 px-4 rounded transition-all duration-200">
                    {value}
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {colors.length > 0 && (
        <div className="mb-4 space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <label className="font-bold text-lg satoshi_medium">Colors:</label>
            <div className="flex flex-wrap gap-2 neue_machina_regular">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`border border-black rounded-full w-7 h-7 outline-none ${
                    selectedColor === color ? "ring-2 ring-indigo-500" : ""
                  }`}
                >
                  {selectedColor === color && (
                    <i className="ri-check-line flex justify-center items-center text-xl text-indigo-500"></i>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {(selectedVariant?.attributes?.color ||
        selectedVariant?.attributes?.colors) && (
        <div className="mb-4 space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <label className="font-bold text-lg block satoshi_medium">
              Colors:
            </label>
            <div className="flex flex-wrap gap-2 neue_machina_regular">
              <button
                style={{
                  backgroundColor:
                    selectedVariant.attributes.color ||
                    selectedVariant.attributes.colors,
                }}
                className="border border-black rounded-full w-7 h-7 outline-none ring-2 ring-indigo-500"
              >
                <i className="ri-check-line flex justify-center items-center text-xl text-indigo-500"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {product.attributes && Object.keys(product?.attributes).length > 0 && (
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
      )}

      <ul className="space-y-2 border_color border-t py-4 neue_machina_light tracking-wide">
        <li className="space-x-3">
          <CardGiftcardOutlinedIcon />{" "}
          <span>FREE gift packing with every order</span>
        </li>
        <li className="space-x-3">
          <LanguageOutlinedIcon /> <span>14 Days easy return</span>
        </li>
        <li className="space-x-3 pl-1">
          <div className="flex items-center gap-x-5">
            <span className="relative flex size-3 ml-1">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full ${
                  selectedVariant?.stock > 0
                    ? "bg-green-400 opacity-75"
                    : "bg-red-400 opacity-75"
                }`}
              ></span>
              <span
                className={`relative inline-flex size-3 rounded-full ${
                  selectedVariant?.stock > 0 ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
            </span>
            <span>
              {selectedVariant?.stock > 0
                ? "In stock, ready to ship"
                : "Out of stock"}
            </span>
          </div>
        </li>
      </ul>
      <AddToCart
        slug={product.slug}
        stock={selectedVariant?.stock}
        variantId={selectedVariant?._id}
        color={
          selectedColor ??
          selectedVariant?.attributes?.color ??
          selectedVariant?.attributes?.colors
        }
        id={product._id}
      />
    </div>
  );
};

export default ProductVariantInfo;
