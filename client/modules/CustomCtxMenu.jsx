"use client";
import { isBrowser } from "@/config/Variables";
import React, { useEffect } from "react";

const CustomCtxMenu = () => {
  useEffect(() => {
    if (isBrowser) {
      // console.clear();
      console.log(
        "%cWARNING! Don't Paste Anything In Console!😊😘",
        "color: red; font-size: 2.3rem; font-weight: bold"
      );
      console.log(
        "%cHackers may have steel your information.😒😢",
        "color: pink; font-size: 1.4rem; font-weight: bold"
      );
      console.log(
        "%cStay save from them.🤞✌",
        "color: skyblue; font-size: 1rem; font-weight: bold"
      );

      window.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });
    }
  }, []);

  return null;
};

export default CustomCtxMenu;
