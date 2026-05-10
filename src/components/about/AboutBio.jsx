import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiCss,
  SiHtml5,
  SiLeetcode,
  SiCodewars,
} from "react-icons/si";
import Badge from "./Badge";
import pkFlag from "/images/pk-flag.png";
import MarkerHighlight from "../MarkerHighlight";
import { FaDownLong } from "react-icons/fa6";
import { useSoundEffects } from "../../hooks/useSoundEffects";
import { FcNeutralDecision } from "react-icons/fc";
import { BiSolidNetworkChart } from "react-icons/bi";
import DocumentViewer from "../DocumentViewer";

const AboutBio = () => {
  const sectionRef = useRef();
  const { playHover, playClick } = useSoundEffects();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const resumePath = "/documents/Mohid-Cyber-CV.docx";
  useGSAP(
    () => {
      gsap.from(".bio-text p", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 80%",
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="w-full py-32 px-6 bg-background text-main-bg"
    >
      <div className="max-w-6xl mx-auto space-y-12 bio-text">
        <p className="text-2xl md:text-4xl font-medium leading-[1.3] tracking-tight">
          Hi! I am <MarkerHighlight>Muhammad Mohid</MarkerHighlight>, a Full-Stack
          Developer based in
          <span className="items-center inline-block">
            <span className="italic uppercase text-lg text-accent ml-2">
              {" "}
              Sukkur
            </span>
            <img
              src={pkFlag}
              alt="Pakistan Flag"
              className="w-7 ml-2 inline-block"
            />
          </span>
          . I don't just write code, I craft interfaces that feel{" "}
          <Badge text="Obedient" /> and look <Badge text="Precision-made" />.
        </p>

        <p className="text-xl md:text-2xl opacity-80 leading-relaxed">
          My web development journey started in 2022 after my{" "}
          <MarkerHighlight>Bachelors in Software Engineering</MarkerHighlight>.
          Having a strong programming background, I quickly mastered{" "}
          <Badge icon={SiHtml5} text="HTML" />
          {", "}
          <Badge icon={SiCss} text="CSS" /> and{" "}
          <Badge icon={SiJavascript} text="JavaScript" />
          .I honed my skills through logic-building on{" "}
          <Badge icon={SiLeetcode} text="Leetcode" /> and{" "}
          <Badge icon={SiCodewars} text="Codewars" />. My passion was ignited
          during my FYP. To polish my skills, I did some internships and started
          freelancing as side kick.
        </p>
        <p className="text-xl md:text-2xl opacity-80 leading-relaxed">
          In 2025, I completed my{" "}
          <MarkerHighlight>Bachelors in Computer Sceince</MarkerHighlight>. My
          research was based on{" "}
          <Badge icon={BiSolidNetworkChart} text="Computer Vision" /> where I
          spent a lot of time exploring Vision Transformers (ViTs) and modern
          Deep Learning architectures.
        </p>

        <p className="text-xl md:text-2xl opacity-80 leading-relaxed">
          Currently, I am Freelancer as a Web Development Intern
          through the{" "}
          <span className="italic uppercase text-lg text-accent">
            CMIT program
          </span>
          , where I'm focused on building Dashboards, Animated Websites and
          having laughs with the employees. When I am not at my desk, you can
          find me taking on freelance projects or getting lost in a good book.
        </p>
        <div className="pt-5 flex flex-wrap items-center gap-6">
          <button
            onClick={() => {
              playClick();
              setIsViewerOpen(true);
            }}
            onMouseEnter={playHover}
            className="group relative px-8 py-4 border border-accent/30 rounded-full font-bold uppercase text-xs tracking-widest overflow-hidden transition-all duration-500 shadow-xl text-center active:scale-95"
          >
            <div className="absolute inset-0 bg-accent translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            <span className="relative z-10 text-accent group-hover:text-white transition-colors duration-300">
              View Résumé
            </span>
          </button>

          <div className="group relative">
            <a
              href={resumePath}
              download="Ayeza_Bashir_Resume.pdf"
              className="relative flex items-center justify-center w-14 h-14 border border-accent/30 rounded-full transition-all duration-500 overflow-hidden shadow-lg active:scale-90"
              onMouseEnter={playHover}
              onClick={playClick}
            >
              <div className="absolute inset-0 bg-accent translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              <div className="relative z-10 text-accent group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                <FaDownLong className="text-xl" />
              </div>
            </a>
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-main-bg text-accent text-[10px] font-bold uppercase tracking-tighter rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Download Resume
            </span>
          </div>
        </div>
      </div>
      {isViewerOpen && (
        <DocumentViewer
          file={resumePath}
          onClose={() => setIsViewerOpen(false)}
        />
      )}
    </section>
  );
};

export default AboutBio;
