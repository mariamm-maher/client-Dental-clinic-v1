import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

/**
 * Custom hook to automatically scroll to top when the route changes
 *
 * @param {Object} options - Configuration options
 * @param {boolean} options.smooth - Whether to use smooth scrolling (default: true)
 * @param {string} options.behavior - Scroll behavior ('auto' | 'smooth')
 * @param {number} options.delay - Delay before scrolling in milliseconds (default: 0)
 * @param {boolean} options.enabled - Whether the hook is enabled (default: true)
 * @param {string} options.selector - CSS selector for specific scrollable element
 * @returns {React.RefObject} - Ref to attach to the scrollable container
 *
 * @example
 * // For a scrollable container
 * const scrollRef = useScrollToTop();
 * return <div ref={scrollRef} className="overflow-y-auto">...</div>
 *
 * @example
 * // For full page scrolling with custom options
 * const scrollRef = useScrollToTop({ smooth: true, delay: 100 });
 * return <div ref={scrollRef}>...</div>
 *
 * @example
 * // For specific scrollable element
 * const scrollRef = useScrollToTop({ selector: '.my-scrollable-container' });
 * return <div ref={scrollRef}>...</div>
 */
export function useScrollToTop(options = {}) {
  const location = useLocation();
  const scrollRef = useRef(null);
  const {
    smooth = true,
    behavior = smooth ? "smooth" : "auto",
    delay = 0,
    enabled = true,
    selector = null,
  } = options;

  const scrollToTop = useCallback(() => {
    if (!enabled) return;

    const scrollElement = selector
      ? document.querySelector(selector)
      : scrollRef.current;

    if (scrollElement) {
      // Scrollable container - reset scroll position
      if (behavior === "smooth") {
        scrollElement.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } else {
        scrollElement.scrollTop = 0;
        scrollElement.scrollLeft = 0;
      }
    } else {
      // Full page - use window scroll
      if (behavior === "smooth") {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [enabled, behavior, selector]);

  useEffect(() => {
    // Add delay if specified
    if (delay > 0) {
      const timeoutId = setTimeout(scrollToTop, delay);
      return () => clearTimeout(timeoutId);
    } else {
      scrollToTop();
    }
  }, [location.pathname, scrollToTop, delay]);

  return scrollRef;
}

/**
 * Alternative hook for immediate scrolling without ref
 * Use this when you want to scroll the window directly
 *
 * @param {Object} options - Configuration options
 * @param {boolean} options.smooth - Whether to use smooth scrolling (default: true)
 * @param {string} options.behavior - Scroll behavior ('auto' | 'smooth')
 * @param {number} options.delay - Delay before scrolling in milliseconds (default: 0)
 * @param {boolean} options.enabled - Whether the hook is enabled (default: true)
 */
export function useScrollToTopOnRouteChange(options = {}) {
  const location = useLocation();
  const {
    smooth = true,
    behavior = smooth ? "smooth" : "auto",
    delay = 0,
    enabled = true,
  } = options;

  const scrollToTop = useCallback(() => {
    if (!enabled) return;

    if (behavior === "smooth") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [enabled, behavior]);

  useEffect(() => {
    if (delay > 0) {
      const timeoutId = setTimeout(scrollToTop, delay);
      return () => clearTimeout(timeoutId);
    } else {
      scrollToTop();
    }
  }, [location.pathname, scrollToTop, delay]);
}

/**
 * Hook for scrolling to a specific element when route changes
 *
 * @param {string} elementId - ID of the element to scroll to
 * @param {Object} options - Configuration options
 * @param {boolean} options.smooth - Whether to use smooth scrolling (default: true)
 * @param {number} options.delay - Delay before scrolling in milliseconds (default: 0)
 * @param {boolean} options.enabled - Whether the hook is enabled (default: true)
 * @param {number} options.offset - Offset from the top of the element (default: 0)
 */
export function useScrollToElement(elementId, options = {}) {
  const location = useLocation();
  const { smooth = true, delay = 0, enabled = true, offset = 0 } = options;

  const scrollToElement = useCallback(() => {
    if (!enabled || !elementId) return;

    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.offsetTop - offset;

      if (smooth) {
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      } else {
        window.scrollTo(0, elementPosition);
      }
    }
  }, [enabled, elementId, smooth, offset]);

  useEffect(() => {
    if (delay > 0) {
      const timeoutId = setTimeout(scrollToElement, delay);
      return () => clearTimeout(timeoutId);
    } else {
      scrollToElement();
    }
  }, [location.pathname, scrollToElement, delay]);
}
