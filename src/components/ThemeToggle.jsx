import React, { useRef } from "react";
import { useDarkMode } from "../hooks/useDarkMode";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SoundButton from "./SoundButton";

gsap.registerPlugin(useGSAP);

export default function ThemeToggle() {
  const [theme, setTheme] = useDarkMode();
  const container = useRef(null);
  const toggleBgRef = useRef(null);
  const sunRef = useRef(null);
  const moonRef = useRef(null);
  const cloudRef = useRef(null);
  const isDark = theme === "dark";
  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  useGSAP(
    (context) => {
      if (!context.data.initialized) {
        if (isDark) {
          gsap.set(sunRef.current, { x: -157, opacity: 0 });
          gsap.set(moonRef.current, { x: -157, opacity: 1 });
          gsap.set(cloudRef.current, { opacity: 0 });
          gsap.set(".star", { opacity: 1, x: 35, y: -5 });
          gsap.set(toggleBgRef.current, {
            backgroundColor: "#224f6d",
            borderColor: "#cad4d8",
          });
        } else {
          gsap.set(sunRef.current, { x: 15, opacity: 1 });
          gsap.set(moonRef.current, { x: 35, opacity: 0 });
          gsap.set(cloudRef.current, { opacity: 1, x: 15 });
          gsap.set(".star", { opacity: 0, x: 35, y: -5 });
          gsap.set(toggleBgRef.current, {
            backgroundColor: "#9cd6ef",
            borderColor: "#65c0e7",
          });
        }
        context.data.initialized = true;
        return;
      }
      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: "power2.inOut" },
      });

      if (isDark) {
        tl.to(sunRef.current, { x: -157, opacity: 0 }, 0)
          .to(moonRef.current, { x: -157, rotate: -360, opacity: 1 }, 0)
          .to(cloudRef.current, { opacity: 0, duration: 0.4 }, 0)
          .to(".star", { opacity: 1, stagger: 0.05 }, 0.2)
          .to(
            toggleBgRef.current,
            { backgroundColor: "#224f6d", borderColor: "#cad4d8" },
            0,
          );
      } else {
        tl.to(sunRef.current, { x: 15, opacity: 1 }, 0)
          .to(moonRef.current, { x: 35, rotate: 360, opacity: 0 }, 0)
          .to(cloudRef.current, { opacity: 1, x: 15 }, 0)
          .to(".star", { opacity: 0 }, 0)
          .to(
            toggleBgRef.current,
            { backgroundColor: "#9cd6ef", borderColor: "#65c0e7" },
            0,
          );
      }
    },
    { dependencies: [isDark], scope: container },
  );

  return (
    <SoundButton
      onClick={handleToggle}
      aria-label="Toggle Dark Mode"
      aria-pressed={isDark}
      className="focus:outline-none"
    >
      <div
        ref={container}
        className="relative flex items-center justify-center h-12 w-24 overflow-hidden rounded-full transition-transform active:scale-90"
      >
        <div
          ref={toggleBgRef}
          className="absolute inset-0 w-full h-full rounded-full border-2 pointer-events-none"
        />
        <svg
          className="relative z-20 pointer-events-none"
          width="80px"
          height="32px"
          viewBox="0 0 369 171.667"
        >
          <g id="stars">
            <polygon
              className="star"
              fill="#A2B5BF"
              points="166.253,132.982 164.364,135.676 160.983,136.488 163.196,138.965 162.996,142.16 166.253,140.998 169.509,142.16 169.309,138.965 171.522,136.488 168.142,135.676"
            />
            <polygon
              className="star"
              fill="#A2B5BF"
              points="175.522,44.243 172.684,48.29 167.603,49.51 170.929,53.233 170.628,58.035 175.522,56.288 180.417,58.035 180.116,53.233 183.442,49.51 178.361,48.29"
            />
            <polygon
              className="star"
              fill="#A2B5BF"
              points="208.22,91.845 206.083,94.891 202.259,95.81 204.763,98.61 204.535,102.226 208.22,100.911 211.903,102.226 211.677,98.61 214.181,95.81 210.356,94.891"
            />
            <polygon
              className="star"
              fill="#A2B5BF"
              points="252.545,39.052 250.409,42.098 246.585,43.017 249.089,45.819 248.86,49.433 252.545,48.118 256.229,49.433 256.002,45.819 258.506,43.017 254.682,42.098"
            />
            <polygon
              className="star"
              fill="#A2B5BF"
              points="280.151,84.949 282.749,88.997 287.401,90.217 284.355,93.94 284.632,98.742 280.151,96.995 275.669,98.742 275.946,93.94 272.899,90.217 277.552,88.997"
            />
            <polygon
              className="star"
              fill="#A2B5BF"
              points="249.791,124.466 246.668,128.919 241.076,130.261 244.737,134.356 244.405,139.64 249.791,137.718 255.178,139.64 254.845,134.356 258.506,130.261 252.914,128.919"
            />
          </g>
          <g ref={moonRef} id="moon">
            <path
              fill="#CAD9DD"
              d="M255.662,153.639c-18.114,0-35.144-7.055-47.952-19.863c-12.808-12.807-19.861-29.837-19.861-47.951s7.054-35.144,19.861-47.951c12.809-12.809,29.838-19.862,47.952-19.862s35.144,7.054,47.951,19.862c12.809,12.808,19.862,29.838,19.862,47.951s-7.054,35.144-19.862,47.951C290.806,146.584,273.776,153.639,255.662,153.639z"
            />

            <path
              fill="#A2B5BF"
              d="M255.662,21.672c35.431,0,62.713,28.731,62.713,64.162c0,35.431-27.282,62.167-62.713,62.167s-64.153-26.744-64.153-62.175C191.509,50.394,220.231,21.672,255.662,21.672 M255.662,14.35c-9.646,0-19.007,1.891-27.823,5.62c-8.512,3.6-16.155,8.753-22.717,15.315c-6.563,6.562-11.715,14.204-15.314,22.717c-3.729,8.816-5.62,18.178-5.62,27.823s1.891,19.007,5.62,27.824c3.6,8.512,8.752,16.154,15.314,22.717c6.562,6.561,14.205,11.713,22.717,15.314c8.816,3.729,18.178,5.619,27.823,5.619s19.007-1.891,27.823-5.619c8.512-3.602,16.154-8.754,22.717-15.314c6.562-6.563,11.714-14.205,15.314-22.717c3.729-8.816,5.619-18.178,5.619-27.824s-1.891-19.007-5.619-27.823c-3.601-8.513-8.753-16.155-15.314-22.717c-6.563-6.562-14.205-11.715-22.717-15.315C274.669,16.241,265.308,14.35,255.662,14.35L255.662,14.35z"
            />
            <circle fill="#A2B5BF" cx="262.446" cy="126.115" r="14.346" />
            <circle fill="#A2B5BF" cx="239.621" cy="65.064" r="9.908" />
          </g>
          <g ref={sunRef} id="sun">
            <path
              fill="#F4E962"
              d="M255.661,153.638c-18.113,0-35.144-7.054-47.951-19.862c-12.809-12.808-19.862-29.838-19.862-47.951s7.054-35.144,19.862-47.951c12.808-12.809,29.838-19.862,47.951-19.862c18.114,0,35.144,7.054,47.952,19.862c12.808,12.808,19.861,29.838,19.861,47.951s-7.054,35.144-19.861,47.951C290.805,146.584,273.775,153.638,255.661,153.638z"
            />
          </g>
          <path
            ref={cloudRef}
            id="cloud"
            fill="#ECF0F1"
            stroke="#CAD4D8"
            strokeWidth="6"
            d="M153.269,109.614h2.813c-1.348-2.84-2.124-6.003-2.124-9.354c0-12.083,9.794-21.878,21.877-21.878c7.872,0,14.751,4.172,18.605,10.411c2.121-1.246,4.583-1.974,7.221-1.974c7.889,0,14.285,6.396,14.285,14.285c0,2.1-0.465,4.087-1.277,5.882h6.354c6.604,0,12.007,5.403,12.007,12.007s-5.403,12.006-12.007,12.006h-25.151H179.48h-26.212c-5.881,0-10.692-4.812-10.692-10.692S147.388,109.614,153.269,109.614z"
          />
        </svg>
      </div>
    </SoundButton>
  );
}
