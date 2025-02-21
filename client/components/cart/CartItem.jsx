import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItemsToCart, removeItemToCart } from "@/store/actions/cartAction";
import FormatPrice from "@/utils/functions/FormatPrice";
import ButtonTextIcon from "../global/Buttons/ButtonTextIcon";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const CartItem = ({
  product,
  variantId,
  name,
  image,
  slug,
  qty,
  price,
  stock,
  size,
  materialType,
}) => {
  const dispatch = useDispatch();

  const id = product;

  const handleIncrement = (id, variantId, qty, stock) => {
    const newQty = qty + 1;
    if (newQty > stock) return;
    dispatch(addItemsToCart(id, variantId, newQty));
  };

  const handleDecrement = (id, variantId, qty) => {
    const newQty = qty - 1;
    if (newQty <= 0) return;
    dispatch(addItemsToCart(id, variantId, newQty));
  };

  const removeItem = (variantId) => dispatch(removeItemToCart(variantId));

  useEffect(() => {
    if (stock < 1) {
      toast.error("This product you added is currently Out of Stock. We'll notify you when it's back in stock.");
      dispatch(removeItemToCart(variantId))
    };
  }, [stock]);

  return (
    <div className="my-10 grid text-center justify-center items-center place-items-center md:grid-cols-5 grid-cols-3 md:backdrop-blur-lg">
      <Link
        href={`/product/${slug}`}
        className="flex md:flex-row w-full flex-col py-4 gap-y-3 md:gap-5 justify-center items-center"
      >
        <Image width="60" height="60" src={image} alt={name} />
        <div>
          <p className="satoshi_medium capitalize">
            {name.length > 60 ? name.slice(0, 60) + "..." : name}
          </p>
          <p className="satoshi_medium">
            <strong>Size:</strong>{" "}
            <span className="bg-[#00796b] text-white px-1 rounded">{size}</span>
            {materialType && materialType.includes("Premium") && (
              <sup className="dancing_script block pt-4 underline underline-offset-2">
                {" "}
                <mark>In Premium Bottle</mark>
              </sup>
            )}
          </p>
        </div>
      </Link>

      {/* Price  */}
      <p className="md:block hidden obviously">
        {<FormatPrice price={price} />}
      </p>

      <div className={`flex items-center justify-center obviously`}>
        <div
          onClick={() => handleDecrement(id, variantId, qty)}
          className="relative"
        >
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
          onClick={() => handleIncrement(id, variantId, qty, stock)}
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

      <button type="button" onClick={() => removeItem(variantId)}>
        <i className="ri-delete-bin-7-line text-red-600 cursor-pointer text-3xl"></i>
      </button>
    </div>
  );
};

export default CartItem;
