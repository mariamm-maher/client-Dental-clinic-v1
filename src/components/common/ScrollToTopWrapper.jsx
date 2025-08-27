import { forwardRef } from "react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { cn } from "@/lib/utils";

/**
 * A wrapper component that automatically scrolls to top when the route changes
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.scrollOptions - Options for scroll behavior
 * @param {boolean} props.scrollOptions.smooth - Whether to use smooth scrolling (default: true)
 * @param {string} props.scrollOptions.behavior - Scroll behavior ('auto' | 'smooth')
 * @param {number} props.scrollOptions.delay - Delay before scrolling in milliseconds (default: 0)
 * @param {boolean} props.scrollOptions.enabled - Whether scrolling is enabled (default: true)
 * @param {string} props.scrollOptions.selector - CSS selector for specific scrollable element
 * @param {React.HTMLAttributes} props.rest - Additional HTML attributes
 */
const ScrollToTopWrapper = forwardRef(
  ({ children, className, scrollOptions = {}, ...rest }, ref) => {
    const scrollRef = useScrollToTop(scrollOptions);

    return (
      <div
        ref={scrollRef}
        className={cn("overflow-y-auto", className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

ScrollToTopWrapper.displayName = "ScrollToTopWrapper";

export default ScrollToTopWrapper;
