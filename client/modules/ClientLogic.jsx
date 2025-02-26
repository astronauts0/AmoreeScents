"use client";
import AvailOffer from "@/pages/Home/AvailOffer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ClientLogic = () => {
  const pathname = usePathname();
  const [showInitialRender, setShowInitialRender] = useState(false);

  useEffect(() => {
    if (pathname === "/") {
      document.body.setAttribute("theme", "black");
    } else {
      document.body.setAttribute("theme", "white");
    }

    const shouldShow = !(
      pathname.startsWith("/admin") || pathname.startsWith("/password/reset")
    );

    setShowInitialRender(shouldShow);

    if (shouldShow === false) {
      document.body.setAttribute("data-lenis-prevent", "");
    }
  }, [pathname]);

  return showInitialRender ? <AvailOffer /> : null;
};

export default ClientLogic;
