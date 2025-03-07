"use client";
import AvailOffer from "@/pages/Home/AvailOffer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ClientLogic = () => {
  const pathname = usePathname();
  console.log("🚀 ~ ClientLogic ~ pathname:", pathname);
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

  return showInitialRender ? <AvailOffer /> : null;
};

export default ClientLogic;
