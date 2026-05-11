import React from "react";
import ThemeToggle from "../ThemeToggle";
import { Link, useLocation } from "react-router-dom";
import { IoHome, IoInformationCircle } from "react-icons/io5";
import { HiTerminal } from "react-icons/hi";
import { FiShield } from "react-icons/fi";
import NavItem from "./NavItem";
import MuteToggle from "../MuteToggle";

const Header = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-160 backdrop-blur-md bg-main-bg/80 text-main-text border border-accent/30 rounded-2xl shadow-2xl z-50">
      <nav aria-label="Main Navigation">
        <ul className="flex items-center justify-around py-3 px-4">
          <NavItem
            to="/"
            icon={<IoHome size={22} />}
            label="Home"
            active={isActive("/")}
          />
          <NavItem
            to="/about"
            icon={<IoInformationCircle size={22} />}
            label="About"
            active={isActive("/about")}
          />
          <NavItem
            to="/projects"
            icon={<HiTerminal size={22} />}
            label="Projects"
            active={isActive("/projects")}
          />
          <NavItem
            to="/tools"
            icon={<FiShield size={22} />}
            label="Tools"
            active={isActive("/tools")}
          />
          <li className="h-8 w-px bg-accent/20 mx-2" aria-hidden="true" />
          <li className="flex items-center justify-between gap-2">
            <MuteToggle />
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
