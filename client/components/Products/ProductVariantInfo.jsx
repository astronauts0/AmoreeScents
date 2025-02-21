"use client";
import React, { useEffect, useState } from "react";
import FormatPrice from "@/utils/functions/FormatPrice";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ColorizeIcon from "@mui/icons-material/Colorize";
import AddToCart from "@/components/Products/AddToCart";
import Link from "next/link";

const ProductVariantInfo = ({ variants, product }) => {
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
        <div className="flex items-center gap-4 flex-wrap">
          <label className="font-bold text-lg block satoshi_medium">
            Sizes:
          </label>
          <div className="flex flex-wrap gap-2 neue_machina_regular">
            {variants.map((variant) => (
              <button
                key={variant._id}
                onClick={() => setSelectedVariant(variant)}
                className={`border outline-none py-1.5 px-4 rounded relative transition-all duration-200 
                ${
                  selectedVariant?._id === variant._id
                    ? "border-[#00796b] bg-[#00796b] text-white"
                    : ""
                }`}
              >
                {variant.size}{" "}
                {variant.materialType &&
                  variant?.materialType.includes("Premium") && (
                    <sup className="dancing_script block pt-2">
                      In Premium Bottle
                    </sup>
                  )}
              </button>
            ))}
          </div>
        </div>
        {selectedVariant && selectedVariant?.materialType && (
          <div className="flex gap-x-3">
            <span className="font-bold text-lg satoshi_medium">Bottle:</span>
            <span className="neue_machina_regular translate-y-1">
              {variants.map(
                (variant) =>
                  variant.materialType &&
                  selectedVariant?._id === variant._id && (
                    <span key={variant._id}>
                      <span className="flex">
                        {variant?.materialType
                          ?.split(" ")
                          .slice(0, 2)
                          .join(" ")}
                      </span>
                      {variant?.materialDescription && (
                        <span className="pt-2 block">
                          <span className="satoshi_medium font-bold">
                            Note:
                          </span>{" "}
                          {variant?.materialDescription}
                        </span>
                      )}
                    </span>
                  )
              )}
            </span>
          </div>
        )}
      </div>

      <ul className="space-y-2 border_color border-t py-4 neue_machina_light tracking-wide">
        <li className="space-x-3">
          <CardGiftcardOutlinedIcon />{" "}
          <span>FREE gift packing with every order</span>
        </li>
        {selectedVariant &&
        selectedVariant?.materialType === "Simple Bottle Attar" &&
        selectedVariant?.size === "6ml" ? (
          ""
        ) : (
          <li className="space-x-3">
            <ColorizeIcon /> <span>1ml Tester free</span>
          </li>
        )}
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
        id={product._id}
      />
    </div>
  );
};

export default ProductVariantInfo;
