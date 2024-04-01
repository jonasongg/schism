import { userData } from '@/app/data';
import React from 'react';

// Utility helper for random number generation
export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

export const getScaling = (toScaleTo: number, maxInSec: number, startTime: number) =>
  startTime == null ? 0 : ((Date.now() - startTime) / (maxInSec * 1000)) * toScaleTo;

export const getCurrentLimit = (startTime: number) => Math.ceil(getScaling(userData.length, 240, startTime));

export const useRandomInterval = (
  callback: () => any,
  minDelay: number,
  maxDelay: number,
  scaleOptions?: {
    minSubtract: number;
    maxSubtract: number;
    maxInSec: number;
    startTime: number;
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
        minDelay -
          (scaleOptions
            ? getScaling(scaleOptions.minSubtract, scaleOptions.maxInSec, scaleOptions.startTime) +
              (getCurrentLimit(scaleOptions.startTime) - 1) * 500
            : 0),
        maxDelay -
          (scaleOptions
            ? getScaling(scaleOptions.maxSubtract, scaleOptions.maxInSec, scaleOptions.startTime) +
              (getCurrentLimit(scaleOptions.startTime) - 1) * 1000
            : 0),
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
