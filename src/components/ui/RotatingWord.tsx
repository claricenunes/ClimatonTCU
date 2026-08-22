import { useEffect, useRef, useState } from "react";

interface RotatingWordProps {
  words: string[];
  intervalMs?: number;
  className?: string;
}

/**
 * Cycles through a list of words in place, sliding each new one in. Pauses
 * on hover/focus (the rotation runs indefinitely, so a way to stop it
 * matters for anyone who wants to actually read a word). Falls back to an
 * instant, motion-free swap for prefers-reduced-motion.
 */
export function RotatingWord({ words, intervalMs = 2400, className = "" }: RotatingWordProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  }, []);

  useEffect(() => {
    if (paused || words.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), intervalMs);
    return () => clearInterval(timer);
  }, [paused, words.length, intervalMs]);

  return (
    <span
      className={`relative inline-grid overflow-hidden align-bottom ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      tabIndex={0}
      aria-live="polite"
    >
      <span
        key={index}
        className={reduceMotionRef.current ? "" : "animate-word-in"}
        style={{ gridArea: "1 / 1" }}
      >
        {words[index]}
      </span>
      {/* Reserves the width of the longest word so surrounding text doesn't reflow. */}
      <span className="invisible" style={{ gridArea: "1 / 1" }} aria-hidden="true">
        {words.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
    </span>
  );
}
