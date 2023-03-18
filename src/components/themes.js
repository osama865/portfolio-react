import React from "react";

export default function Themes() {
  return (
    <div className="left-column">
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
  );
}
