import React, { useState, useEffect } from 'react';

/**
 * AnimatedCounter component
 * Animates number smoothly from 0 to target value on mount and value updates.
 */
export default function AnimatedCounter({ 
  value, 
  duration = 900, 
  prefix = '', 
  suffix = '', 
  decimals = 0 
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Parse numeric value if passed as a string (e.g., "78.4%", "48.6", "298")
    let target = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.-]+/g, ''));
    if (isNaN(target)) target = 0;

    let start = 0;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * easeOut;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(target);
      }
    };

    requestAnimationFrame(updateCount);
  }, [value, duration]);

  const formatted = decimals > 0 
    ? displayValue.toFixed(decimals) 
    : Math.round(displayValue).toLocaleString();

  return (
    <span className="animated-counter-num">
      {prefix}{formatted}{suffix}
    </span>
  );
}
