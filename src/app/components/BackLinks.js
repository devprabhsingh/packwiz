"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const BackLinks = ({ title, id, nextTitle, nextId }) => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
  ];

  if (title && id) {
    links.push({ href: `/product-info/${slugify(title)}`, label: title });
  }

  if (nextTitle) {
    links.push({
      href: `/item-details/${slugify(nextTitle)}`,
      label: nextTitle,
    });
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
    background: "#f6f2f2ff",
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
