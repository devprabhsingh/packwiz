"use client";

import { useState } from "react";

export default function RequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [msgSent, setMsgSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setMsgSent(false);
    e.preventDefault();

    const { name, email, message } = formData;

    // Basic validations
    if (name.trim().length < 3) {
      alert("Name must be at least 3 characters long.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (message.trim().length < 10) {
      alert("Message should be atleast 10 characters long");
      return;
    }

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await res.json();

      if (res.status === 409) {
        alert(result.message); // e.g., "You already submitted a message..."
      } else if (res.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setMsgSent(true);
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 id="contact-form-header" style={styles.formTitle}>
        Send us a message
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        style={styles.input}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        style={styles.input}
        required
      />

      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        style={styles.textarea}
        rows={5}
        required
      />
      {msgSent && (
        <p style={{ color: "green" }}>
          Message Sent Successfully. Our team will reply you via provided email
          within 48 hours.
        </p>
      )}
      <button type="submit" style={styles.button}>
        Send Message
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  formTitle: {
    fontSize: "1.6rem",
    fontWeight: 600,
    color: "#333",
    textAlign: "center",
    marginBottom: "10px",
  },
  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s",
    boxShadow: "0 2px 5px rgba(0,0,0,0.03)",
  },
  textarea: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    resize: "vertical",
    boxShadow: "0 2px 5px rgba(0,0,0,0.03)",
  },
  button: {
    backgroundColor: "#ff6f20",
    color: "white",
    padding: "14px",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: 500,
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s",
  },
};
