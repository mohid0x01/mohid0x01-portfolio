import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "ReactJS Developer",
    company: "Maaz Informatics",
    duration: "January 2026 - Present",
    location: "Onsite, Sukkur",
    points: [
      "Selected as an Intern through the CMIT program, contributing to modern MIS and admin dashboards.",
      "Designed and built responsive interfaces using React.js, Tailwind CSS, and ShadCN UI.",
      "Implemented state management with Redux Toolkit and navigation using React Router DOM.",
    ],
  },
  {
    role: "FreeLancer",
    company: "Project Based Work",
    duration: "2024 - Present",
    location: "Remote, Pakistan",
    points: [
      "Collaborated with national and international clients to design and develop responsive web applications.",
      "Converted Figma designs into functional interfaces using React.js, Tailwind CSS, and Bootstrap.",
      "Improved performance resulting in 30% faster load times and enhanced user experience.",
    ],
  },
  {
    role: "Javascript Developer",
    company: "Softileo LTD",
    duration: "November 2022 - April 2023",
    location: "On-site, Pakistan",
    points: [
      "Developed interactive layouts using HTML, CSS, and JavaScript to boost SEO efforts.",
      "Translated complex requirements into interactive experiences driving a 110% increase in traffic.",
      "Implemented animations leading to a significant 86% increase in user engagement.",
    ],
  },
];

const Experience = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".experience-item");

      items.forEach((item) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 40%",
            scrub: false,
            toggleActions: "play none none reverse",
          },
        });

        tl.from(item.querySelector(".line-reveal"), {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1,
          ease: "expo.out",
        }).from(
          item.querySelectorAll(".content-reveal"),
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="w-full px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
          <h2 className="text-accent text-[10px] md:text-sm uppercase tracking-[0.3em] font-bold mb-3 md:mb-4 opacity-80">
            — Path to Mastery
          </h2>
          <p className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
            My <span className="text-accent">Experience</span>
          </p>
          <div className="h-1 w-10 md:w-12 bg-accent mt-4 md:mt-6" />
        </div>

        <div className="space-y-20">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item group">
              <div className="line-reveal w-full h-[1px] bg-accent/20 mb-8" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-main-bg">
                <div className="md:col-span-4 space-y-1">
                  <h3 className="content-reveal text-2xl font-bold text-accent uppercase tracking-tight">
                    {exp.role}
                  </h3>
                  <p className="content-reveal text-lg font-medium">
                    {exp.company}
                  </p>
                  <p className="content-reveal text-xs uppercase tracking-widest opacity-50">
                    ({exp.location})
                  </p>
                </div>

                <div className="md:col-span-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <p className="content-reveal text-sm font-mono opacity-80">
                      {exp.duration}
                    </p>
                  </div>
                  <ul className="space-y-4">
                    {exp.points.map((point, i) => (
                      <li
                        key={i}
                        className="content-reveal flex gap-4 text-sm md:text-base opacity-70 leading-relaxed max-w-2xl"
                      >
                        <span className="text-accent mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
