import React, { useRef } from "react";
import { useSoundEffects } from "../../hooks/useSoundEffects";
import { HiArrowLongUp } from "react-icons/hi2";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Footer = () => {
  const arrowRef = useRef(null);
  const { playClick, playHover } = useSoundEffects();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useGSAP(() => {
    gsap.to(arrowRef.current, {
      y: 50,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  });

  return (
    <footer className="w-full px-6 py-12 border-t border-accent/10 ">
      <div className="max-w-7xl mx-auto flex flex-col sm:pb-32 md:pb-12 md:flex-row justify-between items-center gap-8 relative">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <p className="text-[10px] md:text-xs uppercase  tracking-[0.2em]">
            Source code is available on{" "}
            <a
              href="https://github.com/mohidqx"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHover}
              className="text-main-text font-bold border-b-2 border-main-text/20 hover:border-accent hover:text-accent transition-all duration-300"
            >
              GitHub
            </a>
            .
          </p>
          <p className="text-[10px] md:text-sm uppercase font-sync tracking-[0.2em] ">
            Built by{" "}
            <span className="text-main-text border-b border-main-text/30 hover:border-accent transition-colors cursor-default">
              Muhammad Mohid
            </span>
          </p>
        </div>
        <button
          ref={arrowRef}
          onClick={scrollToTop}
          onMouseEnter={playHover}
          className="group relative w-12 h-12 md:w-14 md:h-14 rounded-full border border-accent/30 flex items-center justify-center overflow-hidden transition-all duration-500 hover:border-accent shadow-[0_0_20px_rgba(255,152,162,0)] hover:shadow-[0_0_20px_rgba(255,152,162,0.2)]"
          aria-label="Scroll to top"
        >
          <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          <HiArrowLongUp className="relative z-10 text-xl md:text-2xl text-main-text group-hover:text-main-bg transition-colors duration-500" />
        </button>
        <div className="hidden md:block absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8rem] font-black text-main-text uppercase tracking-tighter opacity-10 md:opacity-[0.05] dark:opacity-10 pointer-events-none select-none">
          Evolution
        </div>
      </div>
    </footer>
  );
};

export default Footer;
