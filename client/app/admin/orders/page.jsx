'use client';
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { DELETE_ORDER_RESET } from "@/store/constants/orderConstants";
import { clearErrors, deleteOrder, getAllOrders } from "@/store/actions/orderAction";
import Loader from "@/utils/Loader/Loader";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import MetaData from "@/utils/Meta/MetaData";
import { toast } from "react-toastify";
import Link from "next/link";
import isAuth from "@/Auth/isAuth";
import ButtonTextIcon from "@/components/global/Buttons/ButtonTextIcon";

const OrderList = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { error, orders } = useSelector((state) => state.allOrders);

    const { loading, error: deleteError, isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            toast.success("Order Deleted Successfully");
            router.push("/admin/orders");
            dispatch({ type: DELETE_ORDER_RESET });
        }

        dispatch(getAllOrders());
    }, [dispatch, toast, error, deleteError, router, isDeleted]);

    const columns = [
      { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

      {
        field: "status",
        headerName: "Status",
        minWidth: 120,
        flex: 0.5,
        cellClassName: (params) => {
          return params.row.status && params.row.status === "Delivered"
            ? "text_success"
            : params.row.status === "Shipped"
            ? "text_warning"
            : "text_error";
        },
      },
      {
        field: "orderItems",
        headerName: "Order Items",
        type: "number",
        minWidth: 100,
        flex: 0.4,
      },

      {
        field: "amount",
        headerName: "Amount",
        type: "number",
        minWidth: 150,
        flex: 0.5,
      },

      {
        field: "actions",
        flex: 0.5,
        headerName: "Actions",
        minWidth: 210,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <div className="flex items-center justify-end w-full h-full gap-x-6">
              <div onClick={() => deleteOrderHandler(params.row.id)}>
                <i className="ri-delete-bin-7-line text-red-600 text-xl"></i>
              </div>
              <Link href={`/admin/order/${params.row.id}`}>
                <ButtonTextIcon
                  Text="View"
                  Icon={<i className="ri-eye-line text-sm" />}
                  customize="px-2 py-1  transition-all duration-1000 text-sm hover:rounded-full"
                />
              </Link>
            </div>
          );
        },
      },
    ];

    const rows = [];

    orders?.forEach((item) => {
        rows.push({
            id: item._id,
            orderItems: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus,
        });
    });

    return (
        <>
            <MetaData title={`ALL ORDERS - Admin`} />
            {loading ? <Loader /> :
                <section className="flex w-screen">
                    <Sidebar />
                    <div className="px-10 pt-20 pb-10">
                        <h1 className="text-3xl text-center mb-7">ALL ORDERS ({orders?.length}) </h1>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={0}
                            className="satoshi_medium h-screen"
                            data-lenis-prevent
                        />
                    </div>
                </section>}
        </>
    );
};

export default isAuth(OrderList, true);