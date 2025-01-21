"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getOrderDetails } from "@/store/actions/orderAction";
import { toast } from "react-toastify";
import MetaData from "@/utils/Meta/MetaData";
import Loader from "@/utils/Loader/Loader";
import Link from "next/link";
import FormatPrice from "@/utils/functions/FormatPrice";
import Image from "next/image";
import ButtonTextIcon from "@/components/global/Buttons/ButtonTextIcon";
import dynamic from "next/dynamic";
import isAuth from "@/Auth/isAuth";
const ConfettiRain  = dynamic(() => import("@/utils/confetti/ConfettiRain"), {
  ssr: false,
});

const OrderDetails = ({ params: { id } }) => {
  const dispatch = useDispatch();

  const { loading, error, order } = useSelector((state) => state.orderDetails);

  const {
    shippingInfo,
    orderItems,
    user,
    itemsPrice,
    totalPrice,
    shippingPrice,
    orderStatus,
    payment,
    paidAt,
    createdAt,
    deliveredAt,
    shippedAt,
  } = order;

  const address = `${shippingInfo?.address}, ${shippingInfo?.country}, ${shippingInfo?.state}, ${shippingInfo?.city}, ${shippingInfo?.pinCode}`;

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, toast, error, id]);

  const formatDateTime = (date) => {
    const d = new Date(date);
    return `${d.toLocaleDateString()} at ${d.toLocaleTimeString()}`;
  };

  return (
    <>
      <MetaData title="Order Details" />
      {loading ? (
        <Loader />
      ) : (
          <section className="min-h-screen h-fit px-6 md:w-[90%] mx-auto flex items-center pt-32 md:pt-20 justify-center md:flex-nowrap flex-wrap">
            <ConfettiRain numberOfPieces="100" />
            <div className="md:w-[60%] w-full h-full md:border-r-2 border_color md:pr-10">
              <div>
                <h1 className="text-2xl font-bold mb-4 break-all">
                  Order Id: #{order && order._id}
                </h1>
                <div className="space-y-2 satoshi_medium capitalize">
                  <p>Name: {user && user.name}</p>
                  <p>
                    Phone:{" "}
                    <span className="obviously"> {shippingInfo?.phoneNo}</span>
                  </p>
                  <p>Address: {address}</p>
                </div>
              </div>
              <div className="mt-12">
                <h1 className="text-3xl font-bold mb-4">Order Items</h1>
                <div className="space-y-5 py-4">
                  {orderItems &&
                    orderItems.map((item) => (
                      <div key={item.product}>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex justify-between items-center text-center"
                        >
                          <Image
                            width="50"
                            height="50"
                            src={item?.image}
                            alt={item.name}
                          />
                          <p className="satoshi_medium capitalize text-center">
                            {item.name}
                          </p>
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

            <div className="md:w-[40%] w-full h-full mt-10 md:mt-0 md:pl-7">
              <h1 className="text-3xl font-bold mb-4">Order Summary</h1>

              <div className="satoshi_medium space-y-2.5">
                <p>
                  Ordered:{" "}
                  <span className="obviously text-purple-500">
                    {formatDateTime(createdAt)}
                  </span>
                </p>

                <p>
                  Payment Status:{" "}
                  <span className={payment ? "text_success" : "text_error"}>
                    {payment ? `Paid at ${formatDateTime(paidAt)}` : "Not Paid"}
                  </span>
                </p>
                <p>
                  Order Status:{" "}
                  <span
                    className={
                      orderStatus === "Delivered"
                        ? "text_success"
                        : orderStatus === "Shipped"
                        ? "text_warning"
                        : "text_error"
                    }
                  >
                    {orderStatus}
                  </span>
                </p>
                {shippedAt && (
                  <p>
                    Shipped At:{" "}
                    <span className="text-purple-500">
                      {formatDateTime(shippedAt)}
                    </span>
                  </p>
                )}
                {deliveredAt && (
                  <p>
                    Delivered At:{" "}
                    <span className="text-purple-500">
                      {formatDateTime(deliveredAt)}
                    </span>
                  </p>
                )}
              </div>

              <div className="my-6 border-t border_color" />

              <div className="space-y-3 satoshi_medium">
                <p>
                  Subtotal:{" "}
                  <span className="obviously">
                    <FormatPrice price={itemsPrice} />{" "}
                  </span>
                </p>
                <p>
                  Shipping Fee:{" "}
                  <span className="obviously">
                    <FormatPrice price={shippingPrice} />{" "}
                  </span>
                </p>
                <p>
                  Total:{" "}
                  <span className="obviously">
                    <FormatPrice price={totalPrice} />{" "}
                  </span>
                </p>
              </div>

              {/* <div className="my-6 border-t border_color" />


                            {orderStatus !== "Delivered" && (
                                <>
                                    <ButtonTextIcon Text='Track Order' customize="px-4 py-2 transition-all duration-1000 hover:rounded-full" Icon={<i className="ri-fingerprint-line textlg"></i>} />
                                </>
                            )} */}

              {/* <h1 className="text-3xl font-bold mb-4"> Payment</h1>
                            <p className={paymentInfo && paymentInfo.status === "Delivered" ? "text-green-400" : "text-red-400"}>{paymentInfo && paymentInfo.status === 'succeeded' ? "Paid" : "Not Paid"}</p> */}
            </div>
          </section>
      )}
    </>
  );
};

export default isAuth(OrderDetails);
