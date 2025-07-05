"use client";
import { useState, useRef, useEffect } from "react";

const faqs = [
  {
    question: "Do you ship packing supplies across Canada?",
    answer:
      "Yes, we offer fast and reliable shipping to all provinces and major cities across Canada, including Toronto, Vancouver, Montreal, and more.",
  },
  {
    question: "What's included in your packing kits?",
    answer:
      "Our packing kits typically include boxes, bubble wrap, tape, labels, and other essentials to simplify your move or storage.",
  },
  {
    question: "Are your stretch wraps and tapes industrial-grade?",
    answer:
      "Absolutely! Our stretch wraps, clear tapes, and tuck tapes are industrial-grade, strong, and perfect for both home and commercial use.",
  },
  {
    question: "Can I place bulk or wholesale orders?",
    answer:
      "Yes, we welcome bulk and wholesale orders. Please contact us directly for discounted rates on large quantities.",
  },
  {
    question: "Do you offer eco-friendly packing materials?",
    answer:
      "We offer eco-conscious options like recyclable newsprint packing paper and durable supplies that can be reused multiple times.",
  },
  {
    question: "Where do you offer free delivery in the GTA?",
    answer:
      "We provide free delivery on packing supplies across the Greater Toronto Area, including Brampton, Mississauga, Scarborough, Etobicoke, and North York, for orders over $50.",
  },
  {
    question: "What size moving boxes do you sell?",
    answer:
      "We offer a range of moving box sizes including small, medium, large, and wardrobe boxes to suit apartments, condos, and houses of all sizes.",
  },
  {
    question:
      "Do you supply packing materials for businesses or restoration companies?",
    answer:
      "Yes, we work with restoration companies and businesses across Toronto and the GTA, offering reliable packing materials, fast service, and bulk pricing options.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    contentRefs.current.forEach((el, i) => {
      if (!el) return;
      if (openIndex === i) {
        el.style.maxHeight = el.scrollHeight + "px";
      } else {
        el.style.maxHeight = "0px";
      }
    });
  }, [openIndex]);

  return (
    <div style={styles.faqcover}>
      <section style={styles.section}>
        <h2 style={styles.title}>Frequently Asked Questions</h2>
        <div style={styles.container}>
          {faqs.map((faq, i) => (
            <div key={i} style={styles.item}>
              <button onClick={() => toggle(i)} style={styles.question}>
                {faq.question}
                <span>{openIndex === i ? "−" : "+"}</span>
              </button>
              <div
                ref={(el) => (contentRefs.current[i] = el)}
                style={styles.animatedAnswer}
              >
                <p style={styles.answer}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  faqcover: {
    backgroundColor: "white",
  },
  section: {
    padding: "2rem",
    backgroundColor: "#f8f9fa",
    maxWidth: "900px",
    margin: "5px auto",
    borderRadius: "12px",
  },
  title: {
    fontSize: "1.8rem",
    textAlign: "center",
    marginBottom: "1.5rem",
    fontWeight: "600",
    color: "#222",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  item: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    background: "#fff",
  },
  question: {
    background: "none",
    border: "none",
    width: "100%",
    textAlign: "left",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#333",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  animatedAnswer: {
    maxHeight: "0px",
    overflow: "hidden",
    transition: "max-height 0.4s ease",
  },
  answer: {
    marginTop: "0.75rem",
    fontSize: "1rem",
    lineHeight: "1.5",
    color: "#ff6f20",
  },
};
