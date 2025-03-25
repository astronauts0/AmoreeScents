"use client";
import React, { useState, memo } from "react";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "@/store/actions/cartAction";
import { toast } from "react-toastify";
import ButtonTextIcon from "../global/Buttons/ButtonTextIcon";
import dynamic from "next/dynamic";
import { sendGTMEvent } from "@next/third-parties/google";
import { track } from "@vercel/analytics";
const ConfettiRain = dynamic(() => import("@/utils/confetti/ConfettiRain"), {
  ssr: false,
});

const AddToCartBtn = memo(
  ({
    isHideOnMob = false,
    slug,
    stock,
    id,
    count,
    customize,
    icon,
    variantId,
    color,
  }) => {
    const [showConfetti, setShowConfetti] = useState(false);
    const dispatch = useDispatch();

    const addToCart = () => {
      // sendGTMEvent({ event: "addToCart", value: { slug, count } });
      // track("addToCart", {
      //   productLink: `${slug}?variant=${variantId}`,
      //   productQty: count,
      // });
      if (stock < 1)
        return toast.error(
          "Out of Stock. We'll notify you when it's back in stock."
        );

      dispatch(addItemsToCart(id, variantId,color, count));
      toast.success("Item Added To Cart");

      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 6000);
    };

    return (
      <div onClick={addToCart}>
        {showConfetti && <ConfettiRain recycle={false} numberOfPieces={600} />}
        <ButtonTextIcon
          Text={isHideOnMob ? "" : "Add to cart"}
          Icon={icon}
          customize={customize}
        />
      </div>
    );
  }
);

export default AddToCartBtn;
