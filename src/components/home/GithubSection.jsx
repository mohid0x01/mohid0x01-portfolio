import React, { useRef } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MarkerHighlight from "../MarkerHighlight";

const GithubSection = () => {
  const container = useRef();

  const pinkTheme = {
    light: [
      "var(--color-primary)",
      "color-mix(in srgb, var(--color-accent), transparent 80%)",
      "color-mix(in srgb, var(--color-accent), transparent 40%)",
      "var(--color-accent)",
      "color-mix(in srgb, var(--color-accent), black 20%)",
    ],
    dark: [
      "#161b22",
      "color-mix(in srgb, var(--color-accent), transparent 80%)",
      "color-mix(in srgb, var(--color-accent), transparent 40%)",
      "var(--color-accent)",
      "color-mix(in srgb, var(--color-accent), white 20%)",
    ],
  };

  useGSAP(
    () => {
      gsap.from(".github-card", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="w-full px-4 md:px-6 py-16 md:py-24 text-main-text overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
          <h2 className="text-accent text-[10px] md:text-sm uppercase tracking-[0.3em] font-bold mb-3 md:mb-4 opacity-80">
            — Consistency
          </h2>
          <p className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
            Code <span className="text-accent">Evolution</span>
          </p>
          <div className="h-1 w-10 md:w-12 bg-accent mt-4 md:mt-6" />
        </div>
        <div className="github-card relative p-4 sm:p-6 md:p-10 border border-accent/20 rounded-2xl md:rounded-3xl bg-main-bg shadow-[0_20px_50px_rgba(255,152,162,0.1)] transition-all hover:border-accent/40">
          <div className="flex justify-center items-center py-4 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing">
            <div className="min-w-200 md:min-w-full">
              <GitHubCalendar
                username="mohid0x01"
                theme={pinkTheme}
                blockSize={16}
                blockMargin={5}
                fontSize={12}
                style={{
                  color: "var(--color-main-text)",
                  fontFamily: "var(--font-roboto)",
                  margin: "0 auto",
                }}
                labels={{
                  totalCount: "{{count}} contributions in the last year",
                }}
              />
            </div>
          </div>
          <span className="absolute bottom-2 right-4 md:bottom-4 md:right-8 text-2xl md:text-4xl text-main-text uppercase tracking-tighter opacity-10 md:opacity-[0.05] dark:opacity-10 pointer-events-none select-none">
            Github Contributions
          </span>
        </div>
        <p className="md:hidden text-[10px] uppercase tracking-widest opacity-40 mt-4 text-center">
          ← Swipe to view activity →
        </p>
      </div>
    </section>
  );
};

export default GithubSection;
