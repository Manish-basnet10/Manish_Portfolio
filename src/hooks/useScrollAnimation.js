// ============================================================
// HOOK: useScrollAnimation
// Adds the "is-visible" class to elements with class "scroll-animate"
// once they enter the viewport (triggered once per element).
// Uses IntersectionObserver for performance.
// ============================================================

import { useEffect, useRef } from "react";

/**
 * useScrollAnimation
 * @param {string} selector - CSS selector for elements to animate (default: ".scroll-animate")
 * @param {object} options  - IntersectionObserver options
 */
export function useScrollAnimation(
  selector = ".scroll-animate",
  options = { threshold: 0.12 }
) {
  const observerRef = useRef(null);

  useEffect(() => {
    // Skip animations if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Unobserve after triggering (animate once)
          observerRef.current.unobserve(entry.target);
        }
      });
    }, options);

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [selector, options]);
}

export default useScrollAnimation;
