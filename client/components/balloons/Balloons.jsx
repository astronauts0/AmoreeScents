"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Balloons = () => {
  const svgRef = useRef(null);
  const behindSvgRef = useRef(null);

  useGSAP(() => {
    const size = { width: 0, height: 0 };

    const onResize = () => {
      size.width = window.innerWidth;
      size.height = window.innerHeight;
    };

    const getColor = () => {
      return `hsl(${360 * Math.random()}, ${100 + 70 * Math.random()}%, ${
        70 + 0 * Math.random()
      }%)`;
    };

    const createBalloon = () => {
      const useEl = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "use"
      );
      useEl.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        "#balloon"
      );
      useEl.setAttribute("style", `--ballon_color_404:${getColor()}`);
      useEl.setAttribute("class", "balloon");
      return useEl;
    };

    const popBalloon = (colorSettings, x, y, isBehind) => {
      const pop = document.createElementNS("http://www.w3.org/2000/svg", "use");
      pop.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#pop");
      pop.setAttribute("style", colorSettings);
      pop.setAttribute("class", "pop");

      const container = isBehind ? behindSvgRef?.current : svgRef?.current;
      container?.appendChild(pop);

      gsap.set(pop, {
        scale: 0.5,
        x,
        y,
        rotation: Math.random() * 360,
        transformOrigin: "center",
      });
      gsap.to(pop, {
        duration: 0.2,
        scale: 3,
        opacity: 0,
        ease: "power3.out",
        onComplete: () => container?.removeChild(pop),
      });

      for (let i = 0; i <= 20; i++) {
        const confetti = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "use"
        );
        confetti.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          `#confetti_${Math.ceil(Math.random() * 2)}`
        );
        confetti.setAttribute("style", `--ballon_color_404: ${getColor()}`);
        confetti.setAttribute("class", "confetti");

        container?.appendChild(confetti);

        const randomPos = {
          x: Math.random() * 500 - 250,
          y: Math.random() * 500 - 250,
        };
        gsap.set(confetti, {
          x,
          y,
          rotation: Math.random() * 360,
          transformOrigin: "center",
        });
        gsap.to(confetti, {
          duration: 1.5,
          scale: Math.random(),
          motionPath: {
            curviness: 2,
            path: [
              { x: x + randomPos.x, y: y + randomPos.y },
              {
                x: x + randomPos.x + Math.random() * 20 - 10,
                y: y + randomPos.y + Math.random() * 200,
              },
            ],
          },
          opacity: 0,
          rotation: Math.random() * 360 - 180,
          ease: "power4.out",
          onComplete: () => container?.removeChild(confetti),
        });
      }
    };

    const animateBalloon = (balloon, isBehind = false) => {
      gsap.set(balloon, {
        x: size.width / 2,
        y: size.height + 20,
        transformOrigin: "center",
        scale: isBehind ? 1 : 1.5,
        alpha: 0.95,
        rotation: Math.random() * 180 - 90,
      });

      const centerPos = {
        x: size.width / 4 + Math.random() * (size.width / 2),
        y: size.height / 2,
      };

      const endPos = {
        x: centerPos.x + Math.random() * 200 - 100,
        y: Math.random() * 50,
      };

      gsap.to(balloon, {
        duration: 5 + Math.random(),
        motionPath: {
          curviness: 1.5,
          path: [centerPos, endPos],
        },
        scale: isBehind ? 0.5 : 1,
        rotation: 0,
        ease: "power1.in",
        onComplete: () => onClick(endPos.x, endPos.y, balloon, isBehind),
      });

      balloon.addEventListener("click", (e) => {
        onClick(e.clientX, e.clientY, balloon, isBehind);
      });
    };

    const onClick = (x, y, balloon, isBehind) => {
      gsap.killTweensOf(balloon);
      const colorSettings = balloon.getAttribute("style");
      isBehind
        ? behindSvgRef?.current?.removeChild(balloon)
        : svgRef?.current?.removeChild(balloon);
      popBalloon(colorSettings, x, y, isBehind);
    };

    let balloonGenerator = setInterval(() => {
      if (!document.hidden) {
        const newBalloon = createBalloon();
        const isBehind = Math.random() > 0.5 ? true : false;
        if (isBehind) behindSvgRef?.current?.appendChild(newBalloon);
        else svgRef?.current?.appendChild(newBalloon);
        animateBalloon(newBalloon, isBehind);
      }
    }, 500);

    onResize();
    window.addEventListener("resize", () => onResize());

    return () => {
      window.removeEventListener("resize", onResize);
      clearInterval(balloonGenerator);
    };
  }, []);

  return (
    <section className="overflow-hidden">
      <svg
        width="1"
        height="1"
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="z-30 absolute top-0 left-0 overflow-visible cursor-pointer"
      >
        <defs>
          <g id="balloon">
            <path
              className="ballon_color_404"
              d="M30.32,85.27l2.6-3.67,2.18,3.67a3.09,3.09,0,0,1-2.39,1A2.63,2.63,0,0,1,30.32,85.27Z"
            />
            <path
              d="M30.32,85.27l2.6-3.67,2.18,3.67a3.09,3.09,0,0,1-2.39,1A2.63,2.63,0,0,1,30.32,85.27Z"
              style={{ opacity: 0.3, fill: "url(#linear-gradient)" }}
            />
            <ellipse
              className="ballon_color_404"
              cx="32.92"
              cy="41.72"
              rx="32.92"
              ry="41.72"
            />
            <ellipse
              cx="50.5"
              cy="20.4"
              rx="5.23"
              ry="13.48"
              transform="translate(-3 30.59) rotate(-32.78)"
              style={{ fill: "#fff", opacity: 0.4 }}
            />
          </g>
          <g id="pop">
            <path
              className="ballon_color_404"
              d="M10.4,1.06s23.25-3.73,31.65,2.8S52,21,52,21s-3.73-11-9.33-10.5-11.47,4.89-11.47,4.89,5.65-11.52,0-11.52-16.55.63-16.55.63Z"
            />
            <path
              className="ballon_color_404"
              d="M31.21,29.08s13,4.36,15.51,0,6.85,0,6.85,0L45.79,46.51S34.84,44.57,33,36.83Z"
            />
            <path
              className="ballon_color_404"
              d="M14.86,6.71l-4,15.14,5.3,3.83s-5.85,3.84-1.43,7.81,13,3.27,13,3.27S-.89,43.33,0,30.93,14.86,6.71,14.86,6.71Z"
            />
          </g>
          <g id="confetti_1">
            <polygon
              className="ballon_color_404"
              points="0 6.23 12.76 0 17.43 6.23 9.96 16.81 0 6.23"
            />
          </g>
          <g id="confetti_2">
            <path
              className="ballon_color_404"
              d="M11.59,15.75a7.1,7.1,0,0,1-5.32-2.28,8.26,8.26,0,0,1-2.09-4.4A38.65,38.65,0,0,1,1.12,6.31,13.72,13.72,0,0,0,0,5.26l.1,0L1.26,2.54a7.49,7.49,0,0,1,2,1.63c.39.38.84.82,1.33,1.28a9.7,9.7,0,0,1,7-5.36c1.86-.32,3.32.23,4,1.48.77,1.45,2,4.24,1.17,6.68a4.92,4.92,0,0,1-2.6,2.93,7.21,7.21,0,0,1-5.55.35,4.19,4.19,0,0,0,3.5,1.2c3.31-.29,6.62-1.59,6.11-9l3-.2c.52,7.54-2.45,11.64-8.83,12.21ZM7.11,7.5c1.8,1.19,3.81,1.91,5.67,1a2,2,0,0,0,1.08-1.15,6.26,6.26,0,0,0-.93-4.29,3.77,3.77,0,0,0-2.38.48c-1.4.65-3.13,2-3.41,3.75Z"
            />
          </g>
          <g id="confetti_2">
            <polygon
              className="ballon_color_404"
              points="0 21.79 10.53 0 15.2 2.18 4.93 25.21 0 21.79"
            />
          </g>
        </defs>
      </svg>
      <svg ref={behindSvgRef} width="1" height="1" className="z-30"></svg>
    </section>
  );
};

export default Balloons;
