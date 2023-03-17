import React from "react";

function Contact() {
  return (
    <section className="s2" data-aos-once="true" data-aos="slide-left">
      <div className="main-container">
        <div>
          <h3 className="fix TextToCenter">Get in touch</h3>

          <form
            id="contact-form"
            name="contact Osama"
            data-netlify
            subject="contact with osama"
            action="/"
            method="POST"
          >
            <label>Name</label>
            <input id="name" className="input-field" type="text" name="name" />

            <label>Subject</label>
            <input
              type="text"
              className="input-field"
              name="subject"
              id="subject"
            />

            <label>Email</label>
            <input
              type="text"
              className="input-field"
              name="email"
              id="email"
            />

            <label>Message</label>
            <textarea
              name="message"
              id="message"
              className="input-field"
            ></textarea>

            <button id="submit-btn" type="submit" value="Send">
              Submitt
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
