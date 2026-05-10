import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiCopy, FiCheck, FiExternalLink } from "react-icons/fi";
import { SiCodepen, SiDiscord, SiGithub } from "react-icons/si";
import { SlSocialLinkedin } from "react-icons/sl";
import { useSoundEffects } from "../../hooks/useSoundEffects";
import SocialLink from "./SocialLink";

const socialLinks = [
  { href: "https://github.com/mohidqx", icon: SiGithub, label: "Github" },
  {
    href: "https://www.linkedin.com/in/mohidqx/",
    icon: SlSocialLinkedin,
    label: "LinkedIn",
  },
  { href: "https://codepen.io/mohidqx", icon: SiCodepen, label: "CodePen" },
  {
    href: "https://discordapp.com/users/mohidqx",
    icon: SiDiscord,
    label: "Discord",
  },
];

const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const container = useRef();
  const { playClick, playHover } = useSoundEffects();
  const email = "mohidqx@proton.me";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    playClick();
    setTimeout(() => setCopied(false), 1500);
  };

  useGSAP(
    () => {
      gsap.from(".contact-animate", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="w-full px-4 md:px-6 py-20 md:py-32 bg-accent/20 text-main-text rounded-t-[2.5rem] md:rounded-t-[5rem]"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="contact-animate text-[10px] md:text-sm uppercase tracking-[0.3em] font-bold mb-8 md:mb-12 opacity-60">
          — Get in touch
        </h2>

        <div className="contact-animate mb-12 md:mb-16 pb-10 group border-b border-accent/30">
          <div className="flex flex-col gap-4">
            <button
              onClick={copyToClipboard}
              onMouseEnter={playHover}
              className="text-left w-full md:w-fit flex flex-col gap-2 group cursor-pointer"
            >
              <h3 className="text-[11vw] md:text-9xl font-black tracking-tighter uppercase leading-[0.85] transition-colors duration-300 group-hover:text-accent">
                Get in <br className="md:hidden" /> Touch
              </h3>

              <div className="flex items-center gap-3 text-accent font-bold uppercase tracking-widest text-xs md:text-lg mt-4">
                {copied ? (
                  <FiCheck className="text-xl" />
                ) : (
                  <FiCopy className="text-xl" />
                )}
                <span className="border-b border-transparent group-hover:border-accent transition-all">
                  {copied ? "Saved to clipboard" : "Click to copy email"}
                </span>
              </div>
            </button>

            <a
              href={`mailto:${email}`}
              onMouseEnter={playHover}
              className="w-fit flex items-center gap-2 mt-4 text-main-text/40 hover:text-main-text transition-all font-medium uppercase tracking-tighter text-[10px] md:text-xs"
            >
              Or open mail client <FiExternalLink />
            </a>
          </div>
        </div>

        <div className="contact-animate flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="space-y-6 w-full">
            <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] font-bold opacity-90 text-accent">
              Socials
            </p>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-8 gap-y-6">
              {socialLinks.map((social) => (
                <SocialLink
                  key={social.label}
                  href={social.href}
                  icon={social.icon}
                  label={social.label}
                  onHover={playHover}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
