import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiGithub, FiExternalLink, FiArrowLeft } from "react-icons/fi";
import ProjectVideoPlayer from "../components/home/ProjectVideoPlayer";
import { useSoundEffects } from "../hooks/useSoundEffects";
import { projectDetails } from "../projectsDetails";
import Badge from "../components/about/Badge";

const ProjectDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { playClick, playHover } = useSoundEffects();

  const project = projectDetails.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-main-text">
        <h1 className="text-4xl font-bold mb-4 uppercase tracking-tighter">
          Project Not Found
        </h1>
        <button
          onClick={() => navigate("/projects")}
          className="text-accent underline uppercase tracking-widest text-xs"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  const videoMedia = project.media.find((m) => m.type === "video");

  return (
    <main className="w-full bg-background min-h-screen">
      <section className="relative py-10 md:py-16 px-6 md:px-12 border-b border-white/5">
        <button
          onClick={() => {
            playClick();
            navigate(-1);
          }}
          onMouseEnter={playHover}
          className="mb-12 flex items-center gap-2 text-main-text hover:text-accent transition-colors font-bold uppercase tracking-widest text-[10px]"
        >
          <FiArrowLeft size={16} /> Back to Gallery
        </button>

        <div className="max-w-6xl mx-auto ">
          <h1 className="text-4xl md:text-[12vw] font-black text-main-text uppercase tracking-tighter leading-[0.9] md:leading-[0.8] mb-12">
            {project.title}
          </h1>

          <div className="h-1 w-24 bg-accent" />
        </div>
      </section>

      <section className="px-6 md:px-12 max-w-6xl mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6">
              <h2 className="text-accent text-[12px] font-bold uppercase tracking-[0.3em]">
                Project Overview
              </h2>
              <p className="text-xl md:text-3xl text-main-text leading-[1.2] tracking-tight">
                {project.subtitle}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 pt-4">
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="group relative px-6 md:px-10 py-4 md:py-5 border border-accent rounded-full overflow-hidden transition-all duration-500 active:scale-95 shadow-xl text-center"
              >
                <div className="absolute inset-0 bg-accent translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />

                <span className="relative z-10 flex items-center justify-center gap-3 text-accent group-hover:text-main-bg font-bold uppercase text-[11px] md:text-[12px] tracking-[0.2em] transition-colors duration-300">
                  Live Experience <FiExternalLink size={18} />
                </span>
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="group relative px-6 md:px-10 py-4 md:py-5 border border-main-text rounded-full overflow-hidden transition-all duration-500 active:scale-95 text-center"
              >
                <div className="absolute inset-0 bg-main-text translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />

                <span className="relative z-10 flex items-center justify-center gap-3 text-main-text group-hover:text-main-bg font-bold uppercase text-[11px] md:text-[12px] tracking-[0.2em] transition-colors duration-300">
                  Source Code <FiGithub size={18} />
                </span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div className="space-y-10">
              <div>
                <h3 className="text-accent text-[12px] font-bold uppercase tracking-[0.3em] mb-6">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tag.split("/").map((tech, i) => (
                    <Badge key={i} text={tech} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-accent text-[12px] font-bold uppercase tracking-[0.3em] mb-2">
                  Timeline
                </h3>
                <p className="text-main-text/80 font-medium text-lg uppercase tracking-tighter">
                  {project.timeline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-10 md:py-16 px-4 md:px-12 pb-32">
        <div className="group relative w-full h-[40vh] md:h-[85vh] rounded-2xl md:rounded-[4rem] overflow-hidden border border-main-text/10 bg-accent/5 shadow-2xl">
          <ProjectVideoPlayer
            playbackId={videoMedia?.muxPlaybackId}
            variant="stage"
          />
          <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-background/20 via-transparent to-transparent" />
        </div>
      </section>
    </main>
  );
};

export default ProjectDetails;
