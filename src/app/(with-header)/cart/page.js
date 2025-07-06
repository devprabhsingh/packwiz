import { Suspense } from "react";
import CartClient from "./CartClient";
import { categories } from "@/data/numberSheet";

export default function CartPage() {
  return (
    <Suspense fallback={<div>Loading cart items...</div>}>
      <CartClient categories={categories} />
    </Suspense>
  );
}
