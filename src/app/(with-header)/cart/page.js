import { Suspense } from "react";
import CartClient from "./CartClient";
import categories from "@/data/categories";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function CartPage() {
  return (
    <Suspense fallback={<div>Loading cart items...</div>}>
      <CartClient categories={categories} />
    </Suspense>
  );
}
