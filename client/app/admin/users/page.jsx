"use client";
import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteUser,
  getAllUsers,
} from "@/store/actions/userAction";
import { DELETE_USER_RESET } from "@/store/constants/userConstants";
import { DataGrid } from "@mui/x-data-grid";
import MetaData from "@/utils/Meta/MetaData";
import Loader from "@/utils/Loader/Loader";
import Link from "next/link";
import { toast } from "react-toastify";
import Sidebar from "@/components/dashboard/Sidebar";
import ButtonTextIcon from "@/components/global/Buttons/ButtonTextIcon";
import Image from "next/image";
import isAuth from "@/Auth/isAuth";

const UsersList = () => {
  const dispatch = useDispatch();
  const { error, users } = useSelector((state) => state.allUsers);
  const {
    loading,
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      toast.success(message);
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, toast, error, deleteError, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 240, flex: 0.8 },

    {
      field: "image",
      headerName: "Profile",
      minWidth: 100,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <div className="size-14 relative overflow-hidden rounded-full">
            <Image
              fill
              className="w-full h-full object-cover"
              src={params.row.image}
              alt="profile"
            />
          </div>
        );
      },
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 175,
      flex: 0.5,
    },

    {
      field: "email",
      headerName: "Email",
      minWidth: 225,
      flex: 1,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 85,
      flex: 0.3,
      cellClassName: (params) => {
        return params.row.role && params.row.role === "admin"
          ? "text_success"
          : "text_error";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 165,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-end w-full h-full gap-x-6">
            <div onClick={() => deleteUserHandler(params.row.id)}>
              <i className="ri-delete-bin-7-line text-red-600 text-xl"></i>
            </div>
            <Link href={`/admin/user/${params.row.id}`} className="">
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

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        image: item.avatar?.url,
        name: item.name,
      });
    });

  if (loading) return <Loader />;

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />
      {loading ? (
        <Loader />
      ) : (
        <section className="flex w-screen">
          <Sidebar />
          <div className="px-10 pt-20 pb-10">
            <h1 className="text-3xl text-center mb-7">
              ALL USERS ({users?.length}){" "}
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
      )}
    </Fragment>
  );
};

export default isAuth(UsersList, true);
