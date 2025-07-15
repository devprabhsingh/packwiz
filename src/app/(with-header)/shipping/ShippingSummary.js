import React, { useState } from "react";
import styles from "./shipStyles.module.css"; // Ensure this path is correct
import Image from "next/image";
import discountCodes from "@/data/discountCodes"; // Assuming this path is correct
import { useCart } from "../../context/CartContext"; // Assuming this path is correct

const ShippingSummary = ({
  subTotal,
  taxRate,
  taxAmount,
  shipping,
  error, // This error likely comes from a parent component (e.g., related to address validation)
  loader, // This loader likely controls the payment button
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
      // Check if discount has already been applied
      if (isDiscountApplied) {
        setDiscountError("Discount already applied.");
        return;
      }

      const value =
        found.type === "percent"
          ? (subTotal * found.amount) / 100
          : found.amount;

      // Ensure discount doesn't make subtotal negative
      if (value > subTotal) {
        setDiscountError("Discount value exceeds subtotal.");
        setDiscountValue(0); // Reset discount
        setDiscountPercent(0);
        setIsDiscountApplied(false);
        return;
      }

      const newDiscountedSubtotal = subTotal - value;
      const newFinalTotal = (
        newDiscountedSubtotal +
        taxAmount +
        (shipping || 0)
      ).toFixed(2);

      setDiscountValue(value);
      setDiscountPercent(found.type === "percent" ? found.amount : 0);
      setDiscountError("");
      setIsDiscountApplied(true);
      setTotal(Number(newFinalTotal)); // Update context with new total
    } else {
      setDiscountValue(0);
      setDiscountPercent(0);
      setDiscountError("Invalid discount code");
      setIsDiscountApplied(false);
      setTotal(Number(finalTotal)); // Recalculate total without discount
    }
  };

  // Set total on initial render and when dependencies change
  // This useEffect ensures setTotal is always in sync with finalTotal
  // when component re-renders due to parent state changes (subTotal, taxAmount, shipping)
  React.useEffect(() => {
    setTotal(Number(finalTotal));
  }, [finalTotal, setTotal]); // Depend on finalTotal and setTotal

  return (
    <div>
      <div className={styles.summary}>
        {/* Subtotal section */}
        <div className={styles.summaryLine}>
          <span>Subtotal:</span>
          <span>
            {isDiscountApplied ? (
              <>
                <s className={styles.subtotalOldPrice}>
                  ${subTotal.toFixed(2)}
                </s>{" "}
                <span className={styles.subtotalNewPrice}>
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
            onChange={(e) => {
              setDiscountCode(e.target.value.toUpperCase());
              if (isDiscountApplied) {
                // If discount was applied, clear it on input change
                setDiscountValue(0);
                setDiscountPercent(0);
                setDiscountError("");
                setIsDiscountApplied(false);
                // The useEffect will update setTotal with the new non-discounted finalTotal
              }
            }}
            placeholder="Discount code"
            className={styles.discountInput}
          />
          <button
            onClick={handleDiscountApply}
            className={styles.discountApplyBtn}
            disabled={isDiscountApplied} // Disable button if discount is already applied
          >
            {isDiscountApplied ? "Applied" : "Apply"}
          </button>
        </div>

        {/* Success message */}
        {isDiscountApplied && (
          <p className={styles.discountSuccessMessage}>
            Hurray! You got{" "}
            {discountPercent
              ? `${discountPercent}%`
              : `$${discountValue.toFixed(2)}`}{" "}
            off!
          </p>
        )}

        {/* Error message for discount */}
        {discountError && <p className={styles.error}>{discountError}</p>}

        {/* Tax */}
        <div className={styles.summaryLine}>
          <span>
            Tax{" "}
            <span style={{ color: "grey" }}>
              {(taxRate * 100).toFixed(2)}%{" "}
              {/* taxRate might already be a percentage, convert to string safely */}
            </span>
            :
          </span>
          <span>${taxAmount.toFixed(2)}</span>
        </div>

        {/* Shipping */}
        <div className={styles.summaryLine}>
          <span>Shipping:</span>
          <span>${shipping?.toFixed(2) || "0.00"}</span>{" "}
          {/* Ensure 0.00 if shipping is null/undefined */}
        </div>

        <hr />

        {/* Final total */}
        <div className={styles.totalBox}>
          <span>Total:</span>
          <span>${finalTotal}</span>
        </div>
      </div>

      {/* Payment Button */}
      <div className={styles.paymentButtonContainer}>
        {error && <p className={styles.error}>{error}</p>}{" "}
        {/* This error is likely for payment process */}
        <button onClick={handleSubmit} className={styles.proceedPayBtn}>
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
