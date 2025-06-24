import React from "react";
import { styles } from "./shipStyles";

const ShippingSummary = ({
  subTotal,
  taxRate,
  taxAmount,
  shipping,
  total,
  error,
  loader,
  handleSubmit,
}) => {
  return (
    <div>
      <div style={styles.summary}>
        <div style={styles.summaryLine}>
          <span>Subtotal:</span>
          <span>${subTotal.toFixed(2)}</span>
        </div>
        <div style={styles.summaryLine}>
          <span>
            Tax <span style={{ color: "grey" }}>{taxRate * 100}%</span>:
          </span>
          <span>${taxAmount.toFixed(2)}</span>
        </div>
        <div style={styles.summaryLine}>
          <span>Shipping:</span>
          <span>${shipping?.toFixed(2) || 0}</span>
        </div>
        <hr />
        <div
          style={{ ...styles.summaryLine, fontWeight: "bold", color: "green" }}
        >
          <span>Total:</span>
          <span>${total}</span>
        </div>
      </div>

      <div
        style={{
          margin: "10px 0 10px 10px ",
          padding: "10px",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        {error && <p style={styles.error}>{error}</p>}
        <button onClick={handleSubmit} className="proceed-pay-btn">
          {loader ? (
            <img
              src="/images/loader.gif"
              style={{ height: 40, width: 40 }}
              alt="loading..."
            />
          ) : (
            "Proceed to payment"
          )}
        </button>
      </div>
      <div />
    </div>
  );
};

export default ShippingSummary;
