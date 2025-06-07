// components/Toast.js
import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // Hide after 5 sec

    return () => clearTimeout(timer); // Clean up if unmounted
  }, [onClose]);

  const colors = {
    success: "#4caf50",
    error: "#f44336",
    info: "#2196f3",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: colors[type] || "#333",
        color: "white",
        padding: "15px 20px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        zIndex: 9999,
        maxWidth: "300px",
        fontSize: "14px",
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
