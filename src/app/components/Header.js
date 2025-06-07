"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import SearchBar from "./Searchbar";

export default function Header() {
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const totalItems = Object.values(cartItems).reduce(
    (total, item) => total + item.qty,
    0
  );
  return (
    <header style={styles.headerbox}>
      {/* Mobile Menu Toggle Icon */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          className="menu-icon"
          onClick={toggleMenu}
          style={{ cursor: "pointer" }}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>
      {/* Logo */}
      <Link href="/" style={{ backgroundColor: "white", margin: "5px" }}>
        <img src="/images/logo.png" height="50px" width="auto" />
      </Link>
      <SearchBar />
      {/* Desktop Nav */}
      <nav className="nav-links" style={styles.navbox}>
        <Link style={styles.eachLink} href="/">
          Home
        </Link>
        <Link style={styles.eachLink} href="/about">
          About
        </Link>
        <Link style={styles.eachLink} href="/products">
          Products
        </Link>
        <Link style={styles.eachLink} href="/contact">
          Contact us
        </Link>
        <Link style={styles.eachLink} href="/track-order">
          Track order
        </Link>
      </nav>
      {/* Mobile Nav */}
      {menuOpen && (
        <div className="mobile-menu" style={styles.mobileMenu}>
          <Link className="mobileLink" href="/" onClick={closeMenu}>
            Home
          </Link>
          <Link className="mobileLink" href="/about" onClick={closeMenu}>
            About
          </Link>
          <Link className="mobileLink" href="/products" onClick={closeMenu}>
            Products
          </Link>
          <Link className="mobileLink" href="/contact" onClick={closeMenu}>
            Contact us
          </Link>
          <Link className="mobileLink" href="/track-order" onClick={closeMenu}>
            Track order
          </Link>
        </div>
      )}{" "}
      <Link className="mobileLink" href="/cart" onClick={closeMenu}>
        <ShoppingCart style={{ width: "24px", height: "24px" }} />
        {cartItems.length > 0 && (
          <span style={styles.cartBadge}>{totalItems}</span>
        )}
      </Link>
    </header>
  );
}

const styles = {
  headerbox: {
    margin: "8px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px",
    zIndex: 1000, // keeps it above other elements
    backgroundColor: "white", // prevent transparency issue
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },

  navbox: {
    display: "flex",
    justifyContent: "space-around",
    flex: "0.7",
  },

  eachLink: {
    color: "black",
    textDecoration: "none",
    fontSize: "20px",
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: "-6px",
    right: "-6px",
    background: "#ff6f20",
    color: "#fff",
    borderRadius: "50%",
    padding: "3px 8px",
    fontSize: "13px",
  },
  mobileMenu: {
    position: "absolute",
    top: "65px",
    left: "10px",
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "25px",
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  },
};
