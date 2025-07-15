import { Suspense } from "react";
import TrackClient from "./TrackClient";
export const metadata = {
  alternates: {
    canonical: "/",
  },
};
export default function TrackPage() {
  return (
    <Suspense fallback={<div>Loading cart items...</div>}>
      <TrackClient />
    </Suspense>
  );
}
