"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BackLinks = ({ title, id, nextTitle, nextId }) => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
  ];

  if (title && id) {
    links.push({ href: `/productinfo/${id}`, label: title });
  }

  if (nextTitle) {
    links.push({ href: `/ItemDetail/${nextId}`, label: nextTitle });
  }

  return (
    <div style={styles.backNav} className="back-navigation">
      {links.map((link, index) => (
        <React.Fragment key={link.href}>
          <Link
            href={link.href}
            style={{
              ...styles.backNavA,
              ...(pathname === link.href
                ? styles.colorOrange
                : styles.colorBlue),
            }}
          >
            {link.label}
          </Link>
          {index < links.length - 1 && " > "}
        </React.Fragment>
      ))}
    </div>
  );
};
const styles = {
  backNav: {
    background: "#efededff",
    padding: "10px",
    margin: "5px",
    borderRadius: "8px",
  },

  backNavA: {
    textDecoration: "none",
  },
  colorOrange: {
    color: "#ff6f20",
  },

  colorBlue: {
    color: "blue",
  },
};
export default BackLinks;
