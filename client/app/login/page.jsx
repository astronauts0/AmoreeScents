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
import Image from "next/image";
import Compressor from "compressorjs";

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

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const [userSign, setUserSign] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const initialPreview =
    "https://res.cloudinary.com/ddrd0vxzq/image/upload/v1737568766/user_c9frnv.png";

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(initialPreview);

  const handleSignup = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      if (!file) return;

      new Compressor(file, {
        quality: 0.5,
        mimeType: "image/webp",
        maxWidth: 800,
  maxHeight: 800,
        success(result) {
          const reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onloadend = () => {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          };
        },
        error(err) {
          console.error("Image compression error:", err);
          toast.error("Upload Failed. Try Again!");
        },
      });
    } else {
      setUserSign({ ...userSign, [e.target.name]: e.target.value });
    }
  };

  const signupSubmit = (e) => {
    e.preventDefault();
    if (!userSign.phone >= 9) {
      toast.error("Phone number should be atleast 9 or more characters");
      return;
    }
    if (!avatar) {
      toast.error("Please Upload Profile Image!");
      return;
    }
    dispatch(register({ ...userSign, avatar }));
  };

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "profile";

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      router.push(`/${redirect}`);
    }
  }, [dispatch, error, isAuthenticated, router, redirect]);

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
                          <p className="text-[10px] leading-none">Click to Hide</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <RemoveRedEyeOutlinedIcon fontSize="medium" />
                          <p className="text-[10px] leading-none">Click to Show</p>
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
                          <p className="text-[10px] leading-none">Click to Hide</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <RemoveRedEyeOutlinedIcon fontSize="medium" />
                          <p className="text-[10px] leading-none">Click to Show</p>
                        </div>
                      )}
                    </span>
                  </div>
                  <div className="relative mt-3 md:mt-0">
                    <div className="size-48 relative mb-2">
                      <Image
                        width="220"
                        height="220"
                        className="border border_color rounded-full object-cover w-full h-full"
                        src={avatarPreview}
                        alt="Profile Image"
                      />
                      <label
                        className="w-9 h-9 cursor-pointer absolute flex justify-center items-center bottom-4 right-4 rounded-full bg-white"
                        htmlFor="upload"
                      >
                        <i className="text-zinc-800 ri-pencil-fill text-xl animate-spin"></i>
                      </label>
                      <input
                        hidden
                        onChange={handleSignup}
                        className="opacity-0 w-[0.1px] h-[0.1px]"
                        type="file"
                        name="avatar"
                        accept="image/*"
                        id="upload"
                      />
                    </div>
                    {avatarPreview === initialPreview && (
                      <small className="text_error text-xs text-center mt-3 w-full block">
                        Must upload your profile*
                      </small>
                    )}
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