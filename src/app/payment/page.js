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
      <div className="centered">
        <p className="errorText">Sorry! we hit a bump.</p>
        <Link className="button" href="/cart">
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
