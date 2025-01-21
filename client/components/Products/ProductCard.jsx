import React from "react";
import Image from "next/image";
import ButtonTextIcon from "../global/Buttons/ButtonTextIcon";
import { ShoppingCartOutlined } from "@mui/icons-material";
import FormatPrice from "@/utils/functions/FormatPrice";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";
import ProductRating from "./ProductRating";

const ProductCard = ({ product }) => {
  return (
    <div className="product__card md:w-auto w-[90vw] font-semibold neue_machina_light shadow_black_1">
      <div className="relative sm:w-72 h-full shadow-md border bg-white border-black">
        <div className="relative h-[45vh] w-full hidden md:block">
          <Image
            src={product?.images[0]?.url}
            fill
            className="object-cover w-full"
            alt={product?.name}
          />
        </div>
        <div className="relative h-[50vh] w-full md:hidden">
          <Image
            src={product?.images[0]?.url}
            fill
            className="object-cover w-full"
            alt={product?.name}
          />
        </div>
        <div className="flex justify-between w-full text-xs leading-3 gap-8 px-2 pt-2 pb-3 border-t border_color">
          <div className="w-full space-y-2 text-center">
            <h1 className="capitalize w-full text-xl dancing_script tracking-widest purchased__title">
              {product?.name}
            </h1>
            <p className="leading-4 tracking-wider">
              {product?.shortDescription.length >= 100
                ? product?.shortDescription?.slice(0, 100) + '...'
                : product?.shortDescription}
            </p>
            <div className="flex items-center justify-center color__red obviously">
              <div className="flex items-center justify-center gap-x-1 pr-3">
                <ProductRating ratings={product?.ratings} size="small" />
                <span>({product?.numOfReviews})</span>
              </div>
              <span>
                {" "}
                Save{" "}
                <FormatPrice price={product?.originalPrice - product?.price} />
              </span>
            </div>
            <div className="flex items-center justify-center gap-x-3 obviously">
              <span>
                <FormatPrice price={product?.price} />
              </span>
              <del>
                <FormatPrice price={product?.originalPrice} />
              </del>
            </div>
            <div className="flex items-center justify-center gap-x-3 w-full">
              <AddToCartBtn
                customize="text-sm rounded-2xl px-2 pb-0.5"
                stock={product?.stock}
                id={product?._id}
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
