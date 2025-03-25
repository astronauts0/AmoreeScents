"use client";
import Preloader from "@/components/Preloader/Preloader";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ClientLogic = () => {
  const pathname = usePathname();
  const [showInitialRender, setShowInitialRender] = useState(false);

  const paths = [
    "/admin",
    "/password/reset",
    "/shipping",
    "/order/confirm",
  ];

  useEffect(() => {
    
    if (pathname === "/") document.body.setAttribute("theme", "black");
    else document.body.setAttribute("theme", "white");

    const shouldShow = !paths.find((path) => pathname.startsWith(path));

    setShowInitialRender(shouldShow);

    if (shouldShow === false)
      document.body.setAttribute("data-lenis-prevent", "");
  }, [pathname]);

  return showInitialRender ? <Preloader /> : null;
};

export default ClientLogic;
