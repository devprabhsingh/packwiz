// app/track/page.js
"use client";
import React, { useEffect, useState } from "react";
import "./track.css";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function TrackOrderPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [transactionId, setTransactionId] = useState("");
  const [email, setEmail] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id?.length === 27) {
      fetchOrder(`tx=${id}`);
    }
  }, [id]);
  const fetchOrder = async (queryParam) => {
    setLoading(true);
    if (queryParam == "" || queryParam.length < 8) {
      setLoading(false);
      setError("Enter valid ID or Email");
      return;
    }
    try {
      const res = await fetch(`/api/track?${queryParam}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setOrderData(data);
      setLoading(false);
      setError("");
    } catch (err) {
      setOrderData(null);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="track-container">
      {!orderData && (
        <div>
          <h2>Track Your Order</h2>

          <div className="track-inputs">
            <input
              name="transactionId"
              type="text"
              placeholder="Enter Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
            <button onClick={() => fetchOrder(`tx=${transactionId}`)}>
              Track by Transaction
            </button>
          </div>
          <p className="or">OR</p>
          <div className="track-inputs">
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={() => fetchOrder(`email=${email}`)}>
              Track by Email
            </button>
          </div>
          {error && <p className="error-msg">{error}</p>}
          <div style={{ width: "fit-content", margin: "auto" }}>
            {loading && (
              <Image
                height={40}
                width={40}
                src="/images/loader.gif"
                alt="loading"
              />
            )}
          </div>
        </div>
      )}
      {orderData && (
        <div className="order-card">
          {Array.isArray(orderData) ? (
            orderData.map((order) => (
              <OrderDetails key={order._id} order={order} />
            ))
          ) : (
            <OrderDetails order={orderData} />
          )}
        </div>
      )}
    </div>
  );
}

function OrderDetails({ order }) {
  const orderDate = new Date(order.createdAt).toLocaleString();
  return (
    <div className="order-details">
      <div>
        <h4 style={{ marginBottom: 0 }}>Transaction ID:</h4>
        <p style={{ marginTop: "2px", width: "80%", wordBreak: "break-word" }}>
          {order.transactionId}
        </p>
      </div>
      <p className={`status-badge`}>
        Status: {order.status ? order.status : "Order Recieved"}
      </p>
      <i style={{ display: "block" }}>Order placed on {orderDate}</i>
      <div className="section">
        <h4>Customer Info</h4>
        <div>
          {" "}
          <p className="order-date">Order Received: {orderDate}</p>Name:{" "}
          {order.customerName}
        </div>
        <p>Email: {order.email}</p>
        <p>Phone: {order.phone}</p>
      </div>

      <div className="section">
        <h4>Shipping Address</h4>
        <p>
          {order.address.street}, {order.address.city}, {order.address.state},{" "}
          {order.address.country}
        </p>
      </div>

      <div className="section">
        <h4>Items</h4>
        {order.items.map((item) => (
          <div key={item._id} className="item">
            <p>
              <strong>{item.title}</strong> — {item.size} × {item.quantity}unit
            </p>
            <p>{item.desc}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </div>

      <div className="section totals">
        <p>Subtotal: ${order.subTotal}</p>
        <p>Shipping: ${order.shipFees}</p>
        <p>
          <strong>
            Total: <span style={{ color: "green" }}>${order.total}</span>
          </strong>
        </p>
      </div>
      <p
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "5px",
          border: "1px solid #888",
        }}
      >
        Payment Method : {order.paymentMethod}
      </p>
      <p>If you want to make any changes to your order, please contact us.</p>
      <button
        onClick={() => (window.location.href = "/track-order")}
        style={{
          display: "block",
          padding: "10px 20px",
          backgroundColor: "#ff6f20",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          textDecoration: "none",
          fontWeight: "bold",
          width: "fit-content",
          margin: "auto",
        }}
        href="/track-order"
      >
        Track Another Order
      </button>
    </div>
  );
}
