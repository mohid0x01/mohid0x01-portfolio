import React from "react";
import { Link } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";
import { useSoundEffects } from "../hooks/useSoundEffects";

const CtaButton = ({ to, label }) => {
  const { playHover, playClick } = useSoundEffects();

  return (
    <Link
      onMouseEnter={playHover}
      onClick={playClick}
      to={to}
      className="group inline-flex items-center gap-6"
    >
      <span className="text-sm md:text-base uppercase tracking-[0.3em] font-bold text-main-text">
        {label}
      </span>
      <div className="relative flex items-center justify-center size-12 rounded-full border border-accent/30 overflow-hidden transition-all duration-500 ease-in-out group-hover:border-accent">
        <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
        <HiArrowLongRight className="relative z-10 text-accent text-2xl group-hover:text-main-bg group-hover:-rotate-45 transition-all duration-500 ease-in-out" />
      </div>
    </Link>
  );
};

export default CtaButton;
