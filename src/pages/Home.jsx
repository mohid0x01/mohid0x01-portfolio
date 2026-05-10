import React from "react";
import HeroContent from "../components/home/HeroContent";
import MarqueeContent from "../components/home/MarqueeContent";
import ProjectsSection from "../components/home/ProjectsSection";
import AboutPreview from "../components/home/AboutPreview";
import ContactSection from "../components/home/ContactSection";
import GithubSection from "../components/home/GithubSection";

const Home = () => {
  return (
    <>
      <HeroContent />
      <MarqueeContent />
      <ProjectsSection />
      <AboutPreview />
      <GithubSection />
      <ContactSection />
    </>
  );
};

export default Home;
