import React from "react";
import "../payment/Payment.css";
import { useCart } from "../context/CartContext";

const PaymentMethodSelector = ({ paymentMethod, onSelect }) => {
  const { courierName } = useCart();

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

        {courierName === "Packwiz Delivery" && (
          <button
            onClick={() => onSelect("COD")}
            className={`payment-btn ${paymentMethod === "COD" ? "selected" : ""}`}
          >
            Cash on Delivery (COD)
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
