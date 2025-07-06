import { Suspense } from "react";
import TrackClient from "./TrackClient";

export default function TrackPage() {
  return (
    <Suspense fallback={<div>Loading cart items...</div>}>
      <TrackClient />
    </Suspense>
  );
}
