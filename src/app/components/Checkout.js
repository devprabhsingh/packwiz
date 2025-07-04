import React, { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import PaymentMethodSelector from "./PaymentMethodSelector";
import StripePaymentForm from "./StripePaymentForm";
import CashOnDeliverySection from "./CashOnDeliverySection";
import { categories } from "@/data/numberSheet";
const idmap = {
  bx: 0,
  mb: 1,
  sw: 2,
  gl: 3,
  ct: 4,
  gt: 5,
  rt: 6,
  gb: 7,
  cv: 8,
  fp: 9,
  np: 10,
  bw: 11,
  pk: 12,
};

const Checkout = () => {
  const router = useRouter();
  const {
    clearCart,
    customerDetail,
    cartItems,
    subTotal,
    total,
    shipFees,
    courierName,
  } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  let buttonDisabled = !stripe || loading;

  useEffect(() => {
    if (
      !total ||
      !customerDetail ||
      !cartItems.length ||
      clientSecret // <- already created
    )
      return;

    const createPaymentIntent = async () => {
      try {
        const res = await fetch("/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: Math.round(total * 100), // in cents
            customerDetail,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setClientSecret(data.clientSecret);
          setTransactionId(data.transactionId);
        } else {
          console.error("Payment Intent Error:", data);
        }
      } catch (err) {
        console.error("Payment intent creation failed:", err);
      }
    };

    createPaymentIntent();
  }, [
    total,
    cartItems.length,
    customerDetail?.email,
    paymentMethod,
    clientSecret,
    customerDetail,
  ]);

  const saveOrder = async () => {
    try {
      const orderData = {
        orderId: `ORD-${Date.now()}`,
        customerName: customerDetail?.name,
        email: customerDetail?.email,
        phone: customerDetail?.phone,
        address: {
          street: customerDetail?.streetAddress,
          city: customerDetail?.city,
          state: customerDetail.state,
          postalCode: customerDetail?.postalCode,
          country: customerDetail?.country,
        },
        instructions: customerDetail?.instructions,
        items: cartItems.map((item) => {
          const prefix = Object.keys(idmap).find((key) =>
            item.id.startsWith(key)
          );
          const unit = prefix ? categories[idmap[prefix]].unit : null;

          return {
            productId: item.id,
            title: item.title,
            quantity: item.qty,
            size: item.size || "",
            desc: item.desc,
            price: item.price,
            unit: unit || "",
          };
        }),
        subTotal,
        shipFees,
        total,
        paymentMethod,
        transactionId: transactionId || "",
        courierName,
        status: "Order Recieved",
      };

      const res = await fetch("/api/saveOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setOrderStatus("Order saved successfully!");
        clearCart();
        return data.order;
      } else {
        setOrderStatus("Failed to save order.");
      }
    } catch (err) {
      console.error("Error saving order:", err);
      setOrderStatus("Error while saving order.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    saveOrder();

    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `https://www.packwiz.ca/payment-success?amount=${total}&transactionId=${transactionId}&type=online`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };
  const handleCOD = async () => {
    buttonDisabled = true;
    setLoading(true);
    try {
      const order = await saveOrder();

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: order,
        }),
      });

      const result = await res.json();

      if (result.success) {
        router.push(
          `/payment-success?amount=${order.total}&type=COD&transactionId=${transactionId}`
        );
      } else {
        console.error("Email sending failed:", result.error);
        alert("Order placed, but email failed to send.");
        router.push(
          `/payment-success?amount=${order.total}&type=COD&transactionId=${transactionId}`
        );
      }
    } catch (err) {
      console.error("Something went wrong during COD processing:", err);
      alert("Failed to process order. Please try again.");
    }
  };

  return (
    <div
      style={{ backgroundColor: "#fff", borderRadius: "8px", padding: "20px" }}
    >
      <h1 style={{ textAlign: "center" }}>
        Your total is{" "}
        <span style={{ color: "green" }}>${total.toFixed(2)}</span>
      </h1>

      <PaymentMethodSelector
        paymentMethod={paymentMethod}
        onSelect={setPaymentMethod}
      />

      {paymentMethod === "Online" && (
        <StripePaymentForm
          clientSecret={clientSecret}
          stripe={stripe}
          total={total}
          loading={loading}
          errorMessage={errorMessage}
          buttonDisabled={buttonDisabled}
          handleSubmit={handleSubmit}
        />
      )}

      {paymentMethod === "COD" && (
        <CashOnDeliverySection
          orderStatus={orderStatus}
          loading={loading}
          handleCOD={handleCOD}
          buttonDisabled={buttonDisabled}
        />
      )}
    </div>
  );
};

export default Checkout;
