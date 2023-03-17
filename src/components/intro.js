// @flow
import React from "react";

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
          <div className="left-column">
            <img
              id="profile_pic"
              src="assets/osama-animated.jpg"
              alt="profile pic"
            />
            <h5 className="TextToCenter">Personalize Theme</h5>

            <div id="theme-options-wrapper">
              <div
                data-mode="light"
                id="light-mode"
                className="theme-dot"
                onClick={() => {
                  console.log("light");
                }}
              ></div>
              <div
                data-mode="blue"
                id="blue-mode"
                className="theme-dot"
                onClick={() => {
                  console.log("blue");
                }}
              ></div>
              <div
                data-mode="green"
                id="green-mode"
                className="theme-dot"
                onClick={() => {
                  console.log("green");
                }}
              ></div>
              <div
                data-mode="purple"
                id="purple-mode"
                className="theme-dot"
                onClick={() => {
                  console.log("purple");
                }}
              ></div>
            </div>

            <p id="settings-note">
              *Theme settings will be saved for <br />
              your next visit
            </p>
          </div>
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
