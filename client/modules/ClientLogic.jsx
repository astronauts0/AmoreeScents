"use client";
import Preloader from "@/components/Preloader/Preloader";
import AvailOffer from "@/pages/Home/AvailOffer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ClientLogic = () => {
  const pathname = usePathname();
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    if (pathname === "/") {
      document.body.setAttribute("theme", "black");
    } else {
      document.body.setAttribute("theme", "white");
    }

    const shouldShow = !(
      pathname.startsWith("/admin") || pathname.startsWith("/password/reset")
    );

    setShowPreloader(shouldShow);

    if (shouldShow === false) {
      document.body.setAttribute("data-lenis-prevent", "");
    }
  }, [pathname]);

  return showPreloader ? (
    <>
      <Preloader />
      <AvailOffer />
    </>
  ) : null;
};

export default ClientLogic;
