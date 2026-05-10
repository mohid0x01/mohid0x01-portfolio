import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { HiArrowLongDown } from "react-icons/hi2";

const AboutHero = () => {
  const containerRef = useRef();
  const headlineRef = useRef();
  const subTextRef = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(containerRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
      })
        .from(
          ".char",
          {
            y: 100,
            opacity: 0,
            stagger: 0.03,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.5",
        )
        .from(
          subTextRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8",
        );

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 2;
        const yPos = (clientY / window.innerHeight - 0.5) * 2;

        gsap.to(headlineRef.current, {
          rotateX: yPos * -10,
          rotateY: xPos * 10,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(".persona-bg-text", {
          x: xPos * -30,
          y: yPos * -20,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: containerRef },
  );

  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative h-dvh w-full flex flex-col justify-center items-center overflow-hidden px-6 py-20 text-main-text"
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-30 select-none px-6">
        <h2 className="persona-bg-text text-accent text-5xl md:text-9xl font-black uppercase tracking-tighter leading-none text-center">
          ReactJS Developer // Frontend Developer
        </h2>
      </div>

      <div
        className="relative z-10 text-center max-w-7xl mx-auto"
        ref={headlineRef}
      >
        <h1 className="text-5xl md:text-[12vw] font-black uppercase tracking-tighter leading-[0.8] perspective:[1000px]">
          {splitText("The Mind")}
          <br />
          <span className="text-main-text italic">{splitText("Behind")}</span>
          <br />
          {splitText("The Code")}
        </h1>
      </div>

      <div className="w-full px-6 flex  justify-end items-end gap-10 z-20">
        <div className="group flex items-center gap-4 cursor-pointer">
          <p className="text-[10px] sm:text-sm uppercase tracking-widest text-right leading-tight opacity-70 group-hover:opacity-100 transition-opacity">
            Scroll to <br />
            <span className="text-accent font-bold">explore</span>
          </p>
          <div className="relative w-14 h-14 border border-accent/20 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 shadow-lg">
            <div className="absolute inset-0 bg-accent translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            <div className="relative z-10 text-accent group-hover:text-white transition-colors duration-500">
              <HiArrowLongDown className="text-2xl animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
