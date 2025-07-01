import { Suspense } from "react";
import PaymentSuccessClient from "./PaymentSuccessClient";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading confirmation...</div>}>
      <PaymentSuccessClient />
    </Suspense>
  );
}
