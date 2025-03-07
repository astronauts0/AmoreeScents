"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { toast } from "react-toastify";
import Loader from "@/utils/Loader/Loader";
import { clearErrors, login, register } from "@/store/actions/userAction";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import MetaData from "@/utils/Meta/MetaData";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ButtonTextIcon from "@/components/global/Buttons/ButtonTextIcon";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  let { error, loading, isAuthenticated } = useSelector((state) => state.user);

  const [userLog, setUserLog] = useState({ email: "", password: "" });
  const handleLogin = (e) => {
    setUserLog({ ...userLog, [e.target.name]: e.target.value });
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(userLog));
    setUserLog({ email: "", password: "" });
  };

  const [showedToast, setShowedToast] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const [userSign, setUserSign] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSignup = (e) =>
    setUserSign({ ...userSign, [e.target.name]: e.target.value });

  const signupSubmit = (e) => {
    e.preventDefault();
    if (!userSign.phone >= 9) {
      toast.error("Phone number should be at least 9 or more characters");
      return;
    }
    dispatch(register({ ...userSign }));
  };

  const searchParams = useSearchParams();
  const shipping = searchParams.get("redirect");
  const redirect = shipping || "profile";

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      router.push(`/${redirect}`);
    }
    if (!isAuthenticated && shipping == "shipping" && !showedToast) {
      toast.error(
        "Please login or register first. This Info will be used in order confirmation process."
      );
      setShowedToast(true);
    }
  }, [dispatch, error, isAuthenticated, router, redirect, showedToast]);

  return (
    <section className="grid place-items-center w-full h-full bg-center">
      <MetaData title="Login OR Register" />
      {loading ? (
        <Loader />
      ) : (
        <Tabs className="bg-gray-200 shadow_black_1 mt-28 mb-10 w-fit rounded-lg p-6 flex justify-center items-center flex-col">
          <TabList className="flex items-center w-full">
            <Tab className="w-full border border_color rounded-none outline-none text-center py-3 cursor-pointer">
              Login
            </Tab>
            <Tab className="w-full border border_color rounded-none outline-none text-center py-3 cursor-pointer">
              Register
            </Tab>
          </TabList>
          <hr />
          <TabPanel>
            <div>
              <h1 className="text-3xl font-bold leading-none text-center mt-10 mb-6">
                Login to Your Account
              </h1>
              <form onSubmit={loginSubmit}>
                <div className="flex justify-center items-center flex-wrap gap-x-6">
                  <input
                    required
                    onChange={handleLogin}
                    value={userLog.email}
                    className="text-center outline-none bg-transparent border border_color rounded-full block size-60 px-3 py-2 mt-4"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <div className="relative">
                    <input
                      required
                      onChange={handleLogin}
                      value={userLog.password}
                      className="text-center outline-none bg-transparent border border_color rounded-full block size-60 px-3 py-2 mt-4"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                    />
                    <span
                      onClick={toggleShowPassword}
                      className="absolute left-1/2 bottom-7 transform -translate-x-1/2"
                    >
                      {showPassword ? (
                        <div className="flex flex-col items-center justify-center">
                          <VisibilityOffOutlinedIcon fontSize="medium" />
                          <p className="text-[10px] leading-none">
                            Click to Hide
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <RemoveRedEyeOutlinedIcon fontSize="medium" />
                          <p className="text-[10px] leading-none">
                            Click to Show
                          </p>
                        </div>
                      )}
                    </span>
                  </div>
                </div>
                <div className="mt-10">
                  <ButtonTextIcon
                    btnType="submit"
                    Text="Login"
                    customize="px-4 py-2 transition-all duration-1000 w-full"
                    Icon={<LoginOutlinedIcon fontSize="medium" />}
                  />
                  <Link href="/password/forget" className="mt-5">
                    <ButtonTextIcon
                      Text="Forget Password"
                      customize="px-4 py-2 transition-all duration-1000 w-full"
                      Icon={<i className="ri-lock-2-line text-lg"></i>}
                    />
                  </Link>
                </div>
              </form>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="md:w-[75vw]">
              <h1 className="text-3xl font-bold leading-none text-center mb-10 mt-10">
                Create new Account
              </h1>
              <form onSubmit={signupSubmit}>
                <div className="flex justify-center items-center gap-x-6 flex-wrap">
                  <input
                    required
                    onChange={handleSignup}
                    value={userSign.name}
                    className="text-center outline-none bg-transparent border border_color rounded-full block size-60 px-3 py-2 mt-4"
                    type="text"
                    name="name"
                    placeholder="Name"
                  />
                  <input
                    required
                    onChange={handleSignup}
                    value={userSign.email}
                    className="text-center outline-none bg-transparent border border_color rounded-full block size-60 px-3 py-2 mt-4"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <input
                    required
                    onChange={handleSignup}
                    value={userSign.phone}
                    className="text-center outline-none bg-transparent border border_color rounded-full block size-60 px-3 py-2 mt-4"
                    type="number"
                    name="phone"
                    placeholder="Phone Number"
                  />
                  <div className="relative">
                    <input
                      required
                      onChange={handleSignup}
                      value={userSign.password}
                      className="text-center outline-none bg-transparent border border_color rounded-full block size-60 px-3 py-2 mt-4"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                    />
                    <span
                      onClick={toggleShowPassword}
                      className="absolute left-1/2 bottom-7 transform -translate-x-1/2"
                    >
                      {showPassword ? (
                        <div className="flex flex-col items-center justify-center">
                          <VisibilityOffOutlinedIcon fontSize="medium" />
                          <p className="text-[10px] leading-none">
                            Click to Hide
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <RemoveRedEyeOutlinedIcon fontSize="medium" />
                          <p className="text-[10px] leading-none">
                            Click to Show
                          </p>
                        </div>
                      )}
                    </span>
                  </div>
                </div>
                <div className="mt-10">
                  <ButtonTextIcon
                    btnType="submit"
                    Text="Register"
                    customize="px-4 py-2 transition-all duration-1000 md:w-[60%] w-full mx-auto"
                    Icon={<LoginOutlinedIcon fontSize="medium" />}
                  />
                </div>
              </form>
            </div>
          </TabPanel>
        </Tabs>
      )}
    </section>
  );
};

export default LoginSignup;
