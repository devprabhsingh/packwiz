"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [shipFees, setShipFees] = useState(0);
  const [total, setTotal] = useState(0);
  const [courierName, setCourierName] = useState("");
  const [customerDetail, setCustomerDetail] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const [cod, setCod] = useState(false);
  const [kit, setKit] = useState(false);

  // Load cart from localStorage once
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) setCartItems(JSON.parse(storedCart));
    } catch (e) {
      console.error("Failed to load cartItems from localStorage", e);
    }
  }, []);

  // Save to localStorage only if cart changes
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cartItems to localStorage", e);
    }
  }, [cartItems]);

  // Price tier logic
  const getPrice = (item) => {
    if (item.id.startsWith("pk")) return item.price;
    const qty = item.qty || 1;
    const p = item.priceTable;
    if (!p) return item.price || 0;
    if (qty <= 4) return p.tier1;
    if (qty <= 9) return p.tier2;
    if (qty <= 24) return p.tier3;
    return p.tier4;
  };

  // Add to cart
  const addToCart = (item) => {
    setCartItems((prev) => {
      // Look for an existing item with the same ID AND selectedSize
      // This is crucial for handling size variations correctly
      const existing = prev.find(
        (i) => i.id === item.id && i.selectedSize === item.selectedSize
      );

      if (existing) {
        return prev.map(
          (
            i // Only update the item if both ID and Size match
          ) =>
            i.id === item.id && i.selectedSize === item.selectedSize
              ? {
                  ...i,
                  qty: i.qty + item.qty, // Recalculate price based on new total quantity
                  price: getPrice({ ...i, qty: i.qty + item.qty }),
                }
              : i
        );
      } // For a new item, spread all properties from `item`, including `selectedSize`
      return [...prev, { ...item, price: getPrice(item) }];
    });
  };

  // Update quantity
  const updateItemQuantity = (id, newQty) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.id === id
            ? { ...i, qty: newQty, price: getPrice({ ...i, qty: newQty }) }
            : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  // Remove item
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Clear cart
  const clearCart = () => setCartItems([]);

  // Efficient derived value: total number of items
  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.qty, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems, // ✅ New optimized value
        addToCart,
        updateItemQuantity,
        removeFromCart,
        clearCart,
        subTotal,
        setSubTotal,
        shipFees,
        setShipFees,
        total,
        setTotal,
        courierName,
        setCourierName,
        customerDetail,
        setCustomerDetail,
        emailSent,

        setEmailSent,
        cod,
        setCod,
        kit,
        setKit,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
