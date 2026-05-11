import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { FiExternalLink } from "react-icons/fi";
import { useSoundEffects } from "../../hooks/useSoundEffects";

gsap.registerPlugin(ScrollTrigger);

const certs = [
  {
    title: "C|EH  |  Certified Ethical Hacker",
    issuer: "EC-Council",
    link: "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/",
    details: [
      "Comprehensive certification covering ethical hacking techniques, tools, and methodologies.",
      "Conducted penetration testing and vulnerability assessments on web applications and networks.",
    ],
  },
  {
    title: "OSCP  |  Offensive Security Certified Professional",
    issuer: "OffSec",
    link: "https://www.offsec.com/courses/pen-200/",
    details: [
      "Comprehensive certification focused on hands-on penetration testing and ethical hacking skills.",
      "Successfully completed a rigorous 24-hour practical exam involving real-world attack scenarios.",
    ],
  },
  {
    title: "eWPTX  |  Web Application Penetration Testing eXtreme",
    issuer: "INE Security",
    link: "https://security.ine.com/certifications/ewptx-certification/",
    details: [
      "Advanced certification in web application penetration testing techniques.",
      "Mastered OWASP Top 10 vulnerabilities and advanced exploitation methodologies.",
    ],
  },
  {
    title: "eCPPT  |  Certified Professional Penetration Tester",
    issuer: "INE Security",
    link: "https://security.ine.com/certifications/ecppt-certification/",
    details: [
      "Professional-level certification covering network penetration testing, web app attacks, and post-exploitation.",
      "Demonstrated ability to perform full penetration tests with detailed reporting.",
    ],
  },
  {
    title: "eJPT  |  Junior Penetration Tester",
    issuer: "INE Security",
    link: "https://security.ine.com/certifications/ejpt-certification/",
    details: [
      "Entry-level penetration testing certification covering networking, web apps, and host-based attacks.",
      "Hands-on practical exam testing real-world penetration testing skills.",
    ],
  },
  {
    title: "C|SSP  |  Certified Systems Security Practitioner",
    issuer: "ISC²",
    link: "https://www.isc2.org/certifications/cssp",
    details: [
      "Validates expertise in IT infrastructure security, covering access controls, risk management, and cryptography.",
      "Recognized globally as a foundational security operations certification.",
    ],
  },
];

const Certifications = () => {
  const containerRef = useRef(null);
  const { playHover, playClick } = useSoundEffects();

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".cert-card");

      items.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          y: 40,
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
            — Verified Credentials
          </h2>
          <p className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
            Certifi<span className="text-accent italic">cations</span>
          </p>
          <div className="h-1 w-10 md:w-12 bg-accent mt-4 md:mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((cert, index) => (
            <div
              key={index}
              className="cert-card group relative p-8 border border-accent/10 bg-accent/2 flex flex-col justify-between hover:border-accent/40 transition-colors duration-500"
            >
              <div>
                <span className="text-[12px] font-sync font-black text-accent uppercase tracking-widest">
                  {cert.issuer}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-4 leading-tight uppercase tracking-tighter">
                  {cert.title}
                </h3>
                <ul className="space-y-3 mb-8">
                  {cert.details.map((point, i) => (
                    <li
                      key={i}
                      className="text-xs opacity-60 leading-relaxed list-none border-l border-accent/20 pl-3"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                data-cursor="View"
                className="relative w-full py-4 border border-accent/20 overflow-hidden group/btn transition-all block text-center"
              >
                <div className="absolute inset-0 bg-accent translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                <span className="relative z-10 flex items-center justify-center gap-2 text-[12px] uppercase font-bold tracking-[0.2em] group-hover/btn:text-main-bg transition-colors">
                  View Certificate{" "}
                  <HiOutlineAcademicCap className="text-lg" />
                  <FiExternalLink className="text-sm" />
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
