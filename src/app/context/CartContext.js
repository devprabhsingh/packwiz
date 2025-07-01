"use client";
import { createContext, useContext, useState, useEffect } from "react";

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

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      // if already in cart, bump quantity
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + item.qty } : i
        );
      }
      return [...prev, item];
    });
  };
  const getPrice = (item) => {
    if (item.id.startsWith("pk")) {
      return item.price;
    }
    const qty = item.qty;
    const p = item.priceTable;
    if (qty <= 4) return p.tier1;
    if (qty <= 9) return p.tier2;
    if (qty <= 24) return p.tier3;
    return p.tier4;
  };
  const updateItemQuantity = (id, newQty) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, qty: newQty, price: getPrice(i) } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateItemQuantity,
        removeFromCart,
        subTotal,
        shipFees,
        setSubTotal,
        setShipFees,
        total,
        setTotal,
        clearCart,
        customerDetail,
        setCustomerDetail,
        setEmailSent,
        emailSent,
        courierName,
        setCourierName,
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
