import React from "react";
import { PaymentElement } from "@stripe/react-stripe-js";

const StripePaymentForm = ({
  clientSecret,
  stripe,
  total,
  loading,
  errorMessage,
  buttonDisabled,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} style={styles.payform}>
      {clientSecret && stripe ? <PaymentElement /> : <p>Loading...</p>}
      {errorMessage && <div style={styles.error}>{errorMessage}</div>}
      <button
        disabled={buttonDisabled}
        style={buttonDisabled ? styles.disabledStyle : styles.buttonStyle}
      >
        {!loading ? `Pay $${total.toFixed(2)}` : "Processing..."}
      </button>
    </form>
  );
};

const styles = {
  payform: {
    backgroundColor: "white",
    padding: "0.5rem",
    borderRadius: "0.375rem",
  },
  error: {
    color: "red",
    margin: "2px 0",
  },
  disabledStyle: {
    backgroundColor: "#ff6f20",
    color: "white",
    width: "100%",
    padding: "1.25rem",
    marginTop: "0.5rem",
    borderRadius: "0.375rem",
    fontWeight: "bold",
    opacity: 1,
    cursor: "pointer",
    transition: "opacity 0.3s ease",
    opacity: 0.5,
    animation: "pulse 2s infinite",
    cursor: "not-allowed",
  },
  buttonStyle: {
    outline: "none",
    border: "none",
    backgroundColor: "#ff6f20",
    color: "white",
    width: "100%",
    padding: "1.25rem",
    marginTop: "0.5rem",
    borderRadius: "0.375rem",
    fontWeight: "bold",
    fontSize: "16px",
    opacity: 1,
    cursor: "pointer",
    transition: "opacity 0.3s ease",
  },
};
export default StripePaymentForm;
