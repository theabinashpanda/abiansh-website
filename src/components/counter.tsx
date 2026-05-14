"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  target: number;
  suffix?: string;
  className?: string;
}

export function Counter({ target, suffix = "", className }: CounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const duration = 1500;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(Math.floor(target * eased));
              if (p < 1) requestAnimationFrame(tick);
              else setValue(target);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className={className}>
      {value}
      {suffix}
    </div>
  );
}
