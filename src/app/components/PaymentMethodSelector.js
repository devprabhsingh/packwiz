// components/PaymentMethodSelector.js

import React from "react";
import "../payment/Payment.css";

const PaymentMethodSelector = ({ paymentMethod, onSelect }) => {
  return (
    <div className="payment-method-container">
      <h2>Select a payment method</h2>
      <div className="payment-buttons">
        <button
          onClick={() => onSelect("Online")}
          className={`payment-btn ${paymentMethod === "Stripe" ? "selected" : ""}`}
        >
          <span className="btn-left">Debit / Credit Card</span>
          <span style={{ marginLeft: "5px" }}>/</span>
          <img src="/images/google-pay.png" alt="Google Pay" />
        </button>

        <button
          onClick={() => onSelect("COD")}
          className={`payment-btn ${paymentMethod === "COD" ? "selected" : ""}`}
        >
          Cash on Delivery (COD)
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
