import React from "react";
import { useSoundEffects } from "../../hooks/useSoundEffects";

const Badge = ({ icon: Icon, text, color = "border-accent/50" }) => {
  const { playHover } = useSoundEffects();
  return (
    <span
      onMouseEnter={playHover}
      className={`inline-flex items-center gap-1.5 px-4 mx-1 py-2 bg-accent/5 border ${color} rounded-full text-sm font-bold transition-all hover:scale-105 hover:text-main-text cursor-default`}
    >
      {Icon && <Icon className="text-md" />}
      {text}
    </span>
  );
};

export default Badge;
