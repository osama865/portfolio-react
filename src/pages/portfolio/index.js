import React from "react";
import About from "../../components/about";
import Contact from "../../components/contact";
import Intro from "../../components/intro";
import Projects from "../../components/projects";
import Social from "../../components/social";

function Portfolio() {
  return (
    <>
      <Intro />
      <About />
      <Social />
      <Projects />
      <Contact />
    </>
  );
}

export default Portfolio;
