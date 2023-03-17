import React from "react";
import projects from "../constants/projects"

console.log(projects);

function Projects() {
  return (
    <section className="s1" data-aos="slide-right">
      <div className="main-container">
        <h2 className="TextToCenter">Some of My Projects</h2>
        <div id="projects" className="post-wrapper">
          {projects.map(
            ({ name, SourceLink, description, image, liveLink }) => {
              return (
                <div className="post">
                  <img src={image} alt="" className="thumbnail" />
                  <div className="post-preview">
                    <h4 className="post-title upper-case">{name}</h4>
                    <p className="post-intro">{description}</p>
                    <div className="links">
                      <a href={liveLink} target="_blank" rel="noreferrer">
                        Visit
                      </a>
                      <a href={SourceLink} target="_blank" rel="noreferrer">
                        Source Code
                      </a>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}

export default Projects;
