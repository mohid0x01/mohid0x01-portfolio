import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BsArrowRight } from "react-icons/bs";
import CtaButton from "../CtaButton";
import MarkerHighlight from "../MarkerHighlight";

const AboutPreview = () => {
  const container = useRef();

  useGSAP(
    () => {
      gsap.from(".about-text", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className="w-full px-6 py-24 text-main-text">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-end">
        <div className="flex-1">
          <div className="mb-12">
            <h2 className="text-accent text-xs md:text-sm uppercase tracking-[0.3em] font-bold mb-4 opacity-80">
              — Who am I?
            </h2>
            <p className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-main-text leading-none">
              Beyond the <span className="text-accent">Pixels</span>
            </p>
            <div className="h-1 w-12 bg-accent mt-6" />
          </div>
          <p className="about-text text-3xl md:text-5xl font-medium leading-tight tracking-tight">
            I’m a developer who thrives at the intersection of{" "}
            <MarkerHighlight>
              <span className="italic">design and logic</span>.
            </MarkerHighlight>
            I don’t just write code; I craft digital interfaces that feel alive.
          </p>
        </div>

        <div className="flex-none pb-2">
          <CtaButton to="/about" label="Know more about me" />
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
