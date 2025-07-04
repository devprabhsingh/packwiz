import React from "react";
import styles from "./shipStyles.module.css";
import Image from "next/image";

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
      <div className={styles.summary}>
        <div className={styles.summaryLine}>
          <span>Subtotal:</span>
          <span>${subTotal.toFixed(2)}</span>
        </div>
        <div className={styles.summaryLine}>
          <span>
            Tax <span style={{ color: "grey" }}>{taxRate * 100}%</span>:
          </span>
          <span>${taxAmount.toFixed(2)}</span>
        </div>
        <div className={styles.summaryLine}>
          <span>Shipping:</span>
          <span>${shipping?.toFixed(2) || 0}</span>
        </div>
        <hr />
        <div className={styles.totalBox}>
          <span>Total:</span>
          <span>${total}</span>
        </div>
      </div>

      <div
        style={{
          margin: "5px 0 5px 5px ",
          padding: "10px",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        {error && <p className={styles.error}>{error}</p>}
        <button onClick={handleSubmit} className="proceed-pay-btn">
          {loader ? (
            <Image
              src="/images/loader.gif"
              height={40}
              width={40}
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
