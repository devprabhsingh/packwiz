import React from "react";
import styles from "./shipStyles.module.css"; // Import the CSS module
import Image from "next/image";
// Removed: import clsx from "clsx";

const ShippingRates = ({ options, selectedRate, loading, onSelect }) => {
  return (
    <div className={styles.shippingratesbox}>
      <h3 className={styles.header}>
        <span className={styles.headerPaymentStep}>3</span>Select your courier
      </h3>

      {options.length > 0 ? (
        options.map((opt, idx) =>
          opt ? (
            <div
              key={idx}
              // Manually construct the class string
              className={`${styles.shipOption} ${
                selectedRate?.price === opt.price ? styles.selected : ""
              }`}
              onClick={() => onSelect(idx)}
            >
              <div className={styles.shipOptionInner}>
                {opt.price === 0 && <p style={{ color: "green" }}> Free</p>}
                {opt.price !== 0 && (
                  <p style={{ color: "green" }}>${opt.price}</p>
                )}
                <p>{opt.shipService}</p>
              </div>
              <p>Delivery within {opt.deliveryTime}</p>
              {opt.cod === true && (
                <p className={styles.codAvailable}>
                  Cash On Delivery Available
                </p>
              )}
            </div>
          ) : null
        )
      ) : loading ? (
        <div className={styles.loader}>
          <Image
            src="/images/loader.gif"
            height={40}
            width={40}
            alt="Loading..."
          />
        </div>
      ) : (
        <div className={styles.noOptionsMessage}>
          Once you enter the address, you will see a list of courier options
          here.
        </div>
      )}
      <p className={styles.noteText}>
        Note - Final Delivery times can differ. If there is a change, you will
        be notified by email.
      </p>
    </div>
  );
};

export default ShippingRates;
