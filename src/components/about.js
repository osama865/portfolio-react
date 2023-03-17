import React from "react";

function About() {
  return (
    <section className="s2" data-aos="flip-down">
      <div className="main-container">
        <div className="about-wrapper">
          <div className="about-me">
            <h2 className="TextToCenter">About Me</h2>
            <h5 className="upper-case">
              Developer, content Creator, Dreamer and Ever so ofetn a Human.
            </h5>
            <p>
              I am a Full-Stack developer with +3 years of experience building
              web applications and servers. Most of my project's stack is MERN
              stack, React for building reusable and interactive UI components,
              Nodejs to run my server code and handle database's connections,
              Expressjs to mange my server and routes, MongoDB or MySQL for
              database.
            </p>
            <p>
              While I keep busy teaching courses and writing content on Medium,
              Dev.to and Twitter, I still take interviews in search of a great
              team & projects that interest me.
            </p>
            <hr />

            <h4>TOP EXPERTISE AND SKILLS</h4>
            <p>
              Fullstack developer with primary focus on Node.js + React (MERN
              STACK):
              <a target="_blank" href="assets/Resume-Osama-Ibrahim (2).pdf">
                Download Resume
              </a>
            </p>
            <div id="skills">
              <div className="">
                <li>React.js</li>
                <li>Node.js</li>
                <li>Javascript Libraries and Frameworks</li>
                <li>Web Technologies PWA, IndexedDB, Web Workers</li>
                <li>Scripting Languages: PHP, Python, Javascript</li>
                <li>CMS Platforms Project Management Contentful</li>
                <li>Teamwork and Collaboration</li>
                <li>Databases: Firebase, MYSQL, MongoDB</li>
                <li>Express.js</li>
                <li>Meteor.js</li>
                <li>Socket.io</li>
                <li>Time Management and Prioritization</li>
                <li>Develop Web and Application Servers</li>
                <li>Front-End Skills: HTML, CSS Responsive Web Design</li>
              </div>

              <div className="">
                <li>Structures and Algorithms</li>
                <li>Source and Version Control: Git, Github</li>
                <li>Strong Interpersonal and Communication Skills</li>
                <li>Programming Languages: C++, C#, Python</li>
                <li>API Design and Development</li>
                <li>Software Testing TDD</li>
                <li>Standards Analytical Thinking and Problem Solving</li>
                <li>JavaScript</li>
                <li>Linux Environments</li>
                <li>UX & UI Designing</li>
                <li>Design Design Software: Figma</li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
