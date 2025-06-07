import React from "react";

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-text">
          <img height="100px" width="300px" src="/images/logo.png" alt="logo" />
          <p>
            Packwiz began with one simple mission — make packing and moving
            hassle-free. What started in a small garage has grown into a trusted
            brand that Canadians rely on for quality moving supplies.
          </p>
          <p>
            From boxes to protective wraps, we offer carefully selected products
            that make organization easier and relocation smoother. With quick
            shipping and outstanding service, Packwiz helps you pack with
            confidence.
          </p>
          <a href="/products" className="about-button">
            Browse Products
          </a>
        </div>
        <div className="about-image">
          <img src="/images/aboutimg.png" alt="About Packwiz" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
