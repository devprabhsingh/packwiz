import React from "react";
import "./WhyChooseUs.css"; // import the CSS file

const points = [
  {
    icon: "📦",
    text: "Complete Packing Kits – Ready-to-go kits for 1-bedroom, 2-bedroom, and custom moves.",
  },
  {
    icon: "🚚",
    text: "Free GTA Delivery – Fast, free delivery across Toronto, Brampton, Mississauga, and more.",
  },
  {
    icon: "💪",
    text: "Heavy-Duty Materials – Industrial-grade boxes, wrap, and tape for max protection.",
  },
  {
    icon: "💸",
    text: "Affordable Prices – High-quality packing supplies at competitive prices.",
  },
  {
    icon: "🛠️",
    text: "Trusted by Professionals – Used by restoration and moving companies in the GTA.",
  },
  {
    icon: "🌱",
    text: "Eco-Friendly Options – Recyclable and reusable packing supplies available.",
  },
  {
    icon: "🛒",
    text: "Easy Online Ordering – Simple mobile-friendly checkout, no minimum required.",
  },
  {
    icon: "🤝",
    text: "Responsive Customer Support – Friendly help when you need it, ensuring a smooth experience.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-choose-container">
      <h2 className="why-choose-title">Why Choose Packwiz?</h2>
      <p className="why-choose-intro">
        Moving doesn’t have to be stressful. At Packwiz, we make packing easy,
        affordable, and reliable with trusted supplies delivered to your door.
      </p>
      <div className="why-choose-list">
        {points.map((point, index) => (
          <div key={index} className="why-choose-item">
            <div className="why-choose-icon">{point.icon}</div>
            <p className="why-choose-text">{point.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
