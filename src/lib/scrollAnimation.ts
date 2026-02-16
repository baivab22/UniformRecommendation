// Simple scroll-based animation hook using Intersection Observer
import { useEffect, useRef } from "react";

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(className = "animate-fade-in-up") {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add(className);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [className]);

  return ref;
}

// Add this CSS to your global styles (e.g., index.css):
// .animate-fade-in-up {
//   opacity: 1 !important;
//   transform: translateY(0) !important;
//   transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
// }
// [data-scroll-animate] {
//   opacity: 0;
//   transform: translateY(40px);
// }
