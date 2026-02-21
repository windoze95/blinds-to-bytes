import { useState, useRef, useCallback, useEffect } from 'react';

export function useTimer(countdownFrom = 0) {
  const [seconds, setSeconds] = useState(countdownFrom);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const isCountdown = countdownFrom > 0;

  const stop = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (intervalRef.current) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (isCountdown) {
          if (prev <= 1) {
            stop();
            return 0;
          }
          return prev - 1;
        }
        return prev + 1;
      });
    }, 1000);
  }, [isCountdown, stop]);

  const reset = useCallback(
    (newTime) => {
      stop();
      setSeconds(newTime !== undefined ? newTime : countdownFrom);
    },
    [stop, countdownFrom]
  );

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const pad = (n) => String(n).padStart(2, '0');
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const formatted = hrs > 0 ? `${hrs}:${pad(mins)}:${pad(secs)}` : `${pad(mins)}:${pad(secs)}`;

  return { seconds, isRunning, start, stop, reset, formatted };
}
