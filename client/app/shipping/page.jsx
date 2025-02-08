"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Country, State } from "country-state-city";
import { saveShippingInfo } from "@/store/actions/cartAction";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import MetaData from "@/utils/Meta/MetaData";
import CheckoutStep from "@/components/order/CheckoutStep";
import ButtonTextIcon from "@/components/global/Buttons/ButtonTextIcon";
import isAuth from "@/Auth/isAuth";

const Shipping = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [shippingData, setShippingData] = useState({
    address: shippingInfo?.address || "",
    city: shippingInfo?.city || "",
    state: shippingInfo?.state || "",
    country: shippingInfo?.country || "",
    pinCode: shippingInfo?.pinCode || "",
    phoneNo: shippingInfo?.phoneNo || "",
  });

  const handleShipping = (e) =>
    setShippingData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (shippingData.phoneNo.length < 9) {
      toast.error("Phone Number should be 9 digits long or more");
      return;
    }

    dispatch(saveShippingInfo({ ...shippingData }));

    router.push("/order/confirm");
  };

  return (
    <section className="flex flex-col min-h-screen w-full justify-center items-center mt-32 mb-10">
      <MetaData title="Shipping Details" />
      <CheckoutStep activeStep={0} />
      <div
        className={`bg-gray-200 shadow_black_1 w-fit rounded-lg p-6 flex justify-center items-center flex-col md:w-[75vw] mx-auto`}
      >
        <h1 className="text-3xl font-bold leading-none text-center mt-5">
          Shipping Details
        </h1>
        <small className="leading-none text-center mt-2 mb-5 neue_machina_regular">
          Shipping info will save for next order
        </small>
        <form action="/shippingInfo" method="post" onSubmit={shippingSubmit}>
          <div className="flex justify-center items-center gap-x-6 flex-wrap">
            <input
              required
              onChange={handleShipping}
              value={shippingData.phoneNo}
              className="text-center outline-none bg-transparent border border_color rounded-full block size-60 px-3 py-2 mt-4"
              type="number"
              name="phoneNo"
              placeholder="Phone No. *"
            />
            <input
              required
              onChange={handleShipping}
              value={shippingData.address}
              className="text-center outline-none bg-transparent border border_color rounded-full block size-60 px-3 py-2 mt-4"
              type="text"
              name="address"
              placeholder="Full Address *"
            />
            <input
              required
              onChange={handleShipping}
              value={shippingData.pinCode}
              className="text-center outline-none bg-transparent border border_color rounded-full block size-60 px-3 py-2 mt-4"
              type="text"
              name="pinCode"
              placeholder="postal Code *"
            />
            <select
              required
              onChange={handleShipping}
              value={shippingData.country}
              name="country"
              id="country"
              className="text-center outline-none bg-transparent border border_color rounded-full block size-60 px-3 py-2 mt-4"
            >
              <option selected disabled>
                Country *
              </option>
              {Country &&
                Country.getAllCountries().map((val) => (
                  <option key={val.isoCode} value={val.isoCode}>
                    {val.name}
                  </option>
                ))}
            </select>

            {shippingData.country && (
              <select
                required
                onChange={handleShipping}
                value={shippingData.state}
                name="state"
                id="state"
                className="text-center outline-none bg-transparent border border_color rounded-full block size-60 px-3 py-2 mt-4"
              >
                <option selected disabled>
                  State *
                </option>
                {State &&
                  State.getStatesOfCountry(shippingData.country).map((val) => (
                    <option key={val.isoCode} value={val.isoCode}>
                      {val.name}
                    </option>
                  ))}
              </select>
            )}
            <input
              required
              onChange={handleShipping}
              value={shippingData.city}
              className="text-center outline-none bg-transparent border border_color rounded-full block size-60 px-3 py-2 mt-4"
              type="text"
              name="city"
              placeholder="city *"
            />
          </div>
          {/* <input className="block w-full px-3 py-2 mt-6 bg-red-500 text-white rounded-full" type="submit" value="Continue" disabled={shippingData.state ? false : true} /> */}
          <div className="mt-10">
            <ButtonTextIcon
              disabled={shippingData ? false : true}
              btnType="submit"
              Text="Continue"
              customize="px-4 py-2 transition-all duration-1000 md:w-[60%] w-full mx-auto"
              Icon={<i className="ri-arrow-right-line"></i>}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default isAuth(Shipping);
