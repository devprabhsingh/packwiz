"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import router for redirection
import { getAddresses, getShipCharge } from "@/utils";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import { LocateOff } from "lucide-react";

const ShippingInfo = () => {
  const router = useRouter();
  const { subTotal, setTotal, setCustomerDetail, setShipFees, setCourierName } =
    useCart();
  const [formData, setFormData] = useState({
    streetAddress: localStorage.getItem("streetAddress") || "",
    city: localStorage.getItem("city") || "",
    state: localStorage.getItem("state") || "",
    postalCode: localStorage.getItem("postalCode") || "",
    country: localStorage.getItem("country") || "",
    phone: localStorage.getItem("phone") || "",
    email: localStorage.getItem("email") || "",
    confirmEmail: localStorage.getItem("email") || "",
    name: localStorage.getItem("name") || "",
  });
  const [fullAddress, setFullAddress] = useState("");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [results, setResults] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [loader, setLoader] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [shipRateOpts, setShipRateOpts] = useState([]);
  const [selectedRate, setSelectedRate] = useState({});

  const safeSubTotal =
    typeof subTotal === "number" ? subTotal : parseFloat(subTotal) || 0;

  const taxRate = 0.13; // 13% tax
  const taxAmount = safeSubTotal * taxRate;
  const total = safeSubTotal + taxAmount + (selectedRate?.price || 0);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const getRes = async () => {
      const addresses = await getAddresses(query);
      setResults(addresses);
    };

    getRes();
  }, [query]);

  const getShip = async (a) => {
    setLoading2(true);
    let rates = await getShipCharge(a, subTotal);
    rates[1].price = Number((rates[1].price * 1.05).toFixed(2));
    rates[2].price = Number((rates[2].price * 1.051).toFixed(2));
    setShipRateOpts(rates);
    setSelectedRate(rates[0]);
  };

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem("full_address"));
    if (a) {
      getShip(a);
    }
  }, []);

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

        case "streetAddress":
        case "city":
        case "state":
        case "postalCode":
        case "country":
          if (!value.trim()) {
            newErrors[name] =
              `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
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

    if (formData.name?.trim().length < 3)
      errors.name = "Name should be atleast 3 characters";
    if (!formData.email?.trim()) errors.email = "Email is required";
    if (!isValidEmail(formData.email.trim()))
      errors.email = "Email is not valid";
    if (!isValidPhone(formData.phone.trim()))
      errors.phone = "Phone Number not valid";
    if (!formData.streetAddress?.trim())
      errors.streetAddress = "Street address is required";
    if (!formData.city?.trim()) errors.city = "City is required";
    if (!formData.state?.trim()) errors.state = "State is required";
    if (!formData.postalCode?.trim())
      errors.postalCode = "Postal code is required";
    if (!formData.country?.trim()) errors.country = "Country is required";
    if (!formData.confirmEmail?.trim())
      errors.confirmEmail = "Please confirm your email";
    else if (formData.email?.trim() !== formData.confirmEmail.trim())
      errors.confirmEmail = "Emails do not match";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setCourierName(selectedRate.courierName);
    if (!validateForm()) {
      setError("Please fix the errors before proceeding.");
      return;
    }
    setError("");
    setCustomerDetail(formData);
    setLoader(true);

    localStorage.setItem("streetAddress", formData.streetAddress);
    localStorage.setItem("city", formData.city);
    localStorage.setItem("state", formData.state);
    localStorage.setItem("postalCode", formData.postalCode);
    localStorage.setItem("country", formData.country);
    localStorage.setItem("phone", formData.phone);
    localStorage.setItem("email", formData.email);
    localStorage.setItem("name", formData.name);
    localStorage.setItem("full_address", JSON.stringify(fullAddress));

    router.push("/payment"); // Redirect to payment page
  };

  const selectAddress = (a) => {
    setSelectedAddress(a.properties.full_address);
    setFullAddress(a);
    setResults([]);
    setFieldErrors({});

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
    getShip(a);
  };

  const selectShipRate = (i) => {
    setSelectedRate(shipRateOpts[i]);
    let shipRate = Number(shipRateOpts[i].price.toFixed(2));
    setShipFees(shipRate);
    const tot = Number((safeSubTotal + shipRate + taxAmount).toFixed(2));
    setTotal(tot);
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
        padding: "10px 0",
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
      </form>
      <div className="shipping-rates-box">
        <h2 style={styles.header}>
          <span className="payment-step">3</span>Select your courier
        </h2>
        {shipRateOpts.length > 0 ? (
          shipRateOpts.map((option, index) =>
            option?.price ? (
              <div
                className={`ship-option ${selectedRate.price === shipRateOpts[index].price ? "selected" : ""}`}
                key={index}
                onClick={() => selectShipRate(index)}
              >
                <div className="ship-option-inner">
                  <p>{option.courierName}</p>
                  <p>{option.price}</p>
                </div>
                <p>Delivery within {option.deliveryTime}</p>
                {/* Conditional rendering for "Cash On Delivery Available" */}
                {index === 0 && (
                  <p className="cod-available">Cash On Delivery Available</p>
                )}
              </div>
            ) : null
          )
        ) : (
          <i className="no-options-message">
            Once you enter the address, you will see a list of courier options
            here
          </i>
        )}

        {loading2 && Object.keys(selectedRate).length === 0 && (
          <div style={{ height: "40px", width: "40px", margin: "auto" }}>
            <img src="images/loader.gif" alt="loading.." />
          </div>
        )}

        {Object.keys(selectedRate).length === 0}

        {/* Payment Summary */}
        {Object.keys(selectedRate).length > 0 && (
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
              <span>${selectedRate.price.toFixed(2)}</span>
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

        {/* Global Error */}
        {error && <p style={styles.error}>{error}</p>}
        {/* Proceed Button */}
        <button onClick={handleSubmit} className="proceed-pay-btn">
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
