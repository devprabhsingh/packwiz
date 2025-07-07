"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "./PaymentSuccess.css";

export default function PaymentSuccessClient() {
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
      router.replace("/");
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
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
            <Image
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
                  Amount Pending: <strong>${amount.toFixed(2)}</strong>
                </p>
                <p className="cod-message">
                  You have opted for{" "}
                  <span className="cod-tag">Cash on Delivery</span>. You will
                  receive a call or email from us to confirm your delivery
                  address.
                </p>
              </>
            )}
            <p className="success-status">
              <Image height={30} width={30} src="/images/check.webp" alt="ok" />{" "}
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
            <strong style={{textAlign:'center'}}>Please check your spam folder in case order confirmation email lands there.</strong>
            <div className="divider" />
            <p className="help-text">
              If you need to make any changes to your order, please reply to the
              confirmation email or call us at <strong>437 775 7688</strong>.
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
