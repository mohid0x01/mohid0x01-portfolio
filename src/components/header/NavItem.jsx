import React from "react";
import { Link } from "react-router-dom";
import { useSoundEffects } from "../../hooks/useSoundEffects";

const NavItem = ({ to, icon, label, active }) => {
  const { playHover, playClick } = useSoundEffects();

  return (
    <li className="relative">
      <Link
        to={to}
        onMouseEnter={playHover}
        onClick={playClick}
        className={`flex flex-col items-center gap-1 transition-all duration-300 group 
          ${active ? "text-accent scale-110" : "opacity-70 hover:opacity-100"}`}
      >
        <div
          className={`p-1 rounded-xl transition-colors duration-300 
            ${active ? "bg-accent/10" : "group-hover:bg-accent/5"}`}
        >
          {icon}
        </div>
        <span className="text-[10px] font-medium uppercase tracking-wider">
          {label}
        </span>

        {active && (
          <div className="w-1 h-1 bg-accent rounded-full absolute -bottom-1 left-1/2 -translate-x-1/2" />
        )}
      </Link>
    </li>
  );
};

export default NavItem;
