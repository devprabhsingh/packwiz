// app/HomeClient.js
"use client";

import { lazy, Suspense } from "react";
import FirstSection from "./components/FirstSection";
import SearchBar from "./components/Searchbar";
import useOnScreen from "./hooks/useonscreen";

// Lazy-load the components that appear below the fold
const LazyProductGrid = lazy(() => import("./components/ProductGrid"));
const LazyAboutSection = lazy(() => import("./components/AboutSection"));
const LazyContactSection = lazy(() => import("./components/ContactSection"));
const LazyReviewSection = lazy(() => import("./components/ReviewSection"));
const LazyExtras = lazy(() => import("./components/LazyExtras"));

export default function HomeClient() {
  const [aboutRef, aboutIsVisible] = useOnScreen();
  const [reviewRef, reviewIsVisible] = useOnScreen();
  const [contactRef, contactIsVisible] = useOnScreen();
  const [lazyRef, lazyIsVisible] = useOnScreen();

  return (
    <>
      <div>
        <div className="mobile-search">
          <SearchBar />
        </div>
        <FirstSection />

        <div ref={aboutRef}>
          {aboutIsVisible && (
            <>
              <Suspense fallback={<p>Loading products…</p>}>
                <LazyProductGrid />
              </Suspense>
              <Suspense fallback={<p>Loading about…</p>}>
                <LazyAboutSection />
              </Suspense>
            </>
          )}
        </div>

        <div ref={reviewRef}>
          {reviewIsVisible && (
            <Suspense fallback={<p>Loading reviews…</p>}>
              <LazyReviewSection />
            </Suspense>
          )}
        </div>

        <div ref={contactRef}>
          {contactIsVisible && (
            <Suspense fallback={<p>Loading contact…</p>}>
              <LazyContactSection />
            </Suspense>
          )}
        </div>

        <div ref={lazyRef}>
          {lazyIsVisible && (
            <Suspense fallback={null}>
              <LazyExtras />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
}
