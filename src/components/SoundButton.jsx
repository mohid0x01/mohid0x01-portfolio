import React from "react";
import { useSoundEffects } from "../hooks/useSoundEffects";

const SoundButton = ({ children, onClick, className = "", ...props }) => {
  const { playHover, playClick } = useSoundEffects();
  const handleClick = (e) => {
    playClick();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <button
      onMouseEnter={playHover}
      onClick={handleClick}
      className={`transition-all active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default SoundButton;
