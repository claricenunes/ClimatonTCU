import { useEffect, useState } from "react";

/**
 * Simulates a brief loading state whenever `signal` changes, so filters and
 * search feel like they're hitting a real data layer even though everything
 * here is mocked in-memory.
 */
export function useSimulatedLoading(signal: unknown, delay = 350): boolean {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signal]);

  return loading;
}
