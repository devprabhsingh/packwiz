"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./PaymentSuccess.css";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const amount = parseFloat(searchParams.get("amount") || "0");
  const transactionId = searchParams.get("transactionId");
  const type = searchParams.get("type");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
    window.history.pushState(null, "", window.location.href);

    const onPopState = () => {
      // User pressed back button, redirect to home page instead
      router.replace("/");
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [transactionId, router]);

  const handleCopy = () => {
    if (transactionId) {
      navigator.clipboard.writeText(transactionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="success-page">
      <div className="success-card">
        {loading && (
          <div className="email-loading">
            <img
              src="/images/loader.gif"
              alt="Loading"
              height={30}
              width={30}
            />
            <p>Sending you the email confirmation...</p>
          </div>
        )}

        {!loading && (
          <>
            <p className="success-message">Thank you for your purchase!</p>
            {type === "online" ? (
              <p className="success-amount">
                Amount Paid: <strong>${amount.toFixed(2)}</strong>
              </p>
            ) : (
              <>
                <p className="success-amount">
                  Amount Pending <strong>${amount.toFixed(2)}</strong>
                </p>
                <p className="cod-message">
                  You have opted for{" "}
                  <span className="cod-tag">Cash on Delivery</span>. You will
                  receive a call from us to confirm your delivery address.
                </p>
              </>
            )}
            <p className="success-status">
              <img height="30" width="30" src="/images/check.png" alt="ok" />{" "}
              Order receipt successfully sent to your provided email.
            </p>

            {transactionId && (
              <div className="transaction-box">
                <p className="transaction-label">Transaction ID</p>
                <div className="transaction-row">
                  <code className="transaction-id">{transactionId}</code>
                  <button onClick={handleCopy} className="copy-button">
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="tracking-note">
                  You can use this ID to track your order status.
                </p>
              </div>
            )}

            <div className="divider" />
            <p className="help-text">
              If you need to make any changes to your order, please reply to the
              confirmation email or call us at <strong>437 775 7688</strong>.
              We're happy to help!
            </p>
            <Link href="/" className="success-button">
              Back to Home
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
