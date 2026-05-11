import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FiExternalLink, FiGithub, FiGlobe, FiShield, FiFlag, FiTerminal, FiCpu } from "react-icons/fi";
import { useSoundEffects } from "../hooks/useSoundEffects";

gsap.registerPlugin(ScrollTrigger);

const liveTools = [
  {
    name: "WebRecox",
    tagline: "Reconnaissance & Security Intelligence Platform",
    description:
      "Advanced web reconnaissance, OSINT, and vulnerability scanning platform. Features automated subdomain enumeration, port scanning, technology detection, and security header analysis — all from the browser.",
    live: "https://webrecox.vercel.app",
    github: "https://github.com/mohidqx/webrecox",
    tech: ["TypeScript", "React 18", "Vite", "Tailwind CSS"],
    icon: FiShield,
    color: "#FF98A2",
    features: [
      "Subdomain Enumeration",
      "Technology Detection",
      "Security Header Analysis",
      "OSINT Gathering",
      "Vulnerability Scanning",
    ],
  },
  {
    name: "Oneliner",
    tagline: "One-Command Recon & Exploitation Toolkit",
    description:
      "Browser-based oneliner generator for bug bounty hunters. Generate ready-to-use one-liner commands for reconnaissance, subdomain discovery, content discovery, and exploitation workflows.",
    live: "https://webrecox.vercel.app/onliners",
    github: "https://github.com/mohidqx/webrecox",
    tech: ["TypeScript", "React", "Vite"],
    icon: FiTerminal,
    color: "#4EAA25",
    features: [
      "Recon Oneliners",
      "Exploitation Commands",
      "Custom Pipelines",
      "Copy-to-Clipboard",
      "Categorized Library",
    ],
  },
  {
    name: "TeamCyberOps",
    tagline: "Cybersecurity & Ethical Hacking Organization Platform",
    description:
      "Full-stack cybersecurity platform with hacker-aesthetic UI, 3D WebGL visuals, real-time messaging, blog system, automated GitHub project sync, and comprehensive admin panel. Features rotating wireframe globe, DNA helix animations, and particle fields.",
    live: "https://teamcyberops.vercel.app",
    github: "https://github.com/mohidqx/teamcyberops-landing-6eef82ad",
    tech: ["React 18", "TypeScript", "Three.js", "Tailwind CSS", "Supabase", "Framer Motion"],
    icon: FiGlobe,
    color: "#61DAFB",
    features: [
      "3D WebGL Background",
      "CMS Dashboard",
      "Blog System",
      "GitHub Auto-Sync",
      "Team Management",
      "Services & Pricing",
    ],
  },
  {
    name: "CTF Platform",
    tagline: "Capture The Flag — by TeamCyberØps",
    description:
      "A Capture the Flag platform built for cybersecurity training and competitions. Features Web exploitation, Cryptography, and Digital Forensics challenges with real-world scenarios, scoring system, and leaderboards.",
    live: "https://ctf-teamcyberops.vercel.app",
    github: "https://github.com/mohidqx",
    tech: ["TypeScript", "React", "Vite", "Tailwind CSS"],
    icon: FiFlag,
    color: "#F59E0B",
    features: [
      "Web Exploitation",
      "Cryptography",
      "Digital Forensics",
      "Scoring System",
      "Leaderboards",
    ],
  },
];

const Tools = () => {
  const containerRef = useRef();
  const cardsRef = useRef();
  const { playHover, playClick } = useSoundEffects();

  // Hero animation
  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".tools-hero-title .char", {
        y: 120,
        opacity: 0,
        stagger: 0.03,
        duration: 1,
        ease: "power4.out",
      })
        .from(
          ".tools-subtitle",
          { y: 30, opacity: 0, duration: 1, ease: "power3.out" },
          "-=0.6"
        )
        .from(
          ".tools-desc",
          { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );
    },
    { scope: containerRef }
  );

  // Card animations
  useGSAP(
    () => {
      if (!cardsRef.current) return;
      const cards = cardsRef.current.querySelectorAll(".tool-card");
      gsap.set(cards, { y: 60, opacity: 0 });

      ScrollTrigger.batch(cards, {
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.9,
            ease: "power3.out",
          });
        },
        start: "top 90%",
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: cardsRef }
  );

  const splitText = (text) =>
    text.split("").map((char, i) => (
      <span key={i} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <main ref={containerRef} className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full px-6 md:px-12 pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-16 right-6 md:right-12 text-[20vw] font-black text-accent/[0.04] leading-none select-none pointer-events-none">
          {liveTools.length}
        </div>

        <div className="max-w-7xl mx-auto">
          <h2 className="text-accent text-[10px] md:text-sm uppercase tracking-[0.3em] font-bold mb-3 md:mb-4 opacity-80">
            — Live Deployments
          </h2>
          <h1 className="tools-hero-title text-5xl md:text-[10vw] font-black uppercase tracking-tighter leading-[0.85] mb-8">
            {splitText("Live")}
            <br />
            <span className="text-accent">{splitText("Tools")}</span>
          </h1>
          <div className="tools-subtitle flex items-center gap-4">
            <div className="h-1 w-12 bg-accent" />
            <p className="text-main-text/60 text-sm md:text-base uppercase tracking-widest">
              Web-based security platforms — built & deployed
            </p>
          </div>
          <p className="tools-desc max-w-2xl mt-6 text-main-text/40 text-sm md:text-base leading-relaxed font-roboto">
            Production-ready offensive security tools, reconnaissance platforms,
            and CTF environments — all running live, built by{" "}
            <a
              href="https://github.com/mohidqx"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              @mohidqx
            </a>
            .
          </p>
        </div>
      </section>

      {/* Tool Cards */}
      <section className="w-full px-6 md:px-12 pb-32">
        <div ref={cardsRef} className="max-w-7xl mx-auto space-y-8">
          {liveTools.map((tool, index) => (
            <ToolCard
              key={index}
              tool={tool}
              index={index}
              playHover={playHover}
              playClick={playClick}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

const ToolCard = ({ tool, index, playHover, playClick }) => {
  const Icon = tool.icon;

  return (
    <div className="tool-card group relative border border-main-text/10 rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(255,152,162,0.08)]">
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 p-8 md:p-12">
        {/* Top row: Number + Links */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <span className="text-6xl md:text-8xl font-black text-accent/10 leading-none select-none">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div
              className="w-14 h-14 rounded-xl border border-accent/20 flex items-center justify-center transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent/10"
              style={{ color: tool.color }}
            >
              <Icon size={28} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={tool.github}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="w-10 h-10 rounded-full border border-main-text/15 flex items-center justify-center text-main-text/40 hover:text-accent hover:border-accent/40 transition-all duration-300"
            >
              <FiGithub size={18} />
            </a>
            <a
              href={tool.live}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="group/live flex items-center gap-2 px-5 py-2.5 border border-accent/30 rounded-full text-accent text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-main-bg transition-all duration-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Live
              <FiExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Left: Name + Description */}
          <div className="md:col-span-7">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-2 group-hover:text-accent transition-colors duration-300">
              {tool.name}
            </h3>
            <p className="text-accent text-xs md:text-sm font-bold uppercase tracking-wider mb-5">
              {tool.tagline}
            </p>
            <p className="text-main-text/50 text-sm md:text-base leading-relaxed font-roboto">
              {tool.description}
            </p>
          </div>

          {/* Right: Features + Tech */}
          <div className="md:col-span-5 space-y-6">
            {/* Features */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-main-text/30 mb-3">
                Key Features
              </h4>
              <div className="flex flex-wrap gap-2">
                {tool.features.map((feat, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold border border-accent/15 rounded-full text-main-text/50 hover:border-accent/30 hover:text-main-text/70 transition-all duration-300"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-main-text/30 mb-3">
                Built With
              </h4>
              <div className="flex flex-wrap gap-2">
                {tool.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-accent/80 bg-accent/5 border border-accent/10 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-px w-0 group-hover:w-full bg-linear-to-r from-accent/60 via-accent/30 to-transparent transition-all duration-700 ease-out" />
    </div>
  );
};

export default Tools;
