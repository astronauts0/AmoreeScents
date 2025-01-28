"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "@/utils/Loader/Loader";
import { clearErrors, resetPassword } from "@/store/actions/userAction";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MetaData from "@/utils/Meta/MetaData";
import ButtonTextIcon from "@/components/global/Buttons/ButtonTextIcon";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export const dynamicParams = true;

const ResetPassword = ({ params: { token } }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { error, loading, success } = useSelector(
    (state) => state.forgetPassword
  );

  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const handlePasswords = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const updPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token, passwords));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Password Reset successfully.");
      router.push("/login");
    }
  }, [dispatch, toast, error, router, success]);

  return (
    <section className="flex justify-center items-center min-h-screen w-full mt-32 md:mt-8">
      <MetaData title="Reset Password" />
      <div
        className={`bg-gray-200 shadow_black_1 w-fit rounded-lg p-6 flex justify-center items-center flex-col`}
      >
        <div className="text-3xl font-bold mb-4 text-center relative w-full">
          <span>Reset Password</span>
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
          action="/resetPassword"
          method="post"
          onSubmit={updPasswordSubmit}
        >
          <div className="flex flex-wrap justify-center items-center gap-x-6">
            <input
              onChange={handlePasswords}
              value={passwords.password}
              className="text-center outline-none bg-transparent border border_color rounded-full block size-60 px-3 py-2 mt-4"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
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
            {loading ? (
              <Loader height="auto" />
            ) : (
              <ButtonTextIcon
                btnType="submit"
                Text="Reset Password"
                customize="px-4 py-2 transition-all duration-1000 hover:rounded-full"
                Icon={<i className="ri-refresh-line text-lg"></i>}
              />
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
