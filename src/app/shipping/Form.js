import React from "react";
import { styles } from "./shipStyles";

const Form = ({
  query,
  selectedAddress,
  setQuery,
  setSelectedAddress,
  results,
  selectAddress,
  setFormData,
  formData,
  fieldErrors,
  setFieldErrors,
  handleSubmit,
}) => {
  const isValidPhone = (phone) => {
    if (phone.length === 10) {
      const phoneRegex = /^\+?1?\s?[-.(]*\d{3}[-.)\s]*\d{3}[-.\s]*\d{4}$/;
      return phoneRegex.test(phone);
    }
    return false;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
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

  const getLabel = (field) => {
    if (field === "streetAddress") return "Street Address";
    if (field === "phone") return "Phone Number";
    if (field === "instructions") return "Delivery Instructions(optional)";
    return field.charAt(0).toUpperCase() + field.slice(1);
  };

  return (
    <>
      <form style={styles.form}>
        <h3 style={styles.header}>
          <span className="payment-step">1</span>Shipping & Payment
        </h3>

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
              <label style={styles.label} htmlFor={field}>
                {getLabel(field)}
              </label>
              <input
                id={field}
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
        <h3 style={styles.header}>
          <span className="payment-step">2</span>Contact Details
        </h3>

        {/* Contact Details */}
        {["name", "email", "phone", "instructions"].map((field, idx) => (
          <React.Fragment key={field}>
            <div style={styles.fieldGroup}>
              <label htmlFor={field} style={styles.label}>
                {getLabel(field)}
              </label>
              <input
                id={field}
                type={field === "phone" ? "tel" : "text"}
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
    </>
  );
};

export default Form;
