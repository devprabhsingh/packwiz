"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { getAddresses } from "@/utils/getAddresses";
import { getShipCharge } from "@/utils/getShipCharge";
import { getTaxRate } from "@/utils/getTaxRate";
import Link from "next/link";
import Form from "./Form";
import ShippingRates from "./ShippingRates";
import ShippingSummary from "./ShippingSummary";
import styles from "./shipStyles.module.css";

const ShippingInfo = () => {
  const router = useRouter();
  const {
    subTotal,
    setTotal,
    setCustomerDetail,
    setShipFees,
    setCourierName,
    setCod,
    cartItems,
  } = useCart();

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
    instructions: "",
  });

  const [addressObj, setAddressObj] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [shipRateOpts, setShipRateOpts] = useState([]);
  const [selectedRate, setSelectedRate] = useState({});
  const [taxRate, setTaxRateValue] = useState(0);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [loadingRates, setLoadingRates] = useState(false);

  const safeSubTotal =
    typeof subTotal === "number" ? subTotal : parseFloat(subTotal) || 0;
  const taxAmount = +(taxRate * safeSubTotal).toFixed(2);
  const total = +(
    safeSubTotal +
    taxAmount +
    (selectedRate?.price || 0)
  ).toFixed(2);

  useEffect(() => {
    if (query.length < 2) return setResults([]);
    getAddresses(query).then(setResults);
  }, [query]);

  useEffect(() => {
    if (shipRateOpts.length > 0) selectShipRate(0);
  }, [shipRateOpts]);

  const selectShipRate = (index) => {
    const rate = shipRateOpts[index];
    if (!rate) return;
    setSelectedRate(rate);
    const shippingCost = Number(rate.price.toFixed(2));
    setShipFees(shippingCost);
    setCourierName(rate.courierName);
    setTotal(+(safeSubTotal + shippingCost + taxAmount).toFixed(2));
  };

  const getShipRates = async (addr) => {
    setLoadingRates(true);
    const rates = await getShipCharge(addr, subTotal, cartItems);
    if (!rates || !rates.length) return setShipRateOpts([]);

    setShipRateOpts(rates);
    setSelectedRate(rates[0]);
    setLoadingRates(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("Please fix the errors before proceeding.");
      return;
    }

    setError("");
    setLoader(true);
    setCustomerDetail(formData);
    setCourierName(selectedRate?.shipService || "");
    setCod(selectedRate?.cod || "");

    router.push("/payment");
  };

  const validateForm = () => {
    const errors = {};
    const isValidEmail = (email) =>
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isValidPhone = (phone) =>
      /^\+?1?\s?[-.(]*\d{3}[-.)\s]*\d{3}[-.\s]*\d{4}$/.test(phone);

    if (!formData.name?.trim() || formData.name.length < 3)
      errors.name = "Name should be at least 3 characters";
    if (!isValidEmail(formData.email)) errors.email = "Invalid email";
    if (formData.email !== formData.confirmEmail)
      errors.confirmEmail = "Emails do not match";
    if (!isValidPhone(formData.phone)) errors.phone = "Invalid phone";
    if (!formData.streetAddress?.trim())
      errors.streetAddress = "Street required";
    if (!formData.city?.trim()) errors.city = "City required";
    if (!formData.state?.trim()) errors.state = "State required";
    if (!formData.postalCode?.trim())
      errors.postalCode = "Postal code required";
    if (!formData.country?.trim()) errors.country = "Country required";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const selectAddress = (addr) => {
    const ctx = addr.properties.context;
    setSelectedAddress(addr.properties.full_address);
    setResults([]);
    setFieldErrors({});
    setAddressObj(addr);
    setFormData((prev) => ({
      ...prev,
      streetAddress: ctx?.address?.name || "",
      city: ctx?.place?.name || "",
      state: ctx?.region?.name || "",
      postalCode: ctx?.postcode?.name || "",
      country: ctx?.country?.name || "",
    }));
    getShipRates(addr);
    if (ctx?.region?.name) {
      getTaxRate(ctx.region.name).then((rate) => setTaxRateValue(rate || 0));
    }
  };

  if (subTotal < 10) {
    return (
      <div className={styles.backBtnBox}>
        <Link href="/cart" className={styles.backBtn}>
          Go back to cart
        </Link>
      </div>
    );
  }

  return (
    <div className="shipping-box">
      <Form
        query={query}
        selectedAddress={selectedAddress}
        setQuery={setQuery}
        setSelectedAddress={setSelectedAddress}
        results={results}
        selectAddress={selectAddress}
        formData={formData}
        setFormData={setFormData}
        fieldErrors={fieldErrors}
        setFieldErrors={setFieldErrors}
        handleSubmit={handleSubmit}
      />
      <div className="ship-summary" style={{ width: "27%" }}>
        <ShippingRates
          options={shipRateOpts}
          selectedRate={selectedRate}
          loading={loadingRates}
          onSelect={selectShipRate}
        />
        <ShippingSummary
          subTotal={safeSubTotal}
          taxRate={taxRate}
          taxAmount={taxAmount}
          shipping={selectedRate?.price}
          total={total}
          error={error}
          loader={loader}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ShippingInfo;
