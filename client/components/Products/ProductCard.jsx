import React from "react";
import Image from "next/image";
import ButtonTextIcon from "../global/Buttons/ButtonTextIcon";
import { ShoppingCartOutlined } from "@mui/icons-material";
import FormatPrice from "@/utils/functions/FormatPrice";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";
import ProductRating from "./ProductRating";

const ProductCard = ({ product }) => {

  const variant = product?.variants[0];

  return (
    <div className="product__card w-auto  font-semibold neue_machina_light shadow_black_1 rounded-lg sm:rounded-none">
      <div className="relative sm:w-72 h-full shadow-md border bg-white border-black rounded-lg sm:rounded-none">
        <div className="relative h-[45vh] w-full hidden md:block">
          <Image
            src={product?.images[0]?.url}
            fill
            className="object-cover w-full"
            alt={product?.name}
          />
        </div>
        <div className="relative md:hidden h-[35vh] w-full">
          <Link href={`/product/${product?.slug}`}>
            <Image
              src={product?.images[0]?.url}
              fill
              className="object-cover w-full rounded-t-lg"
              alt={product?.name}
            />
          </Link>
          <div className="absolute -top-2 -left-2 bg-white rounded-full">
            <AddToCartBtn
              customize="text-sm rounded-full py-2 pl-2 pr-1 bg-white"
              slug={product?.slug}
              stock={variant?.stock}
              id={product?._id}
              variantId={variant?._id}
              count={1}
              isHideOnMob={true}
              icon={<ShoppingCartOutlined />}
            />
          </div>
        </div>
        <div className="flex justify-between w-full text-xs leading-3 gap-8 px-2 pt-2 pb-3 border-t border_color">
          <div className="w-full space-y-2.5 sm:space-y-2 sm:text-center">
            <h1
              style={{ fontWeight: "800" }}
              className="capitalize w-full text-lg sm:text-xl dancing_script tracking-widest purchased__title"
            >
              {product?.name}
            </h1>
            <p className="leading-4 tracking-wider hidden sm:block">
              {product?.shortDescription.length >= 100
                ? product?.shortDescription?.slice(0, 100) + "..."
                : product?.shortDescription}
            </p>
            <p className="leading-4 tracking-wider block sm:hidden text-gray-600">
              {product?.shortDescription.length >= 50
                ? product?.shortDescription?.slice(0, 50) + "..."
                : product?.shortDescription}
            </p>
            <div className="flex items-center sm:justify-center color__red obviously">
              <div className="flex items-center justify-center gap-x-1 pr-3">
                <ProductRating ratings={product?.ratings} size="small" />
                <span>({product?.numOfReviews})</span>
              </div>
              <span className="hidden sm:inline">
                {" "}
                Save{" "}
                <FormatPrice price={variant?.originalPrice - variant?.price} />
              </span>
            </div>
            <div className="flex items-center sm:justify-center gap-x-3 obviously">
              <span>
                <FormatPrice price={variant?.price} />
              </span>
              <del className="hidden sm:inline">
                <FormatPrice price={variant?.originalPrice} />
              </del>
            </div>
            <div className="hidden sm:flex items-center justify-center gap-x-3 w-full">
              <AddToCartBtn
                customize="text-sm rounded-2xl px-2 pb-0.5"
                slug={product?.slug}
                stock={variant?.stock}
                id={product?._id}
                variantId={variant?._id}
                count={1}
                icon={
                  <ShoppingCartOutlined
                    sx={{ fontSize: "17px" }}
                    style={{ stroke: "#000", strokeWidth: "0.1" }}
                  />
                }
              />
              <Link href={`/product/${product?.slug}`}>
                <ButtonTextIcon
                  customize="text-sm rounded-2xl px-2 pb-0.5"
                  Text="Shop Now"
                  Icon={
                    <ShoppingCartOutlined
                      sx={{ fontSize: "17px" }}
                      style={{ stroke: "#000", strokeWidth: "0.1" }}
                    />
                  }
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;