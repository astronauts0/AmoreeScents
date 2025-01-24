'use client';

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { clearErrors, myOrders } from "@/store/actions/orderAction";
import { toast } from "react-toastify";
import MetaData from "@/utils/Meta/MetaData";
import Loader from "@/utils/Loader/Loader";
import isAuth from "@/Auth/isAuth";
import Link from "next/link";
import ButtonTextIcon from "@/components/global/Buttons/ButtonTextIcon";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const isMobile = window.innerWidth < 700

  const columns = [
    { field: "id", headerName: "Order ID", flex: 1, minWidth: 200 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      minWidth: isMobile ? 150 : 100,
      renderCell: (params) => (
        <span
          className={
            params.row.status && params.row.status === "Delivered"
              ? "text_success" : params.row.status === "Shipped"
                ? "text_warning"
                : "text_error"
          }
        >
          {params.row.status}
        </span>
      ),
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      flex: 0.3,
      minWidth: isMobile ? 150 : 80,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      flex: 0.5,
      minWidth: isMobile ? 170 : 100,
    },
    {
      field: "actions",
      flex: 0.3,
      type: "number",
      headerName: "Actions",
      minWidth: isMobile ? 150 : 80,
      sortable: false,
      renderCell: (params) => (
        <Link href={`/order/${params.row.id}`} className="flex items-center justify-end w-full h-full">
          <ButtonTextIcon Text="View" Icon={<i className="ri-eye-line text-sm" />} customize="px-2 py-1  transition-all duration-1000 text-sm hover:rounded-full" />
        </Link>
      ),
    },
  ];

  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <>
      <MetaData title={`${user.name} - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <section className="w-[90%] mx-auto min-h-screen scroll_thin flex flex-col py-20 md:items-center md:justify-center">
          <h1 className="text-3xl mt-10 mb-4 capitalize text-center scroll_thin">
            {user.name}'s Orders
          </h1>
          <div className="w-full">
            {orders && orders[0]?.orderItems ? (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={7}
                className="satoshi_medium h-screen scroll_thin"
                data-lenis-prevent
              />
            ) : (
              <div className="mt-8 flex items-center justify-center satoshi_medium flex-col gap-4">
                <h1>You have not made any orders</h1>
                <Link href="/">
                  <ButtonTextIcon
                    Text="Shop Now"
                    Icon={<i className="ri-arrow-right-line" />}
                    customize="px-4 py-2 transition-all duration-1000 hover:rounded-full"
                  />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default isAuth(MyOrders);
