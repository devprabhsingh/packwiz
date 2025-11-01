"use client";

import { lazy, Suspense, useState, useEffect } from "react";
import FirstSection from "./components/FirstSection";
import SearchBar from "./components/Searchbar";
import useOnScreen from "./hooks/useonscreen";

// Helper hook to ensure a component stays rendered once it has been visible
const useStickyLoad = (isVisible) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // If it becomes visible and hasn't loaded yet, set it as loaded permanently
    if (isVisible && !hasLoaded) {
      setHasLoaded(true);
    }
  }, [isVisible, hasLoaded]);

  // Render if visible OR if it has loaded at any point
  // This is the core fix: once rendered, it stays rendered to maintain document height.
  return isVisible || hasLoaded;
};

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

  // Apply the sticky load logic
  const aboutShouldRender = useStickyLoad(aboutIsVisible);
  const reviewShouldRender = useStickyLoad(reviewIsVisible);
  const contactShouldRender = useStickyLoad(contactIsVisible);
  const lazyShouldRender = useStickyLoad(lazyIsVisible);

  return (
    <>
      <div>
        <div className="mobile-search">
          <SearchBar />
        </div>
        <FirstSection />

        {/* 1. ABOUT & PRODUCTS SECTION (aboutRef)
          Renders if visible OR if previously loaded.
        */}
        <div ref={aboutRef}>
          {aboutShouldRender && (
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

        {/* 2. REVIEW SECTION (reviewRef)
          Renders if visible OR if previously loaded.
        */}
        <div ref={reviewRef}>
          {reviewShouldRender && (
            <Suspense fallback={<p>Loading reviews…</p>}>
              <LazyReviewSection />
            </Suspense>
          )}
        </div>

        {/* 3. CONTACT SECTION (contactRef)
          Renders if visible OR if previously loaded.
        */}
        <div ref={contactRef}>
          {contactShouldRender && (
            <Suspense fallback={<p>Loading contact…</p>}>
              <LazyContactSection />
            </Suspense>
          )}
        </div>

        {/* 4. EXTRAS SECTION (lazyRef)
          Renders if visible OR if previously loaded.
        */}
        <div ref={lazyRef}>
          {lazyShouldRender && (
            <Suspense fallback={null}>
              <LazyExtras />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
}
