"use client";

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "@/store/actions/orderAction";
import { UPDATE_ORDER_RESET } from "@/store/constants/orderConstants";
import Loader from "@/utils/Loader/Loader";
import FormatPrice from "@/utils/functions/FormatPrice";
import isAuth from "@/Auth/isAuth";
import Sidebar from "@/components/dashboard/Sidebar";
import MetaData from "@/utils/Meta/MetaData";
import ButtonTextIcon from "@/components/global/Buttons/ButtonTextIcon";
import Link from "next/link";
import Image from "next/image";

const ProcessOrder = ({ params: { id } }) => {
  const [formData, setFormData] = useState({ status: "", payment: false });

  const dispatch = useDispatch();
  const router = useRouter();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
    message,
  } = useSelector((state) => state.order);

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
  } = order || {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "payment" ? JSON.parse(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData));
    dispatch(updateOrder(id, { ...formData }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success(message);
      // router.push("/admin/orders");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, updateError, isUpdated, id]);

  const formatDateTime = (date) => {
    const d = new Date(date);
    return `${d.toLocaleDateString()} at ${d.toLocaleTimeString()}`;
  };

  return (
    <Fragment>
      <MetaData title="Process Order" />
      {loading ? (
        <Loader />
      ) : (
        <section className="flex">
          <Sidebar />
          <section className="min-h-screen py-20 px-6 flex mx-auto h-full w-full justify-center md:flex-nowrap flex-wrap">
            <div className="md:w-[65%] w-full h-full md:pr-10">
              <div>
                <h1 className="text-3xl font-bold mb-4">Shipping Info</h1>
                <h1 className="font-bold mb-4 break-all">
                  Order Id: #{order && order._id}
                </h1>
                <div className="space-y-2 satoshi_medium capitalize">
                  <p>Name: {user?.name}</p>
                  <p>Phone: {shippingInfo?.phoneNo}</p>
                  <p>
                    Address:{" "}
                    {shippingInfo &&
                      `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`}
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <h1 className="text-xl font-bold mb-4">Order Items</h1>
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
                            src={item.image}
                            alt={item.name}
                          />
                          <div>
                            <p className="satoshi_medium capitalize text-center">
                              {item.name}
                            </p>
                            <p className="satoshi_medium">
                              <strong>Size:</strong>{" "}
                              <span className="bg-[#00796b] text-white px-1 rounded">
                                {item?.size}
                              </span>
                              {item?.materialType &&
                                item?.materialType.includes("Premium") && (
                                  <sup className="dancing_script block pt-4 underline underline-offset-2">
                                    {" "}
                                    <mark>In Premium Bottle</mark>
                                  </sup>
                                )}
                            </p>
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

            <div className="md:w-[35%] w-full h-full mt-10 md:mt-0 md:pl-7 md:border-l-2 border_color">
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
                  Total Items:{" "}
                  <span className="obviously">
                    {orderItems &&
                      orderItems.reduce((acc, currVal) => acc + currVal.qty, 0)}
                  </span>
                </p>
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

              <div className="my-6 border-t border_color" />

              {/* Combined Form */}
              <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
                <h1>Update Order:</h1>
                <select
                  className="text-center outline-none bg-transparent border px-3 py-2 w-full"
                  onChange={handleInputChange}
                  value={formData.payment}
                  name="payment"
                >
                  <option disabled value="">
                    Select Payment Status
                  </option>
                  <option value="false">Not Paid</option>
                  <option value="true">Paid</option>
                </select>

                {/* Order Status */}
                {orderStatus !== "Delivered" && (
                  <select
                    className="text-center outline-none bg-transparent border px-3 py-2 w-full"
                    onChange={handleInputChange}
                    value={formData.status}
                    name="status"
                  >
                    <option disabled value="">
                      Select Status
                    </option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                )}
                {updateLoading ? (
                  <Loader />
                ) : (
                  <ButtonTextIcon
                    btnType="submit"
                    customize="px-4 py-2 transition-all duration-1000 hover:rounded-full"
                    Icon={<i className="ri-refresh-line text-lg"></i>}
                    disabled={
                      loading || (!formData.status && formData.payment === "")
                    }
                    Text="Update Order"
                  />
                )}
              </form>
            </div>
          </section>
        </section>
      )}
    </Fragment>
  );
};

export default isAuth(ProcessOrder, true);
