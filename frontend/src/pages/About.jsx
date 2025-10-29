import React from "react";
import "../styles/about.css";
import aboutImg from "../assets/images/about.jpg";

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-text">
          <h2>
            About <span>TravelWorld</span>
          </h2>
          <p>
            Welcome to <strong>TravelWorld Agency</strong> — your trusted
            partner in discovering the world. Our mission is to help travelers
            experience authentic adventures filled with culture, comfort, and
            unforgettable moments.
          </p>

          <p>
            Since our founding, we’ve connected thousands of explorers with
            breathtaking destinations. From relaxing seaside escapes to
            thrilling mountain hikes, our tours are crafted to inspire and
            refresh your spirit.
          </p>

          <p>
            We believe that travel isn’t just about seeing new places — it’s
            about creating stories, memories, and connections that stay with you
            for a lifetime.
          </p>

          <p className="about-quote">
            “Let’s turn your next trip into a story worth telling.”
          </p>
        </div>

        <div className="about-image">
          <img src={aboutImg} alt="Travel adventure" />
        </div>
      </div>
    </section>
  );
};

export default About;
