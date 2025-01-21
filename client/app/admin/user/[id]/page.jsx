'use client'
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_USER_RESET } from "@/store/constants/userConstants";
import { getUserDetails, updateUser, clearErrors } from "@/store/actions/userAction";
import MetaData from "@/utils/Meta/MetaData";
import Loader from "@/utils/Loader/Loader";
import Sidebar from "@/components/dashboard/Sidebar";

import { toast } from "react-toastify";
import ButtonTextIcon from "@/components/global/Buttons/ButtonTextIcon";
import { useRouter } from "next/navigation";
import isAuth from "@/Auth/isAuth";

const UpdateUser = ({ params: { id } }) => {

    const dispatch = useDispatch();
    const router = useRouter();
    const { loading, error, user } = useSelector((state) => state.userDetails);

    const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const userId = id;

    useEffect(() => {
        if (user && user?._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user?.name);
            setEmail(user?.email);
            setRole(user?.role);
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            toast.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("User Updated Successfully");
            dispatch({ type: UPDATE_USER_RESET });
            router.push("/admin/users");
        }
    }, [dispatch, toast, error, isUpdated, updateError, user, userId]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(updateUser(userId, myForm));
    };

    if (updateLoading) return <Loader />

    return (
      <>
        <MetaData title="Update User - Admin" />
        {loading ? (
          <Loader />
        ) : (
          <section className="min-h-screen w-full flex justify-center items-center">
            <Sidebar />
            <div
              className={`bg-gray-200 shadow_black_1 w-full max-w-xl h-fit rounded-lg p-6 flex justify-center items-center flex-col mx-auto my-28 `}
            >
              <h1 className="text-3xl font-bold leading-none text-center my-5">
                Update User
              </h1>
              <form onSubmit={updateUserSubmitHandler}>
                <div className="flex justify-center items-center flex-wrap">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2 mt-4"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2 mt-4"
                  />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    name="role"
                    className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2 mt-4"
                  >
                    <option value="">Choose Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div className="w-full flex justify-center items-center mt-6">
                  <ButtonTextIcon
                    btnType="submit"
                    customize="px-4 py-2 transition-all duration-1000 hover:rounded-full"
                    Icon={<i className="ri-refresh-line text-lg"></i>}
                    disabled={
                      updateLoading ? true : false || role === "" ? true : false
                    }
                    Text="Update User"
                  />
                </div>
              </form>
            </div>
          </section>
        )}
      </>
    );
};

export default isAuth(UpdateUser, true);