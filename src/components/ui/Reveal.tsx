import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Fades + slides a section in once it scrolls into view. Skips the motion
 * entirely (renders visible immediately) when the visitor prefers reduced
 * motion, or if IntersectionObserver isn't available.
 */
export function Reveal({ children, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // threshold 0 fires as soon as a single pixel is visible — an
      // area-based threshold can never be satisfied by a section taller
      // than the viewport (e.g. the município grid stacked on mobile).
      { threshold: 0, rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${visible ? "animate-reveal" : "opacity-0"} ${className}`}>
      {children}
    </div>
  );
}
