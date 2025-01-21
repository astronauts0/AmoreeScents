"use client";
import ButtonTextIcon from "@/components/global/Buttons/ButtonTextIcon";
import { clearErrors, updatePassword } from "@/store/actions/userAction";
import { UPDATE_PASSWORD_RESET } from "@/store/constants/userConstants";
import Loader from "@/utils/Loader/Loader";
import MetaData from "@/utils/Meta/MetaData";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import isAuth from "@/Auth/isAuth";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswords = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const updPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword({ ...passwords }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Password updated successfully");
      router.push("/profile");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, toast, error, router, isUpdated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <section className="flex justify-center items-center min-h-screen w-full mt-32 md:mt-8">
            <div
              className={`bg-gray-200 shadow_black_1 w-fit rounded-lg p-6 flex justify-center items-center flex-col`}
            >
              <div className="text-3xl font-bold mb-4 text-center relative w-full">
                <span>Change Password</span>
                <button
                  onClick={toggleShowPassword}
                  className="md:absolute top-0 right-0"
                >
                  {showPassword ? (
                    <>
                      <VisibilityOffOutlinedIcon fontSize="large" />
                      <p className="text-[10px] leading-none">Click to Hide</p>
                    </>
                  ) : (
                    <>
                      <RemoveRedEyeOutlinedIcon fontSize="large" />
                      <p className="text-[10px] leading-none">Click to Show</p>
                    </>
                  )}
                </button>
              </div>
              <form
                action="/updatePassword"
                method="post"
                onSubmit={updPasswordSubmit}
              >
                <div className="flex flex-wrap justify-center items-center gap-x-6">
                  <input
                    onChange={handlePasswords}
                    value={passwords.oldPassword}
                    className="text-center outline-none bg-transparent border border_color rounded-full block size-60 px-3 py-2 mt-4"
                    type={showPassword ? "text" : "password"}
                    name="oldPassword"
                    placeholder="oldPassword"
                  />
                  <input
                    onChange={handlePasswords}
                    value={passwords.newPassword}
                    className="text-center outline-none bg-transparent border border_color rounded-full block size-60 px-3 py-2 mt-4"
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="newPassword"
                  />
                  <input
                    onChange={handlePasswords}
                    value={passwords.confirmPassword}
                    className="text-center outline-none bg-transparent border border_color rounded-full block size-60 px-3 py-2 mt-4"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="confirmPassword"
                  />
                </div>
                <div className="mt-8 flex items-center justify-center">
                  <ButtonTextIcon
                    btnType="submit"
                    Text="Change Password"
                    customize="px-4 py-2 transition-all duration-1000 hover:rounded-full"
                    Icon={<i className="ri-refresh-line text-lg"></i>}
                  />
                </div>
              </form>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default isAuth(UpdatePassword);
