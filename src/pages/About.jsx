import React from "react";
import AboutHero from "../components/about/AboutHero";
import AboutBio from "../components/about/AboutBio";
import TechStack from "../components/about/TechStack";
import Experience from "../components/about/Experience";
import Achievements from "../components/about/Achievements";
import Certifications from "../components/about/Certifications";

const About = () => {
  return (
    <>
      <AboutHero />
      <AboutBio />
      <TechStack />
      <Experience />
      <Achievements />
      <Certifications />
    </>
  );
};

export default About;
