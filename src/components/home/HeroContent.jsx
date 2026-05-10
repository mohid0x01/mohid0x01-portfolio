import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import SVGComponent from "./SVGComponent";
import { HiArrowLongDown } from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger);

const HeroContent = () => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const textContentRef = useRef(null);
  const footerRef = useRef(null);

  useGSAP(
    () => {
      const xTo = gsap.quickSetter(imgRef.current, "x", "px");
      const yTo = gsap.quickSetter(imgRef.current, "y", "px");

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } =
          containerRef.current.getBoundingClientRect();

        const xPos = (clientX - left - width / 2) / 20;
        const yPos = (clientY - top - height / 2) / 20;

        xTo(xPos);
        yTo(yPos);
      };

      window.addEventListener("mousemove", handleMouseMove);

      const paths = gsap.utils.toArray(imgRef.current.querySelectorAll("path"));
      const sortedPaths = paths.sort((a, b) => a.getBBox().x - b.getBBox().x);

      const introTl = gsap.timeline();
      introTl
        .from(sortedPaths, {
          y: -160,
          opacity: 0,
          duration: 1.2,
          stagger: 0.04,
          ease: "power4.out",
        })
        .from(
          textContentRef.current.children,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          footerRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4",
        );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      scrollTl.to([imgRef.current, textContentRef.current, footerRef.current], {
        y: -120,
        scale: 0.9,
        opacity: 0,
        filter: "blur(15px)",
        stagger: 0.05,
        ease: "none",
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative h-dvh w-full px-6 pt-10 pb-32 py-0 lg:py-10 flex flex-col justify-between overflow-hidden"
    >
      <div>
        <div
          ref={imgRef}
          className="w-full text-accent mb-6 will-change-transform"
        >
          <SVGComponent />
        </div>
        <div ref={textContentRef} className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            ReactJS Developer
          </h1>
          <h2 className="text-lg md:text-xl opacity-80">
            Based in Sukkur, Pakistan
          </h2>
        </div>
      </div>

      <div
        ref={footerRef}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-t border-accent/10 pt-6 gap-4"
      >
        <div className="group flex items-center gap-4 cursor-pointer">
          <div className="relative w-14 h-14 border border-accent/20 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 shadow-lg">
            <div className="absolute inset-0 bg-accent translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            <div className="relative z-10 text-accent group-hover:text-white transition-colors duration-500">
              <HiArrowLongDown className="text-2xl animate-bounce" />
            </div>
          </div>
          <p className="text-[10px] sm:text-sm uppercase tracking-widest text-left leading-tight opacity-70 group-hover:opacity-100 transition-opacity">
            Scroll to <br />
            <span className="text-accent font-bold">explore</span>
          </p>
        </div>
        <p className="text-[10px] sm:text-sm opacity-50 max-w-40 sm:max-w-60 text-left sm:text-right uppercase tracking-wider">
          Building digital experiences <br className="hidden sm:block" /> with
          precision and grit.
        </p>
      </div>
    </section>
  );
};

export default HeroContent;
