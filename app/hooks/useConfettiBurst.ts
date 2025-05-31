import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

type ConfettiBurstOptions = {
  duration?: number;
  interval?: number;
};

export function useConfettiBurst() {
  const burstRef = useRef<NodeJS.Timeout | null>(null);

  const start = (options: ConfettiBurstOptions = {}) => {
    const { duration = 5000, interval = 1000 } = options;

    const endTime = Date.now() + duration;

    if (burstRef.current) clearInterval(burstRef.current);

    burstRef.current = setInterval(() => {
      const timeLeft = endTime - Date.now();

      if (timeLeft <= 0 && burstRef.current) {
        clearInterval(burstRef.current);
        burstRef.current = null;
        return;
      }

      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: {
          y: 0.4,
        },
      });
    }, interval);
  };

  useEffect(() => {
    return () => {
      if (burstRef.current) {
        clearInterval(burstRef.current);
      }
    };
  }, []);

  return { start };
}
