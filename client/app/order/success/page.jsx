"use client";
import React from "react";
import Link from "next/link";
import MetaData from "@/utils/Meta/MetaData";
import ButtonTextIcon from "@/components/global/Buttons/ButtonTextIcon";
import isAuth from "@/Auth/isAuth";
import dynamic from "next/dynamic";
const ConfettiRain = dynamic(() => import("@/utils/confetti/ConfettiRain"), {
  ssr: false,
});
const Balloons = dynamic(() => import("@/components/balloons/Balloons"), {
  ssr: false,
});

const OrderSuccess = () => {
  
  return (
    <section className="overflow-hidden">
      <MetaData title="Order Success" />
      <ConfettiRain />
      <section className="h-screen relative overflow-hidden flex items-center justify-center flex-col">
        <Balloons />
        <div
          className={`bg-gray-200 shadow_black_1 w-full max-w-md rounded-lg p-6 flex justify-center items-center flex-col space-y-5`}
        >
          <div className="w-24 h-24 rounded-full bg-[#F8FAF5] flex justify-center items-center">
            <i className="dancing_script text-[#9ABC66] text-5xl">✓</i>
          </div>
          <h1 className="text-3xl text-[#9ABC66]">Success</h1>
          <p className="neue_machina_regular text-center">
            We received your purchase request;
            <br /> we'll be in touch shortly!
          </p>
          <p className="text-xl dancing_script">
            Or you can play a game to pop the balloons
          </p>
          <Link href="/orders">
            <ButtonTextIcon
              Text="Go to Orders"
              customize="px-4 py-2 transition-all duration-1000 hover:rounded-full"
              Icon={<i className="ri-shopping-bag-4-line text-xl"></i>}
            />
          </Link>
        </div>
      </section>
    </section>
  );
};

export default isAuth(OrderSuccess);
