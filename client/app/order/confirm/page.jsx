"use client";
import React, { useEffect, useState } from "react";
import isAuth from "@/Auth/isAuth";
import ButtonTextIcon from "@/components/global/Buttons/ButtonTextIcon";
import CheckoutStep from "@/components/order/CheckoutStep";
import {
  clearErrors as ordersClearErrors,
  createOrder,
} from "@/store/actions/orderAction";
import { clearErrors, sendOtp, verifyOtp } from "@/store/actions/otpActions";
import { removeAllItemsToCart } from "@/store/actions/cartAction";
import FormatPrice from "@/utils/functions/FormatPrice";
import Loader from "@/utils/Loader/Loader";
import MetaData from "@/utils/Meta/MetaData";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  console.log("🚀 ~ ConfirmOrder ~ cartItems:", cartItems);
  const { loading, success, message, isVerified, error } = useSelector(
    (state) => state.otp
  );
  let { user } = useSelector((state) => state.user);

  const {
    error: orderError,
    order,
    loading: loadingOrder,
  } = useSelector((state) => state.newOrder);
  const orderMessage = order?.message;
  const orderCreate = order?.success;

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  const shippingCharges = subtotal >= 3000 ? 0 : 200;
  const totalPrice = subtotal + shippingCharges;

  const address = `${shippingInfo?.address}, ${shippingInfo?.country}, ${shippingInfo?.state}, ${shippingInfo?.city}, ${shippingInfo?.pinCode}`;

  const sendOtpHandler = () => {
    dispatch(sendOtp(user.email));
    setOtpSent(true);
  };

  const verifyOtpAndCreateOrder = () => {
    dispatch(verifyOtp(user.email, otp));
  };

  useEffect(() => {
    if (success) {
      toast.success(message);
      message && toast.warning("Don't refresh the page.");
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isVerified) {
      const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: subtotal,
        shippingPrice: shippingCharges,
        totalPrice,
      };
      dispatch(createOrder(order));
    }
  }, [success, message, isVerified, error, dispatch]);

  useEffect(() => {
    if (orderCreate) {
      router.push("/order/success");
      toast.success(orderMessage);
      dispatch(removeAllItemsToCart());
    }

    if (orderError) {
      toast.error(orderError);
      dispatch(ordersClearErrors());
    }
  }, [orderCreate, orderError, orderMessage, router, dispatch]);

  return (
    <section className="min-h-screen w-full py-20 px-6">
      <MetaData title="Confirm Order" />

      <CheckoutStep activeStep={1} />

      <div className="flex md:w-[90%] mx-auto h-full justify-center items-center md:flex-nowrap flex-wrap">
        <div className="md:w-[60%] w-full h-full md:border-r-2 border_color md:pr-10">
          <div>
            <h1 className="text-3xl font-bold mb-4">Shipping Details</h1>
            <div className="space-y-2 satoshi_medium capitalize">
              <p>Name: {user?.name}</p>
              <p>
                Phone:{" "}
                <span className="obviously">{shippingInfo?.phoneNo}</span>
              </p>
              <p>Address: {address}</p>
            </div>
          </div>

          <div className="mt-12">
            <h1 className="text-3xl font-bold mb-4"> Your Cart Items</h1>
            <div className="space-y-5 py-4">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <Link
                      href={`/product/${item.slug}`}
                      className="flex justify-between items-center text-center"
                    >
                      <Image
                        width="50"
                        height="50"
                        src={item.image}
                        alt={item.name}
                      />
                      <div>
                        <p className="satoshi_medium capitalize text-center">
                          {item.name}
                        </p>
                        {/* Attributes Display Section */}
                        {item?.attributes &&
                          Object.keys(item?.attributes).filter(
                            (key) => key !== "color" && key !== "colors"
                          ).length > 0 && (
                            <div className="satoshi_medium">
                              {Object.keys(item?.attributes)
                                .filter(
                                  (key) => key !== "color" && key !== "colors"
                                )
                                .map((key) => (
                                  <p key={key}>
                                    <strong>
                                      {key.charAt(0).toUpperCase() +
                                        key.slice(1)}
                                      :
                                    </strong>{" "}
                                    <span className="bg-[#00796b] text-white px-1 rounded">
                                      {item?.attributes[key]}
                                    </span>
                                  </p>
                                ))}
                            </div>
                          )}
                        {item?.color && (
                          <div className="satoshi_medium flex justify-center items-center gap-x-2 pt-0.5">
                            <strong>Color:</strong>
                            <button
                              style={{ backgroundColor: item?.color }}
                              className={`border border-black rounded-full w-6 h-6 outline-none`}
                            >
                              <i class="ri-check-line font-bold flex justify-center items-center text-indigo-500"></i>
                            </button>
                          </div>
                        )}
                      </div>
                      <span className="obviously">
                        {item.qty} X <FormatPrice price={item.price} /> ={" "}
                        <FormatPrice price={item.price * item.qty} />
                      </span>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="md:w-[40%] w-full h-full mt-10 md:mt-0 md:pl-10">
          <h1 className="text-3xl font-bold mb-4">Order Summary</h1>

          <div className="satoshi_medium">
            <p>
              Total Items:{" "}
              {cartItems.reduce((acc, currVal) => acc + currVal.qty, 0)}
            </p>
            <p>
              Subtotal: <FormatPrice price={subtotal} />{" "}
            </p>
            <p>
              Shipping Fee: <FormatPrice price={shippingCharges} />{" "}
            </p>
            <p>
              Payment Method:{" "}
              <span className="text_warning">Cash On Delivery</span>
            </p>
          </div>

          <div className="my-6 border-t border_color" />

          {otpSent ? (
            loading ? (
              <Loader height="h-auto" />
            ) : (
              <div className="flex items-center justify-center flex-wrap gap-3">
                <input
                  type="number"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="text-center outline-none bg-transparent border rounded-full border_color size-28 px-3 py-2 mt-4"
                />
                {loadingOrder ? (
                  <Loader height="h-auto" />
                ) : (
                  <div onClick={verifyOtpAndCreateOrder}>
                    <ButtonTextIcon
                      Text="Verify OTP & Proceed"
                      customize="px-4 py-2 transition-all duration-1000 hover:rounded-full"
                      disabled={loading}
                      Icon={<i className="ri-arrow-right-line"></i>}
                    />
                  </div>
                )}
              </div>
            )
          ) : loading ? (
            <Loader height="h-auto" />
          ) : (
            <div onClick={sendOtpHandler}>
              <ButtonTextIcon
                Text="Send OTP"
                customize="px-4 py-2 transition-all duration-1000 hover:rounded-full"
                disabled={loading}
                Icon={<i className="ri-arrow-right-line"></i>}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default isAuth(ConfirmOrder);
