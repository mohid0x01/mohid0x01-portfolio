import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSoundEffects } from "../../hooks/useSoundEffects";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    icon: "🚀",
    title: "NASA Hall of Fame",
    highlight: "25 Vulnerabilities Discovered",
    description:
      "Acknowledged by NASA through the Vulnerability Disclosure Program (VDP) for discovering and responsibly reporting 25 security vulnerabilities across NASA infrastructure.",
    tag: "VDP Acknowledgement",
  },
  {
    icon: "🏆",
    title: "Sindh's TOP Hacker",
    highlight: "#1 Ranked",
    description:
      "Recognized as the top-ranked hacker in Sindh province for outstanding contributions in cybersecurity research, bug bounty hunting, and offensive security operations.",
    tag: "Regional Recognition",
  },
  {
    icon: "🎓",
    title: "IBA University Award",
    highlight: "Best Cybersecurity Performance",
    description:
      "Received the Best Cybersecurity Performance Award from IBA University's Incubation Center for exceptional skill in both offensive and defensive security operations.",
    tag: "Academic Excellence",
  },
  {
    icon: "🐛",
    title: "Bug Bounty Hunter",
    highlight: "Critical & High Severity Findings",
    description:
      "Active researcher on HackerOne (@cyberops-root) and Bugcrowd (@cyberops_r00t) — discovering XSS chains, IDOR, SSRF, Broken Auth, and API security flaws across major platforms.",
    tag: "HackerOne & Bugcrowd",
  },
  {
    icon: "🚩",
    title: "30 Days, 30 CTFs",
    highlight: "Challenge Completed",
    description:
      "Completed the 30 Days 30 CTFs challenge covering Web exploitation, Cryptography, and Digital Forensics with full write-ups. Platforms: TryHackMe, HackTheBox, PicoCTF.",
    tag: "CTF Champion",
  },
  {
    icon: "⚡",
    title: "Custom Recon Pipeline",
    highlight: "60% Faster Enumeration",
    description:
      "Built a custom reconnaissance pipeline (TeamCyberOps-Recon + Recon-Subdomain) that cuts per-target enumeration time by 60%, enabling rapid vulnerability discovery at scale.",
    tag: "Tool Innovation",
  },
  {
    icon: "🔱",
    title: "Pull Shark x2",
    highlight: "GitHub Achievement",
    description:
      "Earned the Pull Shark badge (x2) on GitHub for significant open-source contributions through merged pull requests across multiple repositories.",
    tag: "Open Source",
  },
  {
    icon: "🛡️",
    title: "6 Industry Certifications",
    highlight: "C|EH · OSCP · eWPTX · eCPPT · eJPT · C|SSP",
    description:
      "Holds six industry-recognized cybersecurity certifications spanning ethical hacking, penetration testing, web application security, and systems security.",
    tag: "Certified Professional",
  },
];

const Achievements = () => {
  const containerRef = useRef(null);
  const { playHover } = useSoundEffects();

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".achievement-card");

      items.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="w-full px-6 py-24 border-t border-accent/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
          <h2 className="text-accent text-[10px] md:text-sm uppercase tracking-[0.3em] font-bold mb-3 md:mb-4 opacity-80">
            — Hall of Fame
          </h2>
          <p className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
            Achiev<span className="text-accent italic">ements</span>
          </p>
          <div className="h-1 w-10 md:w-12 bg-accent mt-4 md:mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((item, index) => (
            <div
              key={index}
              onMouseEnter={playHover}
              className="achievement-card group relative p-8 border border-accent/10 hover:border-accent/40 transition-all duration-500 overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-linear-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                {/* Top row */}
                <div className="flex items-start justify-between mb-5">
                  <span className="text-4xl">{item.icon}</span>
                  <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-accent/70 border border-accent/20 px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight mb-2 group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Highlight */}
                <p className="text-accent font-bold text-sm uppercase tracking-wider mb-4">
                  {item.highlight}
                </p>

                {/* Description */}
                <p className="text-sm opacity-50 leading-relaxed font-roboto">
                  {item.description}
                </p>
              </div>

              {/* Decorative index */}
              <div className="absolute bottom-4 right-6 text-[80px] font-black text-accent/[0.04] leading-none select-none pointer-events-none">
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
