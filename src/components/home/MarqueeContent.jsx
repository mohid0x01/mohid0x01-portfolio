import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { FaPython } from "react-icons/fa";
import { IoLogoCss3, IoLogoJavascript } from "react-icons/io";
import {
  RiBootstrapFill,
  RiHtml5Fill,
  RiReactjsLine,
  RiTailwindCssFill,
} from "react-icons/ri";
import {
  SiGsap,
  SiMui,
  SiSass,
  SiShadcnui,
  SiStyledcomponents,
} from "react-icons/si";
import { useSoundEffects } from "../../hooks/useSoundEffects";

gsap.registerPlugin(ScrollTrigger);

const icons = [
  { component: RiReactjsLine, name: "ReactJS" },
  { component: RiHtml5Fill, name: "HTML5" },
  { component: IoLogoCss3, name: "CSS3" },
  { component: IoLogoJavascript, name: "JavaScript" },
  { component: RiTailwindCssFill, name: "Tailwind CSS" },
  { component: RiBootstrapFill, name: "Bootstrap" },
  { component: SiSass, name: "SASS" },
  { component: SiGsap, name: "GSAP" },
  { component: SiMui, name: "MUI" },
  { component: SiShadcnui, name: "ShadCN" },
  { component: SiStyledcomponents, name: "Styled Components" },
  { component: FaPython, name: "Python" },
];

const MarqueeContent = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const timeline = useRef(null);
  const { playHover } = useSoundEffects();

  useGSAP(
    () => {
      const slider = sliderRef.current;
      timeline.current = gsap.to(slider, {
        xPercent: -50,
        duration: 30, // Slightly slower for better readability
        ease: "none",
        repeat: -1,
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity() / 1200);
          if (!timeline.current.paused()) {
            gsap.to(timeline.current, {
              timeScale: 1 + velocity,
              duration: 0.5,
            });
          }
        },
      });
    },
    { scope: containerRef },
  );

  const handleMouseEnter = () => {
    timeline.current.pause();
    playHover();
  };
  const handleMouseLeave = () => timeline.current.play();

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden py-16 md:py-32 "
    >
      <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-linear-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-linear-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

      <div
        ref={sliderRef}
        className="flex items-center gap-8 md:gap-24 w-max px-8"
      >
        {[...icons, ...icons, ...icons].map((Icon, i) => (
          <div
            key={i}
            className="group flex flex-col items-center gap-3 md:gap-4 transition-transform duration-500 hover:-translate-y-1 md:hover:-translate-y-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative p-4 md:p-6 rounded-xl md:rounded-2xl border border-accent/10 bg-accent/3 backdrop-blur-sm transition-all duration-500 group-hover:border-accent/40 group-hover:bg-accent/10 shadow-2xl shadow-transparent group-hover:shadow-accent/5">
              <Icon.component className="text-accent/80 group-hover:text-accent size-8 md:size-16 lg:size-20 transition-all duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-accent/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            </div>
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold opacity-80 group-hover:opacity-100 transition-all duration-500 text-accent">
              {Icon.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarqueeContent;
