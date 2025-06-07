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
    <div className="back-navigation">
      {links.map((link, index) => (
        <React.Fragment key={link.href}>
          <Link
            href={link.href}
            className={pathname === link.href ? "color-orange" : "color-blue"}
          >
            {link.label}
          </Link>
          {index < links.length - 1 && " > "}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BackLinks;
