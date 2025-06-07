"use client";
import React from "react";
import { useCart } from "../context/CartContext";
import CheckoutPage from "../components/Checkout";
import Link from "next/link";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("Next public key is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Payment() {
  const { total } = useCart();

  if (total === undefined || Number.isNaN(total) || total < 1) {
    return (
      <div style={styles.centered}>
        <p style={styles.errorText}>Sorry! we hit a bump.</p>
        <Link style={styles.button} href="/cart">
          Go back to cart
        </Link>
      </div>
    );
  }

  return (
    <div className="pay-method-wrapper">
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: Math.round(total * 100),
          currency: "cad",
          appearance: {
            theme: "flat",
            variables: {
              colorPrimary: "#ff6f20",
              colorBackground: "#ffffff",
              colorText: "#000000",
              borderRadius: "8px",
            },
          },
        }}
      >
        <CheckoutPage />
      </Elements>
    </div>
  );
}

const styles = {
  centered: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: "8px",
    margin: "10px",
  },
  errorText: {
    fontSize: "1.2rem",
    marginBottom: "1rem",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#ff6f20",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  loaderWrapper: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
};
