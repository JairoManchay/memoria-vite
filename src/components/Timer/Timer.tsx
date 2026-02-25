import { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { INITIAL_TIME } from '../../constants/game';

export default function Timer() {
  const { timeLeft, gameStatus, updateTimer } = useGameStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const percentage = (timeLeft / INITIAL_TIME) * 100;

  const getTimerColor = () => {
    if (timeLeft <= 20) return 'bg-red-500';
    if (timeLeft <= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getTextColor = () => {
    if (timeLeft <= 20) return 'text-red-500';
    if (timeLeft <= 40) return 'text-yellow-500';
    return 'text-white';
  };

  useEffect(() => {
    if (gameStatus === 'playing') {
      intervalRef.current = setInterval(updateTimer, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [gameStatus, updateTimer]);

  return (
    <div className="bg-[#1E73D8] px-10 py-10 flex flex-col items-center justify-center border-t-2 border-[#4DA3FF]">
      <div className="w-full max-w-[900px] h-3 bg-white/20 rounded-full mb-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${getTimerColor()} ${timeLeft <= 20 ? 'animate-pulse' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex gap-3 items-center mt-4">
        <span className="text-5xl text-white">⏱</span>
        <span className="text-white text-4xl font-semibold uppercase">Tiempo restante:</span>
        <span className={`text-5xl font-bold min-w-[80px] ${getTextColor()}`}>
          {timeLeft}s
        </span>
      </div>
    </div>
  );
}
