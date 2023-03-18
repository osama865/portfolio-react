// @flow
import React from "react";
import Themes from "./themes";

function Intro() {
  return (
    <section className="s1" data-aos="slide-up">
      <div className="main-container">
        <div className="greeting-wrapper">
          <h1>Hi , I'm Osama</h1>
        </div>
        <div className="intro-wrapper">
          <div className="nav-wrapper">
            <div className="dots-wrapper">
              <div id="dot-1" className="browser-dot"></div>
              <div id="dot-2" className="browser-dot"></div>
              <div id="dot-3" className="browser-dot"></div>
            </div>

            <div id="navigation">
              <li>
                <a href="https://medium.com/@osama1010">My Blog</a>
              </li>
            </div>
          </div>
          <Themes />
          <div className="right-column">
            <div id="preview-shadow">
              <div id="preview">
                <div id="corner-tl" className="corner"></div>
                <div id="corner-tr" className="corner"></div>
                <h3>Osama</h3>
                <p>Developer & Content Creator</p>
                <div id="corner-br" className="corner"></div>
                <div id="corner-bl" className="corner"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
