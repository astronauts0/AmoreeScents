"use client";
import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import {
  clearErrors,
  deleteProduct,
  getAdminProducts,
} from "@/store/actions/productAction";
import { DELETE_PRODUCT_RESET } from "@/store/constants/productConstants";
import Loader from "@/utils/Loader/Loader";
import Sidebar from "@/components/dashboard/Sidebar";
import Link from "next/link";
import { toast } from "react-toastify";
import MetaData from "@/utils/Meta/MetaData";
import ButtonTextIcon from "@/components/global/Buttons/ButtonTextIcon";
import isAuth from "@/Auth/isAuth";

const ProductsList = () => {
  const dispatch = useDispatch();

  const { error, products } = useSelector((state) => state.products);
  const {
    loading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.product);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 270, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 220,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 200,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <div className="flex items-center justify-end w-full h-full gap-x-6">
              {loading ? (
                <Loader />
              ) : (
                <div onClick={() => deleteProductHandler(params.row.id)}>
                  <i className="ri-delete-bin-7-line text-red-600 text-xl"></i>
                </div>
              )}
              <Link href={`/admin/product/${params.row.id}`}>
                <ButtonTextIcon
                  Text="View"
                  Icon={<i className="ri-eye-line text-sm" />}
                  customize="px-2 py-1  transition-all duration-1000 text-sm hover:rounded-full"
                />
              </Link>
            </div>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

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
      toast.success("Product Deleted Successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProducts());
  }, [dispatch, toast, error, deleteError, isDeleted]);

  return (
      <section className="flex">
      <MetaData title={`ALL PRODUCTS - Admin`} />
        <Sidebar />
        <div className="px-10 pt-20 pb-10">
          <h1 className="text-3xl text-center mb-7">
            ALL PRODUCTS ({products?.length}){" "}
          </h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            className="satoshi_medium h-screen"
            data-lenis-prevent
          />
        </div>
      </section>
  );
};

export default isAuth(ProductsList, true);
