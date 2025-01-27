"use client";
import React, { useState, memo, useRef } from "react";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "@/store/actions/cartAction";
import { toast } from "react-toastify";
import ButtonTextIcon from "../global/Buttons/ButtonTextIcon";
import dynamic from "next/dynamic";
import { sendGTMEvent } from "@next/third-parties/google";
const ConfettiRain  = dynamic(() => import("@/utils/confetti/ConfettiRain"), {
  ssr: false,
});

const AddToCartBtn = memo(({slug, stock, id, count, customize, icon }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const dispatch = useDispatch();

  const addToCart = () => {

    sendGTMEvent({ event: "addToCart", value: { slug, count } });

    if (stock < 1)
      return toast.error(
        "Out of Stock. We'll notify you when it's back in stock."
      );

    dispatch(addItemsToCart(id, count));
    toast.success("Item Added To Cart");

    setShowConfetti(true);

    setTimeout(() => {
      setShowConfetti(false);
    }, 6000);
  };

  return (
    <div onClick={addToCart}>
      {showConfetti && <ConfettiRain recycle={false} numberOfPieces={600} />}
      <ButtonTextIcon Text="Add to cart" Icon={icon} customize={customize} />
    </div>
  );
});

export default AddToCartBtn;
