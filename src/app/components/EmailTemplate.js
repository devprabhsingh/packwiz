import * as React from "react";

export const EmailTemplate = ({
  name,
  phone,
  email,
  address,
  cartItems,
  paymentMethod,
  subTotal,
  shipFees,
  total,
  transactionId,
  courierName,
}) => {
  const firstName = name?.split(" ")[0] || "Customer";

  return (
    <div
      style={{
        fontFamily: "'Inter', Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        padding: "8px",
        color: "#333",
      }}
    >
      <div
        style={{
          maxWidth: "650px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          padding: "8px",
        }}
      >
        <h2 style={{ color: "#ff6f20", marginTop: 0 }}>
          Hi {firstName.charAt(0).toUpperCase() + firstName.slice(1)},
        </h2>
        <p style={{ fontSize: "15px" }}>
          Thank you for your order! Below are your order details.
        </p>

        <div
          style={{
            height: "3px",
            width: "100px",
            backgroundColor: "#ff6f20",
            margin: "20px 0",
            borderRadius: "2px",
          }}
        ></div>

        <h3 style={{ color: "#222" }}>Customer Information</h3>
        <p>
          <strong>Name:</strong> {name.charAt(0).toUpperCase() + name.slice(1)}
        </p>
        <p>
          <strong>Phone:</strong> {phone}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Delivery address:</strong> {address}
        </p>

        <div
          style={{
            height: "1px",
            backgroundColor: "#e0e0e0",
            margin: "30px 0",
          }}
        ></div>

        <h3 style={{ color: "#222" }}>Order Summary</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#ff6f20", color: "#fff" }}>
              <th style={thStyle}>Product</th>
              <th style={thStyle}>Size</th>
              <th style={thStyle}>Quantity</th>
              <th style={thStyle}>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map((item, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#fff" : "#f5f5f5",
                }}
              >
                <td style={tdStyle}>{item.title}</td>
                <td style={tdStyle}>{item.size}</td>
                <td style={tdStyle}>
                  {item.qty || item.quantity} {item.unit}
                </td>
                <td style={tdStyle}>${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ textAlign: "right", fontSize: "15px" }}>
          <p>
            <strong>Subtotal:</strong> ${subTotal.toFixed(2)}
          </p>
          <p>
            <strong>Tax (13%):</strong> ${(Number(subTotal) * 0.13).toFixed(2)}
          </p>
          <p>
            <strong>Shipping Fee:</strong> ${shipFees.toFixed(2)}
          </p>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "bold",
              color: "#ff6f20",
              marginTop: "10px",
            }}
          >
            Total: ${total.toFixed(2)}
          </p>
        </div>

        <p style={{ marginTop: "20px" }}>
          <strong>Payment Method:</strong> {paymentMethod}
        </p>
        <p>
          <strong>Selected Courier:</strong> {courierName}
        </p>
        {transactionId && (
          <p>
            <strong>Transaction ID:</strong> {transactionId}
          </p>
        )}

        <div
          style={{
            height: "1px",
            backgroundColor: "#e0e0e0",
            margin: "30px 0",
          }}
        ></div>

        <p style={{ fontSize: "14px" }}>
          If you need to change your delivery address , please reply to this
          email or call us at <a href="tel:4377757688">+1 437-775-7688</a>.
        </p>

        <a
          href="http://www.localhost:3000/track-order"
          style={{
            display: "inline-block",
            backgroundColor: "#ff6f20",
            color: "#fff",
            padding: "12px 24px",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "600",
            margin: "25px 0 0 0",
          }}
        >
          Track My Order
        </a>

        <p style={{ marginTop: "30px", fontSize: "15px" }}>
          Thank you for shopping with us!
        </p>
        <p style={{ color: "#ff6f20", fontWeight: "bold", fontSize: "16px" }}>
          – Packwiz
        </p>
      </div>
    </div>
  );
};

const thStyle = {
  padding: "12px 10px",
  textAlign: "left",
  fontWeight: "600",
  border: "1px solid #ddd",
};

const tdStyle = {
  padding: "10px",
  textAlign: "left",
  border: "1px solid #ddd",
  color: "#444",
};
