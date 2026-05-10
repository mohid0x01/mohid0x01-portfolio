import React from "react";
import { projectDetails } from "../../projectsDetails";
import ProjectCard from "./ProjectCard";
import CtaButton from "../CtaButton";

const displayedProjects = projectDetails.slice(0, 5);

const ProjectsSection = () => {
  return (
    <section className="relative w-full px-6">
      <div className="pt-20 pb-10 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 uppercase text-main-text">
            My <span className="text-accent">Projects</span>
          </h2>
          <div className="h-2 w-20 bg-accent" />
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        {displayedProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      <div className="w-full flex justify-center pt-16">
        <CtaButton to="/projects" label="View All Projects" />
      </div>
      <div className="h-[20vh]" />
    </section>
  );
};

export default ProjectsSection;
