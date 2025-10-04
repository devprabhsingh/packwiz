"use client";
import { useState, useEffect, useRef } from "react";

export default function useOnScreen() {
  const ref = useRef();
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Update our state when observer callback fires
      setIntersecting(entry.isIntersecting);
    });

    if (ref.current) {
      observer.observe(ref.current);
    }
    // Clean up observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, isIntersecting];
}
