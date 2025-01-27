"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import FormatPrice from "@/utils/functions/FormatPrice";
import CartItem from "@/components/cart/CartItem";
import ButtonTextIcon from "@/components/global/Buttons/ButtonTextIcon";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { removeAllItemsToCart } from "@/store/actions/cartAction";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import MetaData from "@/utils/Meta/MetaData";
import Image from "next/image";
import dynamic from "next/dynamic";
const ConfettiRain = dynamic(() => import("@/utils/confetti/ConfettiRain"), {
  ssr: false,
});

export default function Cart() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [showConfetti, setShowConfetti] = useState(false);
  
    console.log("🚀 ~ file: page.jsx:23 ~ Cart ~ cartItems:", cartItems);
    
  const checkoutHandler = () => {
    router.push("/login?redirect=shipping");
  };

  const clearItems = () => {
    dispatch(removeAllItemsToCart());
  };

  const subtotal = cartItems.reduce(
    (acc, currVal) => acc + currVal.qty * currVal.price,
    0
  );
  const shippingCharges = subtotal >= 3000 ? 0 : 200;

  useEffect(() => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 15000);
  }, []);

  if (cartItems.length === 0) {
    return (
      <section className="flex justify-center items-center flex-col gap-y-1 h-screen w-full relative">
        <ShoppingCartOutlined sx={{ fontSize: "4rem" }} />
        <h3 className="text-center text-6xl dancing_script">
          No Items In Cart
        </h3>
        <Link href="/" className="mt-5">
          <ButtonTextIcon
            Text="Continue Shopping"
            Icon={<i className="ri-arrow-left-line"></i>}
            customize="px-4 py-2 transition-all duration-1000 w-full hover:rounded-full"
          />
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full relative">
      <MetaData title="Your Cart Items" />
      {showConfetti && <ConfettiRain recycle={false} numberOfPieces={2000} />}
      <div className="mt-[20vh] md:mt-[25vh] w-[90%] mx-auto">
        {isAuthenticated && (
          <div className="flex items-center justify-center md:justify-start relative gap-x-6 mb-14 md:mb-10">
            <div className="size-20 relative rounded-full overflow-hidden border border_color">
              <Image
                fill
                src={user?.avatar?.url}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-light capitalize">{user.name}</h2>
          </div>
        )}

        <div className="grid text-center justify-around lg:grid-cols-5 grid-cols-3 border-b-2 pb-2 divide-x-4">
          <p>Item</p>
          <p className="lg:block hidden">Price</p>
          <p>Quantity</p>
          <p className="lg:block hidden">Subtotal</p>
          <p>Remove</p>
        </div>

        <div>
          {cartItems &&
            cartItems.map((val) => <CartItem key={val.id} {...val} />)}
        </div>

        <div className="flex justify-between border-t border_color pt-8 items-center flex-col lg:flex-row">
          <div>
            <Link href="/">
              <ButtonTextIcon
                Text="Continue Shopping"
                Icon={<i className="ri-arrow-left-line"></i>}
                customize="px-4 py-2 transition-all duration-1000 hover:rounded-full"
              />
            </Link>
          </div>
          <div onClick={clearItems}>
            <ButtonTextIcon
              Text="Clear All Items"
              Icon={<i className="ri-delete-bin-7-line"></i>}
              customize="px-4 py-2 transition-all duration-1000 text-red-600 border border-red-600 hover:rounded-full"
            />
          </div>
        </div>

        {/* <div className="relative overflow-x-auto mt-20">
                        <table className="md:w-full w-fit text-sm text-left border border_color">
                            <thead className={`text-xs uppercase  ${theme?.palette?.mode == 'dark' ? 'bg-gray-50 text-black' : 'bg-gray-800 text-white'}`}>
                                <tr className="">
                                    <th scope="col" className="px-6 py-3 border border_color">
                                        SubTotal:
                                    </th>
                                    <th scope="col" className="px-6 py-3 border border_color">
                                        Shipping Fee:
                                    </th>
                                    <th scope="col" className="px-6 py-3 border border_color">
                                        Order Total:
                                    </th>
                                    <th scope="col" className="px-6 py-3 border border_color">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="">
                                    <th scope="row" className="px-6 py-4 border border_color font-medium whitespace-nowrap">
                                        {cartItems && <FormatPrice price={subtotal} />}
                                    </th>
                                    <td className="px-6 py-4 border border_color">
                                        <FormatPrice price={shippingCharges} />
                                    </td>
                                    <td className="px-6 py-4 border border_color">
                                        <FormatPrice price={subtotal + shippingCharges} />
                                    </td>
                                    <td className="px-6 py-4 border border_color">
                                        <div onClick={checkoutHandler} >
                                            <ButtonTextIcon disabled={cartItems.length === 0} Text='Checkout' Icon={<ShoppingCartCheckoutOutlinedIcon />} customize='px-3 py-1.5 transition-all duration-1000 hover:rounded-full' />
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div> */}

        <div className="mt-20">
          <div className="w-fit border border_color mx-auto md:ml-auto md:mr-0 space-y-3.5 p-3">
            <p className="darker_grotesque font-semibold text-xl">
              SubTotal:{" "}
              <span className="obviously text-sm">
                {cartItems && <FormatPrice price={subtotal} />}
              </span>
            </p>
            <p className="darker_grotesque font-semibold text-xl">
              Shipping Fee:{" "}
              <span className="obviously text-sm">
                <FormatPrice price={shippingCharges} />{" "}
              </span>
            </p>
            <p className="darker_grotesque font-semibold text-xl">
              Order Total:{" "}
              <span className="obviously text-sm">
                <FormatPrice price={subtotal + shippingCharges} />{" "}
              </span>
            </p>
            <div onClick={checkoutHandler}>
              <ButtonTextIcon
                Text="Checkout"
                Icon={<ShoppingCartCheckoutOutlinedIcon />}
                customize="px-3 py-1.5 transition-all duration-1000 hover:rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
