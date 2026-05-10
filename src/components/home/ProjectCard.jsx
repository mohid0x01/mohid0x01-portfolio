import React, { useRef } from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import MuxPlayer from "@mux/mux-player-react";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ProjectVideoPlayer from "./ProjectVideoPlayer";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, index }) => {
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const bgVideoWrapperRef = useRef(null);

  const videoMedia = project.media.find((m) => m.type === "video");
  const playbackId = videoMedia?.muxPlaybackId;

  useGSAP(
    () => {
      gsap.to(bgVideoWrapperRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(videoWrapperRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="sticky top-0 w-full h-dvh flex items-center justify-center overflow-hidden bg-transparent"
      style={{ zIndex: index + 1 }}
    >
      <Link
        to={`/projects/${project.slug}`}
        data-cursor="View Project"
        className="absolute inset-0 z-30 cursor-pointer"
        aria-label={`View ${project.title} details`}
      />

      <div
        ref={bgVideoWrapperRef}
        className="absolute inset-0 -z-10 w-full h-[120%]"
      >
        <ProjectVideoPlayer playbackId={playbackId} variant="atmosphere" />
      </div>

      <div
        ref={videoWrapperRef}
        className="relative z-10 w-[85%] h-[85%] max-w-5xl aspect-video overflow-hidden rounded-4xl border border-white/10"
      >
        <ProjectVideoPlayer playbackId={playbackId} variant="stage" />
      </div>
      <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
        <div className="w-[85%] h-[85%] max-w-5xl flex flex-col justify-end p-8 md:p-16 relative">
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent -z-10 rounded-4xl" />

          <h3 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6">
            {project.title}
          </h3>
        </div>
      </div>
      <div className="absolute top-10 right-10 text-[15vw] font-black text-accent/30 italic leading-none select-none z-10">
        0{index + 1}
      </div>
    </div>
  );
};
export default ProjectCard;
