"use client";
import React, { useState } from "react";
import ButtonTextIcon from "../global/Buttons/ButtonTextIcon";
import FlashOnOutlinedIcon from "@mui/icons-material/FlashOnOutlined";
import AddToCartBtn from "./AddToCartBtn";
import {
  ShoppingCartCheckoutOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { addItemsToCart } from "@/store/actions/cartAction";
import { useDispatch } from "react-redux";
import PerProductTotalSales from "@/utils/functions/sales/PerProductTotalSales";
import dynamic from "next/dynamic";

const ConfettiRain = dynamic(() => import("@/utils/confetti/ConfettiRain"), {
  ssr: false,
});

const AddToCart = ({ stock, id, slug }) => {
  console.log("🚀 ~ file: AddToCart.jsx:21 ~ AddToCart ~ stock:", stock);
  const router = useRouter();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleIncrement = () => {
    setCount((prev) => (prev === stock ? prev : prev + 1));
  };
  const handleDecrement = () => {
    setCount((prev) => (prev === 1 ? 1 : prev - 1));
  };

  const checkoutHandler = () => {
    dispatch(addItemsToCart(id, count));
    router.push("/login?redirect=shipping");
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 6000);
  };

  return (
    <div>
      {showConfetti && <ConfettiRain recycle={false} numberOfPieces={300} />}
      <div className="flex justify-between items-center border_color border-t pt-10">
        <div className="flex items-center gap-x-2">
          <div className="text-orange-300">
            <FlashOnOutlinedIcon className="animate-pulse" />{" "}
            {<PerProductTotalSales productId={id} />}
          </div>
          <span className="text-inherit">bottles sold</span>
        </div>
        {stock > 0 && (
          <div className={`flex items-center obviously`}>
            <div onClick={handleDecrement} className="relative">
              <ButtonTextIcon
                Icon={<i className="ri-subtract-fill text-xl"></i>}
                customize="pr-0.5 pl-1 py-0.5"
              />
            </div>
            <input
              className="py-1 w-8 text-center border-t border_color border-b bg-transparent outline-none"
              type="number"
              value={count}
              readOnly
            />
            <div onClick={handleIncrement} className="relative">
              <ButtonTextIcon
                Icon={<i className="ri-add-line text-xl"></i>}
                customize="pr-0.5 pl-1 py-0.5"
              />
            </div>
          </div>
        )}
      </div>

      <div className="py-5 darker_grotesque font-bold text-lg">
        <AddToCartBtn
          slug={slug}
          stock={stock}
          id={id}
          count={count}
          customize="w-full px-3 py-1.5"
          icon={<ShoppingCartOutlined />}
        />
        {stock > 0 && (
          <div onClick={checkoutHandler}>
            <ButtonTextIcon
              Text="Buy It Now"
              Icon={<ShoppingCartCheckoutOutlined />}
              customize="w-full px-3 py-1.5"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
