"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

import HeaderButton from "../Buttons/HeaderButton";
import Link from "next/link";
import StarSvg from "@/components/svgs/StarSvg";
import WheelSvg from "@/components/svgs/WheelSvg";
import FlowerSvg from "@/components/svgs/FlowerSvg";
import PriceSvg from "@/components/svgs/PriceSvg";

import {
  ShoppingCartOutlined,
  FavoriteBorderOutlined,
  SpaceDashboardOutlined,
} from "@mui/icons-material";
import { useGSAP } from "@gsap/react";
import { useSelector } from "react-redux";
import { useTheme } from "@/hooks/useTheme";
import IconButton from "../Buttons/IconButton";
import Logout from "./Logout";

const monoBlack = "/images/svgs/mono_black.svg";
const logoTextWhite = "/images/svgs/logo_text_white.svg";
const amoreeMobile = "/images/svgs/amoree_mobile.svg";
const monoWhite = "/images/svgs/mono_white.svg";

const Header = () => {
  const sidebarRef = useRef(null);
  const timelineRef = useRef(null);
  const theme = useTheme();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(true);
  const [isPlay, setIsPlay] = useState(true);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const handleMouseMove = (e) => {
    const link = e.currentTarget;
    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    link.style.setProperty("--fill-x", `${x}px`);
    link.style.setProperty("--fill-y", `${y}px`);
  };

  const closeSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
      if (timelineRef.current) {
        timelineRef.current.reverse();
      }
    }
  };

  const handleSocials = () => {
    setIsSocialsOpen(!isSocialsOpen);
    const tl = gsap.timeline({ ease: "expo.inOut" });

    if (!isSocialsOpen) {
      tl.set(".pc_social_icons", { display: "flex" })
        .fromTo(
          ".pc_social_icons a",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: {
              each: 0.1,
              from: "center",
              amount: 0.25,
              axis: "x",
            },
            ease: "power4.out",
          }
        )
        .fromTo(
          ".pc_social_icons div",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: {
              each: 0.1,
              from: "center",
              amount: 0.25,
              axis: "x",
            },
            ease: "power4.out",
          }
        );
    } else {
      tl.to(
        ".pc_social_icons div",
        {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          stagger: {
            each: 0.1,
            from: "center",
            amount: 0.25,
            axis: "x",
          },
        },
        "sc"
      ).to(
        ".pc_social_icons a",
        {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          stagger: {
            each: 0.1,
            from: "center",
            amount: 0.25,
            axis: "x",
          },
          onComplete: () => {
            gsap.set(".pc_social_icons", { display: "none" });
          },
        },
        "sc"
      );
    }
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);

    if (!isSidebarOpen) {
      timelineRef.current = gsap
        .timeline({
          duration: 0.8,
        })
        // .to(sidebarRef.current, {
        //     height: '100vh',
        //     width: '100%',
        // })
        .to(".nav_aside_left", {
          display: "block",
          width: "100%",
          ease: "expo.inOut",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.2,
        })
        .to(
          ".nav_aside_left .logo",
          {
            opacity: 1,
            transform: "translateX(0)",
            ease: "expo.inOut",
          },
          "logo"
        )
        .to(
          ".animate_bottom",
          {
            opacity: 1,
            transform: "translateY(0)",
            stagger: 0.22,
            ease: "power2",
          },
          "logo"
        )
        .to(
          ".header__icons",
          {
            opacity: 1,
            scale: 1,
            ease: "power2",
            stagger: 0.5,
          },
          "logo"
        )
        .to(
          ".nav_aside_left .nav_btn",
          {
            opacity: 1,
            transform: "translateY(0) rotate(-30deg)",
            ease: "bounce.inOut",
          },
          "ico"
        )
        .to(
          ".anime_icons",
          {
            opacity: 1,
            stagger: 0.1,
            zIndex: 60,
            ease: "power4.inOut",
          },
          "ico"
        );
    } else if (timelineRef.current) {
      timelineRef.current.reverse();
    }
  };

  const toggleMusic = () => {
    const bgMusic = document.getElementById("soft_bg_music");

    if (!bgMusic.paused) {
      bgMusic.pause();
      setIsPlay(false);
    } else {
      bgMusic.play();
      setIsPlay(true);
    }
  };

  useGSAP((_, contextSafe) => {
    const handleMouseMove = contextSafe((e) => {
      gsap.to(".anime_icons svg", {
        ease: "power4",
        duration: 2.5,
        stagger: 0.1,
        x: gsap.utils.mapRange(0, window.innerWidth, -70, 70, e.clientX),
        y: gsap.utils.mapRange(0, window.innerHeight, -70, 70, e.clientY),
      });
    });

    sidebarRef.current.addEventListener("mousemove", handleMouseMove);

    return () =>
      sidebarRef.current?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <header>
      <nav>
        <div className="hidden md:flex fixed top-2 px-5 w-full z-40 items-center justify-between">
          <div
            className={`flex items-center backdrop-blur-3xl justify-between gap-x-6 px-6 py-1 shadow-lg border border_color rounded-full w-fit h-14`}
          >
            <Link href="/">
              <Image
                className="border-r border_color pr-5"
                priority
                src={theme == "black" ? monoWhite : monoBlack}
                alt="mono"
                width={70}
                height={70}
              />
            </Link>

            <div className="pc_social_icons flex justify-center gap-x-2.5 items-center">
              {isAuthenticated ? (
                <>
                  <Logout
                    timelineRef={timelineRef}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                  />
                  <Link href="/profile">
                    <HeaderButton
                      Icon={<i className="ri-user-line text-xl"></i>}
                    />
                  </Link>
                </>
              ) : (
                <Link href="/login">
                  <HeaderButton
                    Icon={<i className="ri-user-add-line text-xl"></i>}
                  />
                </Link>
              )}
              <Link href="/orders">
                <HeaderButton
                  Icon={<i className="ri-shopping-bag-4-line text-xl"></i>}
                />
              </Link>
              <Link className="relative" href="/cart">
                <HeaderButton
                  Icon={
                    <ShoppingCartOutlined
                      style={{ stroke: "#000", strokeWidth: "0.5" }}
                    />
                  }
                />
                <div className="cart_badge absolute top-0 right-0.5 dancing_script z-30 inline-flex items-center justify-center size-5 text-[10px] leading-none font-bold text-white bg-red-500 border border_color rounded-full">
                  {cartItems?.length}
                </div>
              </Link>
              {/* <HeaderButton Icon={<FavoriteBorderOutlined style={{ stroke: '#000', strokeWidth: '0.5' }} />} /> */}
              {user && user?.role === "admin" && (
                <Link href="/admin/dashboard">
                  <HeaderButton
                    Icon={
                      <SpaceDashboardOutlined
                        style={{ stroke: "#000", strokeWidth: "0.5" }}
                      />
                    }
                  />
                </Link>
              )}
            </div>

            <div onClick={handleSocials}>
              {isSocialsOpen ? (
                <i className="ri-close-large-line font-normal text-2xl"></i>
              ) : (
                <i className="ri-menu-4-line text-3xl font-normal"></i>
              )}
            </div>
          </div>
          <div className="flex items-center gap-x-3">
            <div
              onClick={toggleMusic}
              className="backdrop-blur-3xl rounded-full bg_music_volume"
            >
              <HeaderButton
                Icon={
                  isPlay ? (
                    <i className="ri-volume-up-line text-xl animate-spin"></i>
                  ) : (
                    <i className="ri-volume-mute-line text-xl animate-spin"></i>
                  )
                }
              />
            </div>
            <div
              onClick={handleSidebarToggle}
              className="backdrop-blur-3xl uppercase rounded-full"
            >
              <HeaderButton
                Icon={<i className="ri-menu-4-line text-3xl"></i>}
              />
            </div>
          </div>
        </div>
        <div className="w-[90%] md:hidden fixed rounded-full top-2 left-1/2 -translate-x-1/2 z-40">
          <div className={`flex items-center justify-between`}>
            <Link href="/" className="backdrop-blur-3xl rounded-full shadow-sm">
              <Image
                priority
                src={theme == "black" ? monoWhite : monoBlack}
                alt="mono"
                width={80}
                height={80}
              />
            </Link>
            <div
              className={`flex items-center backdrop-blur-3xl gap-x-3 px-3 py-1 shadow-lg border border_color rounded-full h-14`}
            >
              <div className="relative">
                <Link href="/cart">
                  <HeaderButton
                    Icon={
                      <ShoppingCartOutlined
                        style={{ stroke: "#000", strokeWidth: "0.5" }}
                      />
                    }
                  />
                </Link>
                <div className="cart_badge absolute top-0 right-0.5 dancing_script z-30 inline-flex items-center justify-center size-5 text-[10px] leading-none font-bold text-white bg-red-500 border border_color rounded-full">
                  {cartItems?.length}
                </div>
              </div>
              <div onClick={toggleMusic} className="bg_music_volume">
                <HeaderButton
                  Icon={
                    isPlay ? (
                      <i className="ri-volume-up-line text-xl animate-spin"></i>
                    ) : (
                      <i className="ri-volume-mute-line text-xl animate-spin"></i>
                    )
                  }
                />
              </div>
              <div onClick={handleSidebarToggle}>
                <i className="ri-menu-4-line text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside ref={sidebarRef} className="nav_aside">
        <div className="anime_icons relative -z-50 opacity-0">
          <div className="fixed top-4 left-1/3 z-[60]">
            <PriceSvg width="30" fill="white" />
          </div>
          <div className="fixed bottom-20 right-[25%] z-[60]">
            <StarSvg width="30" fill="white" />
          </div>
          <div className="fixed top-[25%] right-20 z-[60]">
            <WheelSvg width="30" fill="white" />
          </div>

          <div className="fixed top-4 left-4 z-[60]">
            <WheelSvg width="30" fill="white" />
          </div>
          <div className="fixed top-4 right-4 z-[60]">
            <StarSvg width="30" fill="white" />
          </div>
          <div className="fixed bottom-4 left-4 z-[60]">
            <FlowerSvg width="30" fill="white" />
          </div>
          <div className="fixed bottom-4 right-4 z-[60]">
            <PriceSvg width="30" fill="white" />
          </div>

          <div className="fixed top-1/2 right-[40%] z-[60]">
            <WheelSvg width="30" fill="white" />
          </div>
          <div className="fixed top-14 right-1/3 z-[60]">
            <FlowerSvg width="30" fill="white" />
          </div>
          <div className="fixed bottom-40 left-[40%] z-[60]">
            <PriceSvg width="30" fill="white" />
          </div>
        </div>

        <div className="nav_aside_left w-0 h-full hidden md:border-r fixed top-0 left-0 z-50 bg-[#222]">
          <div className="flex flex-col justify-center md:gap-y-6 gap-y-8 items-center w-full h-full">
            <div className="md:flex hidden justify-center items-center -translate-y-4 relative logo -translate-x-full opacity-0">
              <Image
                priority
                src={monoWhite}
                alt="logo"
                width={250}
                height={250}
              />
              <div className="relative">
                <Image
                  priority
                  src={logoTextWhite}
                  alt="logo"
                  width={250}
                  height={250}
                />
                <div
                  onClick={handleSidebarToggle}
                  className="w-24 h-10 uppercase rounded-full flex items-center justify-center gap-2 nav_btn bg-white absolute top-10 -left-10 opacity-0 -translate-y-full hover:animate-none"
                >
                  <span className="text-sm font-semibold text-black neue_machina_regular">
                    Close
                  </span>
                  <button className="bg-red-500 size-2 transition-all duration-500 rounded-full flex items-center justify-center px-1 animate-bounce hover:animate-none">
                    <i
                      className="ri-close-large-line font-normal transition-all duration-500"
                      style={{ fontSize: 0 }}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="anime_icons absolute top-[58%] left-[18%] -z-50">
                <StarSvg width="30" fill="white" />
              </div>
            </div>
            <div className="md:hidden flex justify-center items-center relative logo opacity-0">
              <div
                onClick={handleSidebarToggle}
                className="w-24 h-10 uppercase rounded-full flex items-center justify-center gap-2 nav_btn bg-white absolute -top-6 opacity-0 -translate-y-full hover:animate-none"
              >
                <span className="text-sm font-semibold text-black neue_machina_regular">
                  Close
                </span>
                <button className="bg-red-500 size-2 transition-all duration-500 rounded-full flex items-center justify-center px-1 animate-bounce hover:animate-none">
                  <i
                    className="ri-close-large-line font-normal transition-all duration-500"
                    style={{ fontSize: 0 }}
                  ></i>
                </button>
              </div>
              <Image
                priority
                src={amoreeMobile}
                alt="logo"
                width={200}
                height={200}
              />
            </div>
            <div className="header__icons opacity-0 scale-0 md:hidden flex justify-center flex-wrap gap-x-2.5 items-center">
              {isAuthenticated ? (
                <>
                  <Logout
                    timelineRef={timelineRef}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                  />
                  <Link href="/profile" onClick={closeSidebar}>
                    <IconButton
                      customize="py-2 px-3 rounded-full"
                      Icon={<i className="ri-user-line text-xl"></i>}
                    />
                  </Link>
                </>
              ) : (
                <Link href="/login" onClick={closeSidebar}>
                  <IconButton
                    customize="py-2 px-3 rounded-full"
                    Icon={<i className="ri-user-add-line text-xl"></i>}
                  />
                </Link>
              )}
              <Link href="/orders" onClick={closeSidebar}>
                <IconButton
                  customize="py-2 px-3 rounded-full"
                  Icon={<i className="ri-shopping-bag-4-line text-xl"></i>}
                />
              </Link>
              {/* <IconButton Icon={<FavoriteBorderOutlined style={{ stroke: '#000', strokeWidth: '0.5' }} />} /> */}
              {user && user?.role === "admin" && (
                <Link href="/admin/dashboard">
                  <IconButton
                    customize="py-2 px-3 rounded-full"
                    Icon={
                      <SpaceDashboardOutlined
                        style={{ stroke: "#000", strokeWidth: "0.5" }}
                      />
                    }
                  />
                </Link>
              )}
            </div>
            <div className="md:w-1/2 mx-auto w-full flex flex-col md:justify-start justify-center items-center relative">
              {["home", "shop", "about", "contact"].map((item, i) => (
                <Link
                  onMouseMove={handleMouseMove}
                  onClick={closeSidebar}
                  className="nav__menu__links animate_bottom relative text-white text-center text-4xl uppercase w-10/12 pt-2 pb-3 border border-gray-700"
                  key={i}
                  href="/"
                  // href={item === 'home' ? '/' : `/${item}`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </header>
  );
};
export default Header;
