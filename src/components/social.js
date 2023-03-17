import React from "react";

function Social() {
  return (
    <section className="s2" data-aos="flip-down">
      <div className="main-container">
        <div className="about-wrapper">
          <div className="social-links">
            <h3>Find me on</h3>
            <div className="images">
              <img src="assets/medium.png" alt="follow" id="social_img" />
              <br />
              <img src="assets/github.png" alt="follow" id="social_img" />
            </div>

            <div className="imgs">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/osama865"
              >
                <img className="logo" src="/assets/github-logo.png" alt="" />
              </a>
              <br />
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/osama-ibrahim-a854841a5"
              >
                <img className="logo" src="/assets/linkedin.png" alt="" />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/Osam1010"
              >
                <img className="logo" src="/assets/twitter-logo.png" alt="" />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://medium.com/@osama1010"
              >
                <img className="logo" src="/assets/medium-logo.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Social;
