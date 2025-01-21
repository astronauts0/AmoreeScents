"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "@/utils/Loader/Loader";
import { useRouter } from "next/navigation";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "@/store/actions/userAction";
import { UPDATE_PROFILE_RESET } from "@/store/constants/userConstants";
import MetaData from "@/utils/Meta/MetaData";
import ButtonTextIcon from "@/components/global/Buttons/ButtonTextIcon";
import Image from "next/image";
import isAuth from "@/Auth/isAuth";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const [updUser, setUpdUser] = useState({ name: "", email: "" });
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/images/user.png");

  const handleUpdUser = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else setUpdUser({ ...updUser, [e.target.name]: e.target.value });
  };
  const updUserSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ ...updUser, avatar }));
  };

  useEffect(() => {
    if (user) {
      setUpdUser({ name: user.name || "", email: user.email || "" });
      setAvatarPreview(user.avatar?.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile updated successfully");
      router.push("/profile");
      dispatch(loadUser());
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, toast, error, router, isUpdated, user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <section className="flex justify-center items-center min-h-screen w-full mt-32 mb-8">
            <div
              className={`bg-gray-200 shadow_black_1 w-full max-w-2xl rounded-lg py-6 flex justify-center items-center flex-col`}
            >
              <h1 className="text-3xl font-bold leading-none text-center mb-6 mt-3">
                Update Profile
              </h1>
              <form
                className=" "
                action="/updateProfile"
                method="post"
                onSubmit={updUserSubmit}
              >
                <div className="flex items-center flex-wrap justify-center gap-x-5">
                  <input
                    onChange={handleUpdUser}
                    value={updUser.name}
                    className="text-center outline-none bg-transparent border border_color rounded-full block size-60 px-3 py-2 mt-4"
                    type="text"
                    name="name"
                    placeholder="name"
                  />
                  <input
                    onChange={handleUpdUser}
                    value={updUser.email}
                    className="text-center outline-none bg-transparent border border_color rounded-full block size-60 px-3 py-2 mt-4"
                    type="email"
                    name="email"
                    placeholder="email"
                  />
                </div>
                <div className="flex justify-between items-center mt-4 md:mt-3 w-fit relative mx-auto">
                  <div className="size-48">
                    <Image
                      width="200"
                      height="200"
                      className="border border_color rounded-full object-cover w-full h-full"
                      src={avatarPreview}
                      alt="Profile Image"
                    />
                  </div>
                  <label
                    className="w-9 h-9 cursor-pointer absolute flex justify-center items-center bottom-0 right-0 rounded-full bg-white"
                    htmlFor="upload"
                  >
                    <i className="text-zinc-800 ri-pencil-fill text-xl animate-spin"></i>
                  </label>
                  <input
                    onChange={handleUpdUser}
                    className="opacity-0 w-[0.1px] h-[0.1px]"
                    type="file"
                    name="avatar"
                    accept="image/*"
                    id="upload"
                  />
                </div>
                <div className="mt-8 flex items-center justify-center">
                  <ButtonTextIcon
                    btnType="submit"
                    Text="Update Profile"
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

export default isAuth(UpdateProfile);
