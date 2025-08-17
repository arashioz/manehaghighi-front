import { useEffect, useState } from "react";

export const useIncrementalCount = (end: number) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!end) return;
    let start = 0;
    const duration = 10_000 / end;
    const increment = end / (duration / 10);

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.ceil(start));
      }
    }, 10);

    return () => clearInterval(interval);
  }, [end]);

  return count;
};