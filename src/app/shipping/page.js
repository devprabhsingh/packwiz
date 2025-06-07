"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import router for redirection
import { getAddresses, getShipCharge } from "@/utils";
import { useCart } from "../context/CartContext";
import Link from "next/link";

const ShippingInfo = () => {
  const router = useRouter();
  const { subTotal, setTotal, setCustomerDetail, setShipFees } = useCart();
  const [formData, setFormData] = useState({
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
    email: "",
    confirmEmail: "",
    name: "",
  });
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [shipPrice, setShipPrice] = useState(0);
  const [loader, setLoader] = useState(false);
  const safeSubTotal =
    typeof subTotal === "number" ? subTotal : parseFloat(subTotal) || 0;

  const taxRate = 0.13; // 13% tax
  const taxAmount = safeSubTotal * taxRate;
  const total = safeSubTotal + taxAmount + (shipPrice || 0);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    const getRes = async () => {
      const addresses = await getAddresses(query);
      setResults(addresses);
    };

    getRes();
  }, [query]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time field-level validation
    setFieldErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      switch (name) {
        case "name":
          if (value.trim().length < 3) {
            newErrors[name] = "Name should be at least 3 characters";
          } else {
            delete newErrors[name];
          }
          break;

        case "email":
          if (!value.trim()) {
            newErrors[name] = "Email is required";
          } else if (!isValidEmail(value.trim())) {
            newErrors[name] = "Email is not valid";
          } else {
            delete newErrors[name];
          }

          // Check if confirmEmail exists and doesn't match
          if (
            formData.confirmEmail &&
            formData.confirmEmail.trim() !== value.trim()
          ) {
            newErrors.confirmEmail = "Emails do not match";
          } else {
            delete newErrors.confirmEmail;
          }
          break;

        case "confirmEmail":
          if (!value.trim()) {
            newErrors.confirmEmail = "Please confirm your email";
          } else if (value.trim() !== formData.email.trim()) {
            newErrors.confirmEmail = "Emails do not match";
          } else {
            delete newErrors.confirmEmail;
          }
          break;

        case "phone":
          if (!isValidPhone(value.trim())) {
            newErrors[name] = "Phone Number not valid";
          } else {
            delete newErrors[name];
          }
          break;

        default:
          break;
      }

      return newErrors;
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    if (phone.length === 10) {
      const phoneRegex = /^\+?1?\s?[-.(]*\d{3}[-.)\s]*\d{3}[-.\s]*\d{4}$/;
      return phoneRegex.test(phone);
    }
    return false;
  };

  const validateForm = () => {
    let errors = {};

    if (formData.name.trim().length < 3)
      errors.name = "Name should be atleast 3 characters";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!isValidEmail(formData.email.trim()))
      errors.email = "Email is not valid";
    if (!isValidPhone(formData.phone.trim()))
      errors.phone = "Phone Number not valid";
    if (!formData.streetAddress.trim())
      errors.streetAddress = "Street address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.state.trim()) errors.state = "State is required";
    if (!formData.postalCode.trim())
      errors.postalCode = "Postal code is required";
    if (!formData.country.trim()) errors.country = "Country is required";
    if (!formData.confirmEmail.trim())
      errors.confirmEmail = "Please confirm your email";
    else if (formData.email.trim() !== formData.confirmEmail.trim())
      errors.confirmEmail = "Emails do not match";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!validateForm()) {
      setError("Please fix the errors before proceeding.");
      return;
    }
    setError("");
    setCustomerDetail(formData);
    setLoader(true);
    router.push("/payment"); // Redirect to payment page
  };

  const selectAddress = (a) => {
    setSelectedAddress(a.properties.full_address);
    setResults([]);

    const context = a.properties.context;

    setFormData({
      streetAddress: context?.address?.name || "",
      city: context?.place?.name || "",
      state: context?.region?.name || "",
      postalCode: context?.postcode?.name || "",
      country: context?.country?.name || "",
      phone: formData.phone, // Keep previous
      email: formData.email,
      name: formData.name,
    });

    const getShip = async () => {
      const rates = await getShipCharge(a, subTotal);
      console.log(rates.lowestPriceRate.serviceName);
      console.log(rates);
      setShipPrice(rates.myRate);
      let ship = rates.myRate;
      setShipFees(Number(ship.toFixed(2)));
      const tot = Number((safeSubTotal + ship + taxAmount).toFixed(2));
      setTotal(tot);
    };

    getShip();
  };

  if (subTotal < 10) {
    return (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <Link
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
          }}
          href="/cart"
        >
          Go back to cart
        </Link>
      </div>
    );
  }
  return (
    <div
      className="shipping-box"
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "30px 0",
      }}
    >
      <form style={styles.form}>
        <h2 style={styles.header}>
          <span className="payment-step">1</span>Shipping & Payment
        </h2>

        {/* Address Search Field */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Start typing your address</label>
          <textarea
            name="address"
            value={selectedAddress || query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedAddress("");
            }}
            style={{
              ...styles.input,
              height: "auto",
              minHeight: "50px",
              resize: "none",
              overflow: "hidden",
              lineHeight: "1.5",
            }}
            rows={2}
            className="address-input"
            required
          />
          {results.length > 0 && (
            <div className="address-results">
              {results.map((a, index) => (
                <button
                  style={{
                    display: "block",
                    width: "95%",
                    padding: "10px",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    selectAddress(a);
                  }}
                  key={index}
                >
                  {a.properties.full_address}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Address Fields */}
        {["streetAddress", "city", "state", "postalCode", "country"].map(
          (field) => (
            <div key={field} style={styles.fieldGroup}>
              <label style={styles.label}>
                {field === "streetAddress"
                  ? "Street Address"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                style={styles.input}
              />
              {fieldErrors[field] && (
                <p style={styles.error}>{fieldErrors[field]}</p>
              )}
            </div>
          )
        )}
      </form>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.header}>
          <span className="payment-step">2</span>Contact Details
        </h2>

        {/* Contact Details */}
        {["name", "email", "phone"].map((field, idx) => (
          <React.Fragment key={field}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                {field === "phone"
                  ? "Phone Number"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "phone" ? "number" : "text"}
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                style={styles.input}
                required
                inputMode={field === "phone" ? "numeric" : undefined}
                onWheel={(e) => field === "phone" && e.target.blur()} // hide spinner
              />
              {fieldErrors[field] && (
                <p style={styles.error}>{fieldErrors[field]}</p>
              )}
            </div>

            {field === "email" && (
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Confirm Email</label>
                <input
                  type="text"
                  name="confirmEmail"
                  value={formData.confirmEmail || ""}
                  onChange={handleChange}
                  style={styles.input}
                />
                {fieldErrors.confirmEmail && (
                  <p style={styles.error}>{fieldErrors.confirmEmail}</p>
                )}
              </div>
            )}
          </React.Fragment>
        ))}

        {/* Global Error */}
        {error && <p style={styles.error}>{error}</p>}
      </form>
      <div className="shipping-rates-box">
        <h2>Select your courier</h2>
        <div>
          <div>
            <p>Canpar</p>
            <p>$20</p>
          </div>
          <p> Delivery within 3-4 working days</p>
        </div>

        {/* Payment Summary */}
        {shipPrice > 0 && (
          <div style={styles.summary}>
            <div style={styles.summaryLine}>
              <span>Subtotal:</span>
              <span>${safeSubTotal.toFixed(2)}</span>
            </div>
            <div style={styles.summaryLine}>
              <span>Tax (13%):</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div style={styles.summaryLine}>
              <span>Shipping:</span>
              <span>${shipPrice.toFixed(2)}</span>
            </div>
            <hr />
            <div
              style={{
                ...styles.summaryLine,
                fontWeight: "bold",
                color: "green",
              }}
            >
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Proceed Button */}
        <button type="submit" className="proceed-pay-btn" disabled={loading}>
          {loader ? (
            <img
              style={{ height: "40px", width: "40px" }}
              src="/images/loader.gif"
              alt="Loading..."
            />
          ) : (
            "Proceed to payment"
          )}
        </button>
      </div>
    </div>
  );
};

export default ShippingInfo;

const styles = {
  form: {
    padding: "24px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    position: "relative",
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },
  fieldGroup: {
    width: "100%",
    marginBottom: "16px",
    position: "relative",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "500",
    fontSize: "14px",
  },
  input: {
    width: "93%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },

  error: {
    marginTop: "10px",
    color: "red",
    fontSize: "13px",
    textAlign: "center",
  },
  shipping: {
    marginTop: "36px",
    fontSize: "16px",
    fontWeight: "500",
    textAlign: "center",
  },
  summary: {
    marginTop: "20px",
    padding: "15px",
    background: "white",
    borderRadius: "8px",
  },
  summaryLine: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
};
