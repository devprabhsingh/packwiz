import React from "react";
import styles from "./shipStyles.module.css";

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
  const canadianProvinces = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon",
  ];

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
    if (field === "unit") return "Unit No./Apartment No.(if any)";
    if (field === "instructions") return "Delivery Instructions(optional)";
    return field.charAt(0).toUpperCase() + field.slice(1);
  };

  return (
    <>
      <form className={styles.form} style={{ marginRight: "5px" }}>
        <h3 className={styles.header}>
          <span className={styles.paymentStep}>1</span>Shipping & Payment
        </h3>

        {/* Address Search Field */}

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Start typing your address</label>
          <textarea
            name="address"
            value={selectedAddress || query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedAddress("");
            }}
            rows={2}
            className={styles.addressInput}
            required
          />
          {results.length > 0 && selectedAddress !== "manual entry" && (
            <div className={styles.addressResults}>
              {results.map((a, index) => (
                <button
                  className={styles.addrBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    selectAddress(a);
                  }}
                  key={index}
                >
                  {a.properties.full_address}
                </button>
              ))}
              <button
                className={styles.manualBtn}
                onClick={(e) => {
                  e.preventDefault();
                  selectAddress("manual entry");
                }}
              >
                Address not listed? Add Manually
              </button>
            </div>
          )}
        </div>

        {[
          "streetAddress",
          "unit",
          "city",
          "state",
          "postalCode",
          "country",
        ].map((field) => (
          <div key={field} className={styles.fieldGroup}>
            <label className={styles.label} htmlFor={field}>
              {getLabel(field)}
            </label>

            {/* State dropdown for manual mode */}
            {selectedAddress === "manual entry" && field === "state" ? (
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="">Select a province/territory</option>
                {canadianProvinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            ) : selectedAddress === "manual entry" && field === "country" ? (
              // Set country to Canada only
              <input
                id="country"
                name="country"
                value="Canada"
                readOnly
                className={styles.input}
              />
            ) : selectedAddress === "manual entry" && field === "city" ? (
              // Free input, but visually hint to write Canadian city
              <input
                id="city"
                name="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
                className={styles.input}
              />
            ) : (
              // Default input for all other cases
              <input
                id={field}
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                className={styles.input}
              />
            )}
            {fieldErrors[field] && (
              <p className={styles.error}>{fieldErrors[field]}</p>
            )}
          </div>
        ))}
      </form>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.header}>
          <span className={styles.paymentStep}>2</span>Contact Details
        </h3>

        {/* Contact Details */}
        {["name", "email", "phone", "instructions"].map((field, idx) => (
          <React.Fragment key={field}>
            <div className={styles.fieldGroup}>
              <label htmlFor={field} className={styles.label}>
                {getLabel(field)}
              </label>
              <input
                id={field}
                type={field === "phone" ? "tel" : "text"}
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                className={styles.input}
                required
                inputMode={field === "phone" ? "numeric" : undefined}
                onWheel={(e) => field === "phone" && e.target.blur()} // hide spinner
              />
              {fieldErrors[field] && (
                <p className={styles.error}>{fieldErrors[field]}</p>
              )}
            </div>

            {field === "email" && (
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Confirm Email</label>
                <input
                  type="text"
                  name="confirmEmail"
                  value={formData.confirmEmail || ""}
                  onChange={handleChange}
                  className={styles.input}
                />
                {fieldErrors.confirmEmail && (
                  <p className={styles.error}>{fieldErrors.confirmEmail}</p>
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
