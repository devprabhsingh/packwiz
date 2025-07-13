import React, { useState } from "react";
import styles from "./shipStyles.module.css";
import Image from "next/image";
import discountCodes from "@/data/discountCodes";
import { useCart } from "../../context/CartContext";

const ShippingSummary = ({
  subTotal,
  taxRate,
  taxAmount,
  shipping,
  error,
  loader,
  handleSubmit,
}) => {
  const [discountCode, setDiscountCode] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const { setTotal } = useCart();

  const discountedSubtotal = subTotal - discountValue;
  const finalTotal = (discountedSubtotal + taxAmount + (shipping || 0)).toFixed(
    2
  );

  const handleDiscountApply = () => {
    const found = discountCodes.find(
      (code) => code.code.toLowerCase() === discountCode.trim().toLowerCase()
    );

    if (found) {
      const value =
        found.type === "percent"
          ? (subTotal * found.amount) / 100
          : found.amount;

      const discountedSubtotal = subTotal - value;
      const finalTotal = (
        discountedSubtotal +
        taxAmount +
        (shipping || 0)
      ).toFixed(2);

      setDiscountValue(value);
      setDiscountPercent(found.type === "percent" ? found.amount : 0);
      setDiscountError("");
      setIsDiscountApplied(true);
      setTotal(Number(finalTotal)); // <-- Now uses correct calculated value
    } else {
      setDiscountValue(0);
      setDiscountPercent(0);
      setDiscountError("Invalid discount code");
      setIsDiscountApplied(false);
    }
  };

  return (
    <div>
      <div className={styles.summary}>
        {/* Subtotal section */}
        <div className={styles.summaryLine}>
          <span>Subtotal:</span>
          <span>
            {isDiscountApplied ? (
              <>
                <s style={{ color: "#888" }}>${subTotal.toFixed(2)}</s>{" "}
                <span style={{ color: "green", fontWeight: "bold" }}>
                  ${discountedSubtotal.toFixed(2)}
                </span>
              </>
            ) : (
              `$${subTotal.toFixed(2)}`
            )}
          </span>
        </div>

        {/* Discount code input and button */}
        <div className={styles.summaryLine}>
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
            placeholder="Discount code"
            className={styles.discountInput}
            style={{
              padding: "5px 10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginRight: "10px",
              width: "60%",
            }}
          />
          <button
            onClick={handleDiscountApply}
            style={{
              padding: "5px 12px",
              backgroundColor: "#333",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Apply
          </button>
        </div>

        {/* Success message */}
        {isDiscountApplied && (
          <p
            style={{
              color: "green",
              margin: "4px 0 8px 5px",
              fontSize: "14px",
            }}
          >
            Hurray! You got {discountPercent || `$${discountValue.toFixed(2)}`}%
            off!
          </p>
        )}

        {/* Error message */}
        {discountError && (
          <p className={styles.error} style={{ marginTop: "5px" }}>
            {discountError}
          </p>
        )}

        {/* Tax */}
        <div className={styles.summaryLine}>
          <span>
            Tax{" "}
            <span style={{ color: "grey" }}>
              {Number(taxRate.toFixed(2)) * 100}%
            </span>
            :
          </span>
          <span>${taxAmount.toFixed(2)}</span>
        </div>

        {/* Shipping */}
        <div className={styles.summaryLine}>
          <span>Shipping:</span>
          <span>${shipping?.toFixed(2) || 0}</span>
        </div>

        <hr />

        {/* Final total */}
        <div className={styles.totalBox}>
          <span>Total:</span>
          <span>${finalTotal}</span>
        </div>
      </div>

      {/* Payment Button */}
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
    </div>
  );
};

export default ShippingSummary;
