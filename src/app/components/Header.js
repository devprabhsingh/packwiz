"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import SearchBar from "./Searchbar";

export default function Header() {
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // Track window width for responsive layout
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    ...(windowWidth > 1300 ? [{ href: "/contact", label: "Contact us" }] : []),
    { href: "/track-order", label: "Track order" },
  ];

  const renderLinks = (isMobile = false) =>
    navLinks.map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        onClick={isMobile ? () => setMenuOpen(false) : undefined}
        style={isMobile ? styles.mobileLink : styles.eachLink}
      >
        {label}
      </Link>
    ));

  return (
    <header style={styles.headerBox}>
      {/* Mobile Menu Icon */}
      <div
        className="menu-icon"
        onClick={() => setMenuOpen((open) => !open)}
        style={styles.menuIcon}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Logo */}
      <Link href="/" style={{ backgroundColor: "white", margin: "5px" }}>
        <Image
          src="/images/logo.png"
          alt="logo"
          height={50}
          width={150}
          priority
        />
      </Link>

      <SearchBar />

      {/* Desktop Nav */}
      <nav style={styles.navBox}>{renderLinks()}</nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {renderLinks(true)}
          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            style={styles.mobileLink}
          >
            Cart ({totalItems})
          </Link>
        </div>
      )}

      {/* Cart Icon */}
      <Link href="/cart" style={{ position: "relative", marginLeft: "10px" }}>
        <ShoppingCart style={{ width: 24, height: 24 }} />
        <span className="sr-only">
          Go to cart{totalItems > 0 ? `, ${totalItems} items` : ""}
        </span>
        {totalItems > 0 && <span style={styles.cartBadge}>{totalItems}</span>}
      </Link>
    </header>
  );
}

const styles = {
  headerBox: {
    margin: "8px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    position: "relative",
    zIndex: 1000,
  },
  navBox: {
    display: "flex",
    justifyContent: "space-around",
    flex: "0.7",
  },
  eachLink: {
    color: "black",
    textDecoration: "none",
    fontSize: "20px",
    position: "relative",
    margin: "0 10px",
  },
  menuIcon: {
    display: "none",
    alignItems: "center",
    cursor: "pointer",
  },
  cartBadge: {
    position: "absolute",
    top: "-16px",
    right: "-2px",
    background: "#ff6f20",
    color: "#fff",
    borderRadius: "50%",
    padding: "2.5px 7px",
    fontSize: "13px",
    minWidth: "20px",
    textAlign: "center",
  },
  mobileMenu: {
    position: "absolute",
    top: "65px",
    left: "10px",
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    zIndex: 100,
  },
  mobileLink: {
    color: "black",
    textDecoration: "none",
    fontSize: "18px",
  },
};
