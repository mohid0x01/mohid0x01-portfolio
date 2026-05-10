/* eslint-disable no-unused-vars */
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { useSoundEffects } from "../../hooks/useSoundEffects";

const SocialLink = ({ href, icon: Icon, label }) => {
  const { playHover } = useSoundEffects();
  return (
    <a
      onMouseEnter={playHover}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 uppercase text-sm font-bold tracking-tighter transition-all"
    >
      <Icon className="text-xl opacity-60 group-hover:opacity-100 transition-opacity" />
      <span className="text-lg opacity-60 group-hover:opacity-100">
        {label}
      </span>
      <FiArrowUpRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-main-text" />
    </a>
  );
};

export default SocialLink;
