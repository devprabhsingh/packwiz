"use client";
import "./header.css";
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
        className={isMobile ? "mobileLink" : "eachLink"}
      >
        {label}
      </Link>
    ));

  return (
    <header className="header-box">
      {/* Mobile Menu Icon */}
      <div className="menu-icon" onClick={() => setMenuOpen((open) => !open)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Logo */}
      <Link href="/" className="logo-link">
        <Image
          src="/images/logo.webp"
          alt="logo"
          height={50}
          width={150}
          priority
        />
      </Link>

      <SearchBar />

      {/* Desktop Nav */}
      <nav className="navBox">{renderLinks()}</nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobileMenu">
          {renderLinks(true)}
          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            className="mobileLink"
          >
            Cart ({totalItems})
          </Link>
        </div>
      )}

      {/* Cart Icon */}
      <Link href="/cart" className="cart-link">
        <ShoppingCart style={{ width: 24, height: 24 }} />
        <span className="sr-only">
          Go to cart{totalItems > 0 ? `, ${totalItems} items` : ""}
        </span>
        {totalItems > 0 && <span className="cartBadge">{totalItems}</span>}
      </Link>
    </header>
  );
}
