import React from "react";
import { useDispatch } from "react-redux";
import { addItemsToCart, removeItemToCart } from "@/store/actions/cartAction";
import FormatPrice from "@/utils/functions/FormatPrice";
import ButtonTextIcon from "../global/Buttons/ButtonTextIcon";
import Image from "next/image";
import Link from "next/link";

const CartItem = ({ product, name, image, slug, qty, price, stock }) => {
  const dispatch = useDispatch();

  const id = product;

  const handleIncrement = (id, qty, stock) => {
    const newQty = qty + 1;

    if (newQty > stock) return;

    dispatch(addItemsToCart(id, newQty));
  };

  const handleDecrement = (id, qty) => {
    const newQty = qty - 1;

    if (newQty <= 0) return;

    dispatch(addItemsToCart(id, newQty));
  };

  const removeItem = (id) => {
    dispatch(removeItemToCart(id));
  };

  return (
    <>
      <div className="my-10 grid text-center justify-center items-center place-items-center md:grid-cols-5 grid-cols-3 md:w-[90%] mx-auto md:backdrop-blur-lg">
        <Link
          href={`/product/${slug}`}
          className="flex md:flex-row flex-col py-4 gap-5 justify-start items-center"
        >
          <Image width="60" height="60" src={image} alt={name} />
          <p className="satoshi_medium capitalize">
            {name ? name.slice(0, 20) : name}
          </p>
        </Link>

        {/* Price  */}
        <p className="md:block hidden obviously">
          {<FormatPrice price={price} />}
        </p>

        <div className={`flex items-center justify-center obviously`}>
          <div onClick={() => handleDecrement(id, qty)} className="relative">
            <ButtonTextIcon
              Icon={<i className="ri-subtract-fill text-xl"></i>}
              customize="pr-0.5 pl-1 py-0.5"
            />
          </div>
          <input
            className="py-1 w-8 text-center border-t border_color border-b bg-transparent outline-none"
            type="number"
            value={qty}
            readOnly
          />
          <div
            onClick={() => handleIncrement(id, qty, stock)}
            className="relative"
          >
            <ButtonTextIcon
              Icon={<i className="ri-add-line text-xl"></i>}
              customize="pr-0.5 pl-1 py-0.5"
            />
          </div>
        </div>

        {/* Subtotal  */}

        <p className="md:block hidden obviously">
          {<FormatPrice price={price * qty} />}
        </p>

        {/* Remove  */}

        <button type="button" onClick={() => removeItem(id)}>
          <i className="ri-delete-bin-7-line text-red-600 cursor-pointer text-3xl"></i>
        </button>
      </div>
    </>
  );
};

export default CartItem;
