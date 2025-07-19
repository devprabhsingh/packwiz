"use client";
import styles from "./FirstStyle.module.css";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import SearchBar from "./Searchbar";

export default function Header() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        className={isMobile ? styles.mobileLink : styles.eachLink}
      >
        {label}
      </Link>
    ));

  return (
    <>
      <div className={styles.promo}>
        Use code{" "}
        <span
          style={{
            backgroundColor: "#ff6f20",
            color: "white",
            padding: "2px 4px",
          }}
        >
          WELCOME10
        </span>{" "}
        at checkout to get 10% Off
      </div>
      <header className={styles.headerBox}>
        <div
          className={styles.menuIcon}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        <Link href="/" className={styles.logoLink}>
          <Image
            src="/images/logo.webp"
            alt="logo"
            height={50}
            width={150}
            priority
          />
        </Link>

        <SearchBar />

        <nav className={styles.navBox}>{renderLinks()}</nav>

        {menuOpen && (
          <div className={styles.mobileMenu}>
            {renderLinks(true)}
            <Link
              prefetch={false}
              href="/cart"
              onClick={() => setMenuOpen(false)}
              className={styles.mobileLink}
            >
              Cart ({totalItems})
            </Link>
          </div>
        )}

        <Link href="/cart" className={styles.cartLink}>
          <ShoppingCart style={{ width: 24, height: 24 }} />
          <span className={styles.srOnly}>
            Go to cart{totalItems > 0 ? `, ${totalItems} items` : ""}
          </span>
          {totalItems > 0 && (
            <span className={styles.cartBadge}>{totalItems}</span>
          )}
        </Link>
      </header>
    </>
  );
}
