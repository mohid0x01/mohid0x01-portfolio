import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiRedux,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiNodedotjs,
  SiGit,
  SiVercel,
  SiCss,
  SiSass,
  SiVite,
  SiReactrouter,
  SiPython,
} from "react-icons/si";
import { useSoundEffects } from "../../hooks/useSoundEffects";
import { BsBootstrap } from "react-icons/bs";
import { MdSecurity } from "react-icons/md";
import { FiTerminal, FiServer, FiShield, FiSearch } from "react-icons/fi";

const stackData = [
  {
    category: "Offensive Security",
    tools: [
      { name: "Burp Suite", icon: FiShield, color: "#FF6633" },
      { name: "Nmap", icon: FiSearch, color: "#4682B4" },
      { name: "Metasploit", icon: MdSecurity, color: "#2A6496" },
      { name: "Nuclei", icon: null, text: "Nuclei", color: "#7B61FF" },
      { name: "Wireshark", icon: FiSearch, color: "#1679A7" },
      { name: "OWASP ZAP", icon: MdSecurity, color: "#00549E" },
    ],
  },
  {
    category: "Languages & Scripting",
    tools: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Go", icon: null, text: "Go", color: "#00ADD8" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Bash", icon: FiTerminal, color: "#4EAA25" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss, color: "#1572B6" },
    ],
  },
  {
    category: "Frameworks & Libraries",
    tools: [
      { name: "ReactJS", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Vite", icon: SiVite, color: "#646CFF" },
      { name: "React Router", icon: SiReactrouter, color: "#CA4245" },
      { name: "GSAP", icon: null, text: "GSAP", color: "#88CE02" },
      { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
    ],
  },
  {
    category: "Styling & State",
    tools: [
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", icon: BsBootstrap, color: "#0d6efd" },
      { name: "Sass", icon: SiSass, color: "#CC6699" },
      { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
    ],
  },
  {
    category: "Infrastructure & Tools",
    tools: [
      { name: "Linux", icon: FiTerminal, color: "#FCC624" },
      { name: "Docker", icon: FiServer, color: "#2496ED" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Vercel", icon: SiVercel, color: "#000000" },
    ],
  },
];

const TechStack = () => {
  const containerRef = useRef();
  const { playHover } = useSoundEffects();

  useGSAP(
    () => {
      gsap.from(".stack-category", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="w-full py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 md:mb-12">
          <h2 className="text-accent text-[10px] md:text-sm uppercase tracking-[0.3em] font-bold mb-3 md:mb-4 opacity-80">
            — My Arsenal
          </h2>
          <p className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
            Tech <span className="text-accent">Stack</span>
          </p>
          <div className="h-1 w-10 md:w-12 bg-accent mt-4 md:mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-y-20">
          {stackData.map((group, i) => (
            <div key={i} className="stack-category space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest opacity-40 border-b border-accent/10 pb-4">
                {group.category}
              </h4>
              <div className="flex flex-wrap gap-4">
                {group.tools.map((tool, j) => (
                  <div
                    key={j}
                    onMouseEnter={playHover}
                    className="flex items-center gap-3 px-4 py-2 border border-accent/10 rounded-full hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 group cursor-default"
                  >
                    {tool.icon ? (
                      <tool.icon
                        className="text-xl transition-colors duration-300"
                        style={{ color: tool.color }}
                      />
                    ) : (
                      <span
                        className="font-bold text-xs"
                        style={{ color: tool.color }}
                      >
                        {tool.text}
                      </span>
                    )}
                    <span className="text-sm font-medium tracking-tight opacity-70 group-hover:opacity-100">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
