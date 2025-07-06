import React from "react";
import styles from "./shipStyles.module.css";
import Image from "next/image";

const ShippingRates = ({ options, selectedRate, loading, onSelect }) => {
  return (
    <div className="shipping-rates-box">
      <h3 className={styles.header}>
        <span className="payment-step">3</span>Select your courier
      </h3>

      {options.length > 0 ? (
        options.map((opt, idx) =>
          opt ? (
            <div
              key={idx}
              className={`ship-option ${selectedRate?.price === opt.price ? "selected" : ""}`}
              onClick={() => onSelect(idx)}
            >
              <div className="ship-option-inner">
                {opt.price === 0 && <p style={{ color: "green" }}> Free</p>}
                {opt.price !== 0 && (
                  <p style={{ color: "green" }}>${opt.price}</p>
                )}
                <p>{opt.shipService}</p>
              </div>
              <p>Delivery within {opt.deliveryTime}</p>
              {opt.cod === true && (
                <p className="cod-available">Cash On Delivery Available</p>
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
        <div className="no-options-message">
          Once you enter the address, you will see a list of courier options
          here.
        </div>
      )}
    </div>
  );
};

export default ShippingRates;
