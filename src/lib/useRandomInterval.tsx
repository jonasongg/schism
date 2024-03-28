import React from 'react';

// Utility helper for random number generation
export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

export const useRandomInterval = (
  callback: () => any,
  minDelay: number,
  maxDelay: number,
  scaleOptions?: {
    getScaling: (toScaleTo: number, maxInSec: number) => number;
    minSubtract: number;
    maxSubtract: number;
    maxInSec: number;
  },
) => {
  const timeoutId = React.useRef<number | undefined>(undefined);
  const savedCallback = React.useRef(callback);
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  React.useEffect(() => {
    const handleTick = () => {
      const nextTickAt = random(
        minDelay - (scaleOptions ? scaleOptions.getScaling(scaleOptions.minSubtract, scaleOptions.maxInSec) : 0),
        maxDelay - (scaleOptions ? scaleOptions.getScaling(scaleOptions.maxSubtract, scaleOptions.maxInSec) : 0),
      );
      timeoutId.current = window.setTimeout(() => {
        savedCallback.current();
        handleTick();
      }, nextTickAt);
    };
    handleTick();

    return () => window.clearTimeout(timeoutId.current);
  }, [minDelay, maxDelay]);
  const cancel = React.useCallback(function () {
    window.clearTimeout(timeoutId.current);
  }, []);
  return cancel;
};
