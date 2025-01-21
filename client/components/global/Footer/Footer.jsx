"use client";
import React from "react";
import ButtonTextIcon from "../Buttons/ButtonTextIcon";
import Image from "next/image";
import { ButtonsIconData } from "@/config/Buttons";
import Link from "next/link";
import HeaderButton from "../Buttons/HeaderButton";
import { HeartBrokenOutlined } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="footer w-full min-h-screen h-fit relative px-8 pt-7 overflow-hidden darker_grotesque font-semibold border-t border_color mt-8">
      <div className="flex items-start justify-between w-full capitalize py-5">
        <ul className="space-y-3">
          {["home", "shop", "about", "contact"].map((item, index) => (
            <li key={index} className="text-xl">
              <Link href="/">{item}</Link>
              {/* // href={item === 'home' ? '/' : `/${item}`} */}
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <ul className="space-y-1 border_color border-b pb-3">
            <li>
              {" "}
              <span className="font-semibold">Address:</span> Raiwind Road, Sher
              Shah, Lahore, Pakistan
            </li>
            <li>
              <span className="font-semibold">WhatsApp Us:</span>{" "}
              <span className="obviously">
                {process.env.NEXT_PUBLIC_MOBILE_FOR_QUERIES}
              </span>
            </li>
            <li>
              <span className="font-semibold">Customer Support:</span>
              <a
                href="mailto:amoréescents@gmail.com"
                className="lowercase text-blue-500 hover:underline"
              >
                {" "}
                amoréescents@gmail.com
              </a>
            </li>
          </ul>
          <p className="text-2xl pb-5 pt-3 font_neuemachina font-semibold">
            Join our mailing list for the latest updates.
          </p>
          <div className="flex items-center gap-6">
            <input
              className="py-4 px-4  border border_color w-64 outline-none bg-transparent"
              type="text"
              placeholder="Enter your email address..."
            />
            <ButtonTextIcon
              Text="Subscribe"
              customize="px-4 py-2 hover:rounded-full"
              Icon={<i className="ri-send-plane-fill"></i>}
            />
          </div>
        </div>

        <ul className="space-y-3">
          <li className="text-xl">
            <Link href="/policies/return-policy">Return Policy</Link>
          </li>
          <li className="text-xl">
            <Link href="/policies/refund-policy">Refund Policy</Link>
          </li>
          <li className="text-xl">
            <Link href="/policies/shipping-policy">Shipping Policy</Link>
          </li>
        </ul>
      </div>

      <div className="md:hidden block mt-8">
        <ul className="space-y-1 border_color border-b pb-3">
          <li>
            {" "}
            <span className="font-semibold">Address:</span> Raiwind Road, Sher
            Shah, Lahore, Pakistan
          </li>
          <li>
            <span className="font-semibold">WhatsApp Us:</span>{" "}
            <span className="obviously">
              {process.env.NEXT_PUBLIC_MOBILE_FOR_QUERIES}
            </span>
          </li>
          <li>
            <span className="font-semibold">Customer Support:</span>
            <a
              href="mailto:amoréescents@gmail.com"
              className="lowercase text-blue-500 hover:underline"
            >
              {" "}
              amoréescents@gmail.com
            </a>
          </li>
        </ul>
        <p className="text-2xl pb-5 pt-3 font_neuemachina font-semibold">
          Join our mailing list for the latest updates.
        </p>
        <div className="flex flex-col items-center gap-3">
          <input
            className="py-4 px-4  border border_color w-64 outline-none bg-transparent"
            type="text"
            placeholder="Enter your email address..."
          />
          <ButtonTextIcon
            Text="Subscribe"
            customize="px-4 py-2 hover:rounded-full"
            Icon={<i className="ri-send-plane-fill"></i>}
          />
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="f_logo pt-8 translate-y-8 md:translate-y-6 flex justify-center">
          <Image
            priority
            src={"/images/svgs/footer_logo_black.svg"}
            width={1150}
            height={1000}
            alt="logo"
          />
        </div>
      </div>

      <div className="md:absolute left-0 bottom-0 w-full bg-white">
        <div className="flex flex-col md:flex-row md:justify-between justify-center items-center md: border-t-2 border_color md:py-5 py-2 md:px-8">
          <div className="copyright_text md:my-0 mt-8 mb-4 text-center md:text-left">
            © {new Date().getFullYear()} Amorée. All rights reserved.
            <HeartBrokenOutlined style={{ color: "red" }} /> & made by
            <a
              target="_blank"
              href="https://developortayyab.web.app/"
              className="dancing_script underline text-indigo-600 text-xl"
            >
              Tayyab
            </a>
          </div>
          <div className="flex items-center gap-x-3 pb-4">
            {ButtonsIconData.map((item, i) => (
              <Link href={item.iconLink} key={i}>
                <HeaderButton customize="" Icon={item.icon} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
