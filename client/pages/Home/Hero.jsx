"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroVideo from "@/components/hero/HeroVideo";
import HeroOverlay from "@/components/hero/HeroOverlay";
import SplitType from "split-type";
import { useLenis } from "lenis/dist/lenis-react";
import { isBrowser, isMobile } from "@/config/Variables";
import Image from "next/image";

const Hero = () => {
  const headerRef = useRef(null);
  const videoRef = useRef(null);
  // const volumeRef = useRef(null);
  const lenis = useLenis();
  const bgMusic = isBrowser && document.getElementById("soft_bg_music");
  const bgMusicVolumeIcon =
    isBrowser && document.querySelector(".bg_music_volume i");

  useGSAP(() => {
    const heroCtx = gsap.context(() => {
      const exploreTitle = new SplitType(".ready_to_explore", {
        type: "words",
      });
      const dedicateText = new SplitType(".hero_overlay_title", {
        type: "words",
      });

      gsap.set(exploreTitle.chars, { scaleY: 0, opacity: 0 });
      gsap.set(".hero_rows", { scale: 20 });

      gsap
        .timeline({
          ease: "power2",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top top",
            end: "250%",
            scrub: 3,
            pin: true,
            onEnter: () => {
              document.body.setAttribute("theme", "black");
            },
            onEnterBack: () => {
              document.body.setAttribute("theme", "black");
            },
          },
        })
        .to(".vid_cont", { "--clip": "0%" }, "a")
        .to(".hero_rows", { scale: 1, translateY: "-33%" }, "a")
        .from(
          dedicateText.chars,
          { opacity: 0, stagger: 0.02, delay: 0.04 },
          "a"
        )
        .to(
          ".hero_row_lft",
          {
            translateX: isMobile ? "40%" : "20%",
            duration: 3,
            ease: "power4",
            stagger: 0.08,
          },
          "b"
        )
        .to(
          ".hero_row_rgt",
          {
            translateX: isMobile ? "-100%" : "-40%",
            duration: 3,
            ease: "power4",
            stagger: 0.08,
          },
          "b"
        )
        .to(".hero_main_title", { opacity: 0, duration: 0.5 }, "b")
        .to(".hero_circ", { duration: 5, scale: 20, ease: "expo.inOut" }, "c")
        .to(".ready_to_explore", { zIndex: 30 }, "c")
        .to(exploreTitle.chars, {
          opacity: 1,
          scaleY: 1,
          stagger: 0.2,
          ease: "power4",
        })
        .to(
          ".space_video_wrapper",
          {
            duration: 5,
            "--space_clip": "0%",
            ease: "expo.inOut",
          },
          "d"
        )
        .to(".space_video_wrapper video", {
          onStart: () => {
            if (videoRef.current && videoRef.current.paused)
              videoRef.current.play();
          },
        });
    }, headerRef);

    const proCtx = gsap.context(() => {
      let scrollingElement = document.querySelector(".products_wrapper");
      let pinWrapWidth = scrollingElement?.offsetWidth;

      // Main timeline for horizontal scroll
      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".featured_products",
          start: "top top",
          end: `${pinWrapWidth} bottom`,
          scrub: 2,
          pin: true,
          // markers: true,
          onEnter: () => document.body.setAttribute("theme", "cyan"),
          onEnterBack: () => document.body.setAttribute("theme", "cyan"),
        },
      });

      // Horizontal scroll animation
      t1.to(scrollingElement, {
        x: isMobile ? -pinWrapWidth - 250 : -pinWrapWidth,
        ease: "none",
      });

      // Animate each product card individually
      const proCard = gsap.utils.toArray(".featured_products .product__card");

      proCard.forEach((card) => {
        gsap.fromTo(
          card,
          {
            filter: "grayscale(100%) blur(2px)",
            // rotate: 180,
            scaleY: 0.7,
          },
          {
            filter: "grayscale(0%) blur(0px)",
            // rotate: 0,
            scaleY: 1,
            ease: "power4",
            scrollTrigger: {
              trigger: card,
              start: "top 65%",
              end: "top 45%",
              containerAnimation: t1,
              scrub: true,
              // markers: true,
            },
          }
        );
      });
    });

    return () => {
      heroCtx.revert();
      proCtx.revert();
    };
  }, []);

  const stopScroll = () => {
    lenis?.scrollTo(".space_video_wrapper video", {
      offset: 0,
      immediate: true,
    });
    if (!bgMusic?.paused) bgMusic.pause()
    lenis?.stop();
  };

  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      videoElement.onplay = () => stopScroll();
      videoElement.onended = () => {
        lenis?.start();
        lenis?.scrollTo(".featured_products", { duration: 3 });
        if (bgMusicVolumeIcon.classList.contains("ri-volume-mute-line")) {
        } else {
          bgMusic.play();
        }
      };
    }
  }, [lenis]);

  // const handleMouseMove = (e) => {
  //     if (volumeRef.current) {
  //         gsap.to(volumeRef.current, {
  //             ease: 'power4',
  //             duration: 1,
  //             x: e.clientX,
  //             y: e.clientY,
  //         });
  //     }
  // };

  // const toggleVideoMute = () => {
  //     if (videoRef.current) {
  //         const isMuted = videoRef.current.muted;
  //         videoRef.current.muted = !isMuted;

  //         const iconClass = isMuted ? 'ri-volume-up-line' : 'ri-volume-mute-line';
  //         const oldIconClass = isMuted ? 'ri-volume-mute-line' : 'ri-volume-up-line';

  //         if (volumeRef.current?.querySelector('i')) {
  //             volumeRef.current.querySelector('i').classList.remove(oldIconClass);
  //             volumeRef.current.querySelector('i').classList.add(iconClass);
  //         }
  //     }
  // };

  return (
    <section
      ref={headerRef}
      className="w-full h-screen relative overflow-hidden"
    >
      <div className="scroll_banner flex items-center w-fit absolute top-1/2 capitalize left-full transform -translate-y-1/2 z-40">
        <Image src="/images/train.png" width={180} height={180} alt="train" />
        <h1 className="bg-black rounded px-3 text-7xl font-bold whitespace-nowrap text-center">
          Scroll to View & get discount
        </h1>
      </div>
      <HeroVideo />
      <div className="absolute sm:bottom-10 bottom-7 satoshi_medium z-30 left-10 hero_main_title">
        We create timeless fragrances. <br /> Perfumes. Scents. Memories. <br />{" "}
        For real people, real <br /> moments.
      </div>

      <HeroOverlay />
      <div className="hero_circ bg-white size-40 rounded-full -z-10 scale-0 absolute -left-20 -top-20" />

      <h1 className="ready_to_explore text-[25vw] leading-[25vw] sm:text-[20vw] sm:leading-[20vw] tracking-tighter font-bold w-full text-center space_text_stroke absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Ready <div className="dancing_script">To</div>{" "}
        <div className="neue_machina_regular">Explore?</div>
      </h1>

      <div
        style={{ "--space_clip": "100%" }}
        className="space_video_wrapper transform will-change-transform origin-center scale-1 w-full h-screen absolute top-0 left-0 cursor-none z-[100]"
      >
        <video
          ref={videoRef}
          className="space_video w-full min-h-screen aspect-video object-cover object-center"
          src="/videos/space_particles_4k.mp4"
        ></video>
      </div>
      {/* <div ref={volumeRef} className="absolute z-50 space_video_volume opacity-0 scale-0 rotate-0 flex justify-center items-center size-9 top-0 left-0 bg-[#00401A]">
                    <i className="ri-volume-mute-line text-white text-xl"></i>
                </div> */}
    </section>
  );
};

export default Hero;
