import React from "react";
import { toast } from "react-toastify";
import { logout } from "@/store/actions/userAction";
import ButtonTextIcon from "../Buttons/ButtonTextIcon";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const Logout = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfully");
    if (props?.isSidebarOpen) {
      props?.setIsSidebarOpen(false);
      if (props?.timelineRef.current) {
        props?.timelineRef.current.reverse();
      }
    }
    router.replace("/login");
  };

  return (
    <div onClick={handleLogout}>
      <ButtonTextIcon
        Icon={<i className="ri-logout-box-line"></i>}
        Text="Logout"
        customize="px-3 py-1 text-sm transition-all duration-1000 hover:rounded-none rounded-full"
      />
    </div>
  );
};

export default Logout;
